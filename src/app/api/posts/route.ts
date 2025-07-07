import cloudinary from "@/lib/config/cloudinary";
import prisma from "@/lib/db";
import { getDataFromToken } from "@/utils/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";

interface CloudinaryUploadResult {
  secure_url: string;
}

export async function POST(req: NextRequest) {
  try {
    const userID = await getDataFromToken(req);
    if (!userID) {
      return NextResponse.json(
        { success: false, message: "Please login first!" },
        { status: 401 }
      );
    }

    // Add category and readTime to the destructured request body
    const { title, content, image, type, category, readTime } = await req.json();
    const makePath = title.split(" ").join("-").toLowerCase();

    let uploadedImage: CloudinaryUploadResult | null = null;
    if (image !== null) {
      uploadedImage = await cloudinary.uploader.upload(image, {
        folder: "blog/articles",
      });
    }

    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        path: makePath,
        authorId: userID,
        image: uploadedImage?.secure_url || null,
        type,
        category: category || "", // Provide default if needed
        readTime: readTime || 0,        // Provide default if needed
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            username: true,
            avatar: true,
          },
        },
      },
    });

    return NextResponse.json(
      { success: true, message: "Post created successfully", newPost },
      { status: 201 }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

//@description     Get all post for home feed
//@route           GET /api/posts
//@access          Not protected
export async function GET(req: NextRequest) {
  try {
    const page = parseInt(req.nextUrl.searchParams.get("page") || "1");
    const limit = parseInt(req.nextUrl.searchParams.get("limit") || "10");

    const skip = (page - 1) * limit;

    const totalPostsCount = await prisma.post.count({
      where: { NOT: { type: "DRAFT" } },
    });

    const totalPages = Math.ceil(totalPostsCount / limit);

    const posts = await prisma.post.findMany({
      where: { NOT: { type: "DRAFT" } },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            username: true,
            avatar: true,
          },
        },
        saved: true,
        _count: { select: { comments: true } },
      },
      skip,
      take: limit,
    });

    return NextResponse.json(
      { posts, totalPages, currentPage: page },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
