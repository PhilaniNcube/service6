// app/api/upload/route.ts
import { NextRequest, NextResponse } from "next/server";
import { uploadToR2, getPublicR2Url } from "@/lib/r2";
import { createDocumentRecord } from "@/dal/actions";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const clerkId = formData.get("clerkId");
    const documentTypeInput = formData.get("documentType");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "File is required" }, { status: 400 });
    }

    if (!clerkId || typeof clerkId !== "string") {
      return NextResponse.json({ error: "clerkId is required" }, { status: 400 });
    }

    const documentTypeFromClient =
      typeof documentTypeInput === "string" ? documentTypeInput : undefined;

    const inferredDocumentType = file.type.startsWith("image/")
      ? "image"
      : file.type === "application/pdf"
      ? "pdf"
      : file.type.startsWith("video/")
      ? "video"
      : "other";

    const documentType = documentTypeFromClient ?? inferredDocumentType;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const ext = file.name.split(".").pop();
    const key = `uploads/${Date.now()}-${Math.random().toString(36).slice(2)}${ext ? "." + ext : ""}`;

    await uploadToR2({
      key,
      body: buffer,
      contentType: file.type || "application/octet-stream",
    });

    const publicUrl = getPublicR2Url(key);

    // Persist document metadata in the database
    const document = await createDocumentRecord({
      clerkId,
      storageKey: key,
      documentType,
      fileType: file.type || "application/octet-stream",
      fileSizeBytes: file.size,
      // Width/height can be populated later if you add image probing
      width: null,
      height: null,
    });

    return NextResponse.json({
      key,
      url: publicUrl, // might be null if not configured
      documentId: document.id,
    });
  } catch (error) {
    console.error("R2 upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}