import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import UserModel from "@/models/User_model";
import MongoDBConnection from "@/config/db";

export async function GET(req) {
  await MongoDBConnection(); // Ensure the DB connection is established

  try {
    const Token = cookies().get("Token")?.value;
    var decoded = jwt.verify(Token, process.env.JWT_SECRET);
    const Email = decoded?.email;

    const findUser = await UserModel.findOne({ email: Email }).populate({
      path: "CreatedBlogs",
      populate: {
        path: "likedBy createdBy",
        model: "User",
      },
    });
    if (!findUser) return NextResponse.Next();
    return NextResponse.json({ findUser });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({ error: error.message });
  }
}
