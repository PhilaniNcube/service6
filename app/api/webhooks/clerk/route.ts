import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent, clerkClient } from "@clerk/nextjs/server";
import db from "@/drizzle/client";
import { users } from "@/drizzle/tables";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  console.log("🔔 Webhook received at:", new Date().toISOString());
  
  // Get the webhook secret from environment variables
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    console.error("❌ CLERK_WEBHOOK_SECRET is not set in environment variables");
    throw new Error(
      "Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  console.log("✅ Webhook secret found");

  // Get the headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  console.log("📋 Svix headers:", {
    svix_id,
    svix_timestamp,
    has_signature: !!svix_signature,
  });

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error("❌ Missing svix headers");
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  console.log("📦 Payload received:", JSON.stringify(payload, null, 2));

  // Create a new Svix instance with your secret
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
    console.log("✅ Webhook signature verified");
  } catch (err) {
    console.error("❌ Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  // Handle the webhook
  const eventType = evt.type;
  console.log("📌 Event type:", eventType);

  if (eventType === "user.created") {
    console.log("👤 Processing user.created event");
    const { id, email_addresses, first_name, last_name, phone_numbers } = evt.data;

    console.log("📧 User data:", {
      id,
      first_name,
      last_name,
      email_addresses_count: email_addresses?.length,
      phone_numbers_count: phone_numbers?.length,
      primary_email_id: evt.data.primary_email_address_id,
      primary_phone_id: evt.data.primary_phone_number_id,
    });

    // Get primary email
    const primaryEmail = email_addresses.find((email) => email.id === evt.data.primary_email_address_id);
    
    // Get primary phone
    const primaryPhone = phone_numbers?.find((phone) => phone.id === evt.data.primary_phone_number_id);

    console.log("📧 Primary email:", primaryEmail?.email_address);
    console.log("📱 Primary phone:", primaryPhone?.phone_number);

    if (!primaryEmail) {
      console.error("❌ No primary email found");
      return new Response("No primary email found", { status: 400 });
    }

    try {
      const userData = {
        clerk_id: id,
        email: primaryEmail.email_address,
        first_name: first_name || null,
        last_name: last_name || null,
        phone_number: primaryPhone?.phone_number || null,
      };

      console.log("💾 Inserting user into database:", userData);

      // Create user in database
      const result = await db.insert(users).values(userData);

      console.log("✅ User created successfully:", result);
      console.log(`✅ User created in DB: ${id}`);

      // Set default role to 'client' in Clerk public metadata
      const client = await clerkClient();
      await client.users.updateUserMetadata(id, {
        publicMetadata: {
          role: "client",
        },
      });

      console.log("✅ User role set to 'client' in public metadata");
    } catch (error) {
      console.error("❌ Error creating user:", error);
      console.error("Error details:", JSON.stringify(error, null, 2));
      return new Response("Error creating user", { status: 500 });
    }
  }

  if (eventType === "user.updated") {
    console.log("✏️ Processing user.updated event");
    const { id, email_addresses, first_name, last_name, phone_numbers } = evt.data;

    console.log("📧 User data:", {
      id,
      first_name,
      last_name,
      email_addresses_count: email_addresses?.length,
      phone_numbers_count: phone_numbers?.length,
    });

    // Get primary email
    const primaryEmail = email_addresses.find((email) => email.id === evt.data.primary_email_address_id);
    
    // Get primary phone
    const primaryPhone = phone_numbers?.find((phone) => phone.id === evt.data.primary_phone_number_id);

    if (!primaryEmail) {
      console.error("❌ No primary email found");
      return new Response("No primary email found", { status: 400 });
    }

    try {
      const updateData = {
        email: primaryEmail.email_address,
        first_name: first_name || null,
        last_name: last_name || null,
        phone_number: primaryPhone?.phone_number || null,
        updatedAt: new Date(),
      };

      console.log("💾 Updating user in database:", updateData);

      // Update user in database
      const result = await db
        .update(users)
        .set(updateData)
        .where(eq(users.clerk_id, id));

      console.log("✅ User updated successfully:", result);
      console.log(`✅ User updated in DB: ${id}`);
    } catch (error) {
      console.error("❌ Error updating user:", error);
      console.error("Error details:", JSON.stringify(error, null, 2));
      return new Response("Error updating user", { status: 500 });
    }
  }

  if (eventType === "user.deleted") {
    console.log("🗑️ Processing user.deleted event");
    const { id } = evt.data;

    console.log("User ID to delete:", id);

    if (!id) {
      console.error("❌ No user ID found");
      return new Response("No user ID found", { status: 400 });
    }

    try {
      console.log("💾 Deleting user from database:", id);

      // Delete user from database
      const result = await db.delete(users).where(eq(users.clerk_id, id));

      console.log("✅ User deleted successfully:", result);
      console.log(`✅ User deleted from DB: ${id}`);
    } catch (error) {
      console.error("❌ Error deleting user:", error);
      console.error("Error details:", JSON.stringify(error, null, 2));
      return new Response("Error deleting user", { status: 500 });
    }
  }

  console.log("✅ Webhook processed successfully");
  return new Response("", { status: 200 });
}
