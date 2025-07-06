import { NextResponse } from "next/server";
import cloudinary from "@/lib/config/cloudinary";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { success: 0, error: "No file provided" },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64 = buffer.toString("base64");
    const dataUrl = `data:${file.type};base64,${base64}`;

    const result = await cloudinary.uploader.upload(dataUrl, {
      folder: "blog/editor",
    });

    return NextResponse.json({
      success: 1,
      file: {
        url: result.secure_url,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: 0, error: error.message },
      { status: 500 }
    );
  }
}