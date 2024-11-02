import { NextResponse } from "next/server";
import Blog from "@/models/Blog_Post";
import UserModel from "@/models/User_model";

export const POST = async (request) => {
  const { heading, blogBody, imageUrl, author } = await request.json();
  try {
    const user = await UserModel.findOne({ _id: author });
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 400 });

    const newBlog = await Blog.create({
      BlogHeading: heading,
      blogBody,
      imageUrl,
      createdBy: author,
    });
    user.CreatedBlogs.push(newBlog._id);
    await user.save();
    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create a new blog" },
      { status: 500 }
    );
  }
};
