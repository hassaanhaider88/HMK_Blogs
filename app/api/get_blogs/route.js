import { NextResponse } from "next/server";
import BlogsPostModel from "@/models/Blog_Post";

export async function GET(req) {
  try {
    const allBlogs = await BlogsPostModel.find().populate("createdBy likedBy");
    if (allBlogs.length === 0) {
      return NextResponse.json({ allBlogs: [] });
    } else {
      return NextResponse.json({ allBlogs });
    }
  } catch (error) {
    console.error("Error while fetching blogs:", error); // Log the error for debugging
    return NextResponse.json(
      { message: "Error while fetching blogs" },
      { status: 500 }
    ); // Return a status code 500 for server error
  }
}
