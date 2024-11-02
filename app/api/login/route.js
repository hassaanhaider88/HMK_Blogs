import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "@/models/User_model";
import { NextResponse } from "next/server";
import MongoDBConnection from "@/config/db";
import { cookies } from "next/headers";

export async function POST(req) {
  await MongoDBConnection(); // Ensure the DB connection is established

  const data = await req.json(); // Parse incoming JSON data
  const FindUser = await UserModel.findOne({ email: data.email }); // Check if user already exists

  if (!FindUser) {
    console.log(FindUser);
    return NextResponse.json(
      { message: "Dont't Found Any User..." },
      { status: 404 }
    );
  } else {
    const matchPass = await bcrypt.compare(data.password, FindUser.password);
    console.log(matchPass);
    // return NextResponse.json({ message: "User Found" }, { status: 200 })
    if (!matchPass) {
      return NextResponse.json(
        { message: "Wrong Cridentials.." },
        { status: 403 }
      );
    } else {
      const token = jwt.sign(
        { email: FindUser.email, userId: FindUser._id },
        process.env.JWT_SECRET,
        { expiresIn: "15d" } // Set token expiration time (optional)
      );
      cookies().set("Token", token);
      return NextResponse.json(
        { message: "Successfully Logged In", FindUser, token },
        { status: 200 }
      );
    }
  }
  try {
  } catch (error) {
    return NextResponse.json(
      { message: "Something wents wrong.." },
      { status: 500 }
    );
  }
}
