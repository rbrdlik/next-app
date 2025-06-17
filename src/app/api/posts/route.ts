"use server";

import { NextResponse } from "next/server";
import { Post } from "@/models/post";
import { connectToDatabase } from "@/lib/mongoose";

export const GET = async (req: Request) => {
  try {
    await connectToDatabase();

    const posts = await Post.find();

    return new NextResponse(JSON.stringify(posts), {
      status: 200,
    });
  } catch (err) {
    return new NextResponse(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
    });
  }
};

export const POST = async (req: Request) => {
  try {
    await connectToDatabase();

    const body = await req.json();

    const data = new Post({
      title: body.title,
      content: body.content,
      author: body.author,
    });
    const result = await data.save();

    if (result) {
      return new NextResponse(JSON.stringify(result), {
        status: 201,
      });
    }
    
    return new NextResponse(JSON.stringify({ error: "Failed to create post" }), {
      status: 400,
    });
  } catch (err) {
    return new NextResponse(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
    });
  }
};
