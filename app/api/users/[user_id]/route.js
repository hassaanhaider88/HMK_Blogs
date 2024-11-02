import { NextResponse } from "next/server";
import UserModel from "@/models/User_model";
import { cookies } from "next/headers";

export async function POST(req) {
  try {
    const data = await req.json();
    const { SelectUserId, LoggedInUserId } = data;

    // Check if the selected user is the same as the logged-in user
    const SameLoggedUser = SelectUserId === LoggedInUserId;
    if (SameLoggedUser) {
      return NextResponse.json(false);
    } else {
      const SUser = await UserModel.findOne({ _id: SelectUserId }).populate({
        path: "CreatedBlogs",
        populate: { path: "likedBy createdBy", model: "User" },
      });
      const IsFollow = SUser?.followers.includes(LoggedInUserId);
      console.log(SUserF);
      if (!SUser) {
        return NextResponse.json(
          { message: "User not found", status: "404" },
          { status: 404 }
        );
      }
      return NextResponse.json({ SUser, IsFollow });
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export function GET(req) {
  cookies().set("Token", "");
  return NextResponse.json({ message: "Log Out Successfully.." });
}
