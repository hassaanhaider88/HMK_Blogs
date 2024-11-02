import { NextResponse } from "next/server";
import BlogPost from "@/models/Blog_Post";
export async function POST(req) {
  const data = await req.json();
  try {
    const SingleBlog = await BlogPost.findOne({ _id: data.Blog_id }).populate(
      "likedBy"
    );
    if (!SingleBlog) {
      return NextResponse.json({ succes: "false", data: [] });
    } else {
      return NextResponse.json({ succes: "true", data: SingleBlog });
    }
  } catch (error) {
    return NextResponse.json({ succes: "false", data: [] });
  }
}
