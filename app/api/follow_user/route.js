import { NextResponse } from "next/server";
import UserModel from "@/models/User_model";

export async function POST(req) {
  const data = await req.json();
  const { SelectUserId, LoggedInUserId } = data;

  const SUser = await UserModel.findOne({ _id: SelectUserId });
  const LoggedInUser = await UserModel.findOne({ _id: LoggedInUserId });
  const IsFollow = SUser?.followers.includes(LoggedInUserId);
  if (IsFollow) {
    const followerIndex = SUser.followers.indexOf(LoggedInUserId);
    const followingIndex = LoggedInUser.following.indexOf(SelectUserId);
    SUser.followers.splice(followerIndex, 1);
    LoggedInUser.following.splice(followingIndex, 1);
  } else {
    SUser.followers.push(LoggedInUserId);
    LoggedInUser.following.push(SelectUserId);
  }

  await SUser.save();
  await LoggedInUser.save();
  return NextResponse.json(IsFollow);
}
