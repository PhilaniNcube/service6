/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { r2BucketName, r2Client } from "@/lib/r2";


export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ key: string }> }
) {
  try {
    // Unwrap params (Next 15+ async params) and decode the key
    const { key: rawKey } = await context.params;
    const key = decodeURIComponent(rawKey);

    const command = new GetObjectCommand({
      Bucket: r2BucketName,
      Key: key,
    });

    const response = await r2Client.send(command);

    const body = response.Body;
    if (!body) {
      return new NextResponse("File not found", { status: 404 });
    }

    // Convert the streaming body into a web-readable stream
    const readableStream =
      body instanceof ReadableStream
        ? body
        : (body as any).transformToWebStream
        ? (body as any).transformToWebStream()
        : body as any;

    const headers = new Headers();

    if (response.ContentType) {
      headers.set("Content-Type", response.ContentType);
    }

    if (response.ContentLength != null) {
      headers.set("Content-Length", String(response.ContentLength));
    }

    if (response.ETag) {
      headers.set("ETag", response.ETag.replace(/"/g, ""));
    }

    if (response.LastModified) {
      headers.set("Last-Modified", response.LastModified.toUTCString());
    }

    return new NextResponse(readableStream as any, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error("R2 file fetch error:", error);
    return new NextResponse("Unable to fetch file", { status: 500 });
  }
}
