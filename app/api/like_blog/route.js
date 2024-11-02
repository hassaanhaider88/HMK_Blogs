import { NextResponse } from "next/server";
import BlogPost from "@/models/Blog_Post";

export async function POST(req) {
  const data = await req.json();
  const likeBlog = await BlogPost.findOne({ _id: data.LikeBlogId });
  const userIndex = likeBlog.likedBy.indexOf(data.BlogLikeById);
  console.log(userIndex);
  if (userIndex === -1) {
    likeBlog.likedBy?.push(data.BlogLikeById);
    await likeBlog.save();
    return NextResponse.json({ message: "Like Successfully", likeBlog });
  } else {
    likeBlog.likedBy.splice(userIndex, 1);
    await likeBlog.save();
    return NextResponse.json({ message: "UnLike Successfully", likeBlog });
  }
}
