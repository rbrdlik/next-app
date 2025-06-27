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
      return NextResponse.json({ payload: post }, {
        status: 200,
      });
    }

    return NextResponse.json({ error: "Post not found" }, {
      status: 404,
    });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, {
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
      return NextResponse.json({ payload: result }, {
        status: 200,
      });
    }

    return NextResponse.json({ error: "Failed to update post" }, {
      status: 400,
    });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, {
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
      return NextResponse.json({ error: "Post not found" }, {
        status: 404,
      });
    }

    return NextResponse.json({ message: "Post deleted successfully" }, {
      status: 200,
    });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, {
      status: 500,
    });
  }
};
