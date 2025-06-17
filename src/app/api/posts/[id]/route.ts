"use server";

import { NextResponse } from "next/server";
import { Post } from "@/models/post";
import { connectToDatabase } from "@/lib/mongoose";
import { ObjectId } from "mongoose";

export const GET = async (req: Request, { params }: { params: { id: ObjectId } }) => {
  try {
    const { id } = await params;
    await connectToDatabase();

    const post = await Post.findById(id);

    if (post) {
      return new NextResponse(JSON.stringify(post), {
        status: 200,
      });
    }

    return new NextResponse(JSON.stringify({ error: "Post not found" }), {
      status: 404,
    });
  } catch (err) {
    return new NextResponse(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
    });
  }
};

export const PUT = async (req: Request, { params }: { params: { id: ObjectId } }) => {
  try {
    const { id } = await params;

    await connectToDatabase();

    const body = await req.json();
    const data = {
      title: body.title,
      content: body.content,
      author: body.author,
    };

    const result = await Post.findByIdAndUpdate(id, data);

    if (result) {
      return new NextResponse(JSON.stringify(result), {
        status: 200,
      });
    }

    return new NextResponse(JSON.stringify({ error: "Failed to update post" }), {
      status: 400,
    });
  } catch (err) {
    return new NextResponse(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
    });
  }
};

export const DELETE = async (req: Request, { params }: { params: { id: ObjectId } }) => {
  try {
    const { id } = await params;

    await connectToDatabase();

    const post = await Post.findByIdAndDelete(id);
    if (!post) {
      return new NextResponse(JSON.stringify({ error: "Post not found" }), {
        status: 404,
      });
    }

    return new NextResponse(
      JSON.stringify({ message: "Post deleted successfully" }),
      {
        status: 200,
      }
    );
  } catch (err) {
    return new NextResponse(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
    });
  }
};
