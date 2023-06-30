import User from "@/models/User.model";
import connectDb from "@/utils/connectDb";
import { createLoginToken } from "@/utils/tokenGenerator";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await connectDb();
  const body = await req.json();
  const { email, password } = body;
  const user = await User.findOne({ email: email });
  if (!user) {
    const emailNotRegistered_message = { message: "Email is not registered" };
    return new Response(JSON.stringify(emailNotRegistered_message), {
      status: 400,
    });
  }
  const isPasswordTheSame = await bcrypt.compare(password, user.password);
  if (!isPasswordTheSame) {
    const emailOrPassIncorrect_message = {
      message: "Email or password are incorrect.",
    };
    return new Response(JSON.stringify(emailOrPassIncorrect_message), {
      status: 400,
    });
  }

  //Credentials are valid
  const login_token = createLoginToken({
    id: user._id.toString(),
  });
  return NextResponse.json({
    name: user.name,
    email: user.email,
    image: user.image,
    token: login_token,
    message: "Sign in Success",
  });
}
