import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "@/models/User_model";
import { NextResponse } from "next/server";
import MongoDBConnection from "@/config/db";
import { cookies } from "next/headers";

export async function POST(req, res) {
  try {
    await MongoDBConnection(); // Ensure the DB connection is established

    const data = await req.json(); // Parse incoming JSON data
    const FindUser = await UserModel.findOne({ email: data.email }); // Check if user already exists

    if (FindUser) {
      return NextResponse.json(
        { message: "User Already Exists" },
        { status: 400 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);
    const UserNameInLC = data.username.toLowerCase().split(" ").join("_");
    const newUser = await UserModel.create({
      name: data.username,
      username: UserNameInLC,
      email: data.email,
      password: hashedPassword,
      profilePicture: data.image,
    });

    await newUser.save();

    const token = jwt.sign(
      { email: newUser.email, userId: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "15d" }
    );
    cookies().set("Token", token);

    return NextResponse.json(
      { message: "User created successfully!", newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Failed to create user." },
      { status: 500 }
    );
  }
}
