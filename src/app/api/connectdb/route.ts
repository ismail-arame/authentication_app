import connectDb from "@/utils/connectDb";
import { NextResponse } from "next/server";

export async function POST() {
  await connectDb();

  return NextResponse.json("good!");
}
