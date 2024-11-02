import MongoDBConnection from "@/config/db";
import mongoose from "mongoose";

MongoDBConnection();

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default: "default-profile.png",
    },
    CreatedBlogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BlogPost",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        defualt: [],
      },
    ],
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        defualt: [],
      },
    ],
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = User;
