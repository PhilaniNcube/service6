"use server";

import { z } from "zod";
import { Resend } from "resend";

/**
 * Contact Form Action
 *
 * Server action for sending contact form emails to the admin.
 * Uses Resend to send emails to ADMIN_EMAIL_ADDRESS.
 *
 * Usage with useActionState:
 * ```typescript
 * const [state, formAction, pending] = useActionState(sendContactEmail, {
 *   success: false,
 *   message: "",
 * });
 * ```
 */

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormState = {
  success: boolean;
  message: string;
  errors?: {
    name?: string[];
    email?: string[];
    phone?: string[];
    message?: string[];
  };
};

export async function sendContactEmail(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  try {
    // Validate environment variables
    const resendApiKey = process.env.RESEND_API_KEY;
    const adminEmail = process.env.ADMIN_EMAIL_ADDRESS;

    if (!resendApiKey) {
      return {
        success: false,
        message: "Email service is not configured. Please contact support.",
      };
    }

    if (!adminEmail) {
      return {
        success: false,
        message: "Admin email is not configured. Please contact support.",
      };
    }

    // Extract and validate form data
    const rawData = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      message: formData.get("message"),
    };

    const validatedData = contactFormSchema.safeParse(rawData);

    if (!validatedData.success) {
      const errors = validatedData.error.flatten().fieldErrors;
      return {
        success: false,
        message: "Please check the form for errors",
        errors: {
          name: errors.name,
          email: errors.email,
          phone: errors.phone,
          message: errors.message,
        },
      };
    }

    const { name, email, phone, message } = validatedData.data;

    // Initialize Resend
    const resend = new Resend(resendApiKey);

    // Send email
    const { error } = await resend.emails.send({
      from: "Apex Med SA Contact Form <onboarding@resend.dev>",
      to: adminEmail,
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Contact Form Submission</title>
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background-color: #f8f9fa; border-radius: 8px; padding: 24px; margin-bottom: 24px;">
              <h1 style="color: #1a1a1a; margin: 0 0 16px 0; font-size: 24px;">New Contact Form Submission</h1>
              <p style="color: #666; margin: 0;">You have received a new inquiry from your website contact form.</p>
            </div>
            
            <div style="background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 24px; margin-bottom: 16px;">
              <h2 style="color: #1a1a1a; margin: 0 0 16px 0; font-size: 18px; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px;">Contact Information</h2>
              
              <div style="margin-bottom: 16px;">
                <strong style="color: #666; display: block; margin-bottom: 4px;">Name:</strong>
                <span style="color: #1a1a1a;">${name}</span>
              </div>
              
              <div style="margin-bottom: 16px;">
                <strong style="color: #666; display: block; margin-bottom: 4px;">Email:</strong>
                <a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a>
              </div>
              
              <div style="margin-bottom: 16px;">
                <strong style="color: #666; display: block; margin-bottom: 4px;">Phone:</strong>
                <a href="tel:${phone}" style="color: #2563eb; text-decoration: none;">${phone}</a>
              </div>
            </div>
            
            <div style="background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 24px; margin-bottom: 16px;">
              <h2 style="color: #1a1a1a; margin: 0 0 16px 0; font-size: 18px; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px;">Message</h2>
              <p style="color: #1a1a1a; white-space: pre-wrap; margin: 0;">${message}</p>
            </div>
            
            <div style="background-color: #f8f9fa; border-radius: 8px; padding: 16px; text-align: center;">
              <p style="color: #666; margin: 0; font-size: 14px;">This email was sent from the Apex Med SA contact form</p>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return {
        success: false,
        message: "Failed to send email. Please try again later.",
      };
    }

    return {
      success: true,
      message: "Thank you for your inquiry! We'll get back to you soon.",
    };
  } catch (error) {
    console.error("Contact form error:", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    };
  }
}
