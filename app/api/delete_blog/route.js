import { NextResponse } from "next/server";
import BlogPost from "@/models/Blog_Post";
import UserModel from "@/models/User_model";

export async function POST(req) {
  try {
    const data = await req.json();
    const DeleteBlog = await BlogPost.findOneAndDelete({
      _id: data.DeleteAbleUrl,
    });
    const User = await UserModel.findOne({ _id: data.DeletedBlogUserId });
    const UserCreatedBlog = await User.CreatedBlogs.filter(
      (blogId) => blogId.toString() !== data.DeleteAbleUrl
    );
    await User.save();
    return NextResponse.json({ success: true, User });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
