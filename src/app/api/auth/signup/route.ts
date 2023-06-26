import User from "@/models/User.model";
import connectDb from "@/utils/connectDb";
import { NextRequest, NextResponse } from "next/server";
import validator from "validator";
// npm i bcryptjs && npm i --save-dev @types/bcryptjs
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    // connect to the mongodb database
    await connectDb();
    //   extract signup form data from the body
    const body = await req.json(); //very necessary in nextjs13.4
    const { firstname, lastname, email, phone, password } = body;

    if (!firstname || !lastname || !email || !phone || !email || !password) {
      return NextResponse.json({
        message: "Please fill in all fields.",
      });
    }

    if (!validator.isEmail(email)) {
      return NextResponse.json({
        message: "Please add a valid email address.",
      });
    }

    if (!validator.isMobilePhone(phone)) {
      return NextResponse.json({
        message: "Please add a valid phone number.",
      });
    }

    //   check if the user already exists in the database
    const user = await User.findOne({
      email: email,
    });
    if (user) {
      return NextResponse.json({
        errorMessage: "This email address already exists",
      });
    }

    if (password.length < 6) {
      return NextResponse.json({
        message: "Password must be at least 6 characters.",
      });
    }

    const cryptedPassword = await bcrypt.hash(password, 12);
    //registring new user to the database
    const newUser = new User({
      name: `${firstname}${" "}${lastname}`,
      email,
      phone,
      password: cryptedPassword,
    });
    await newUser.save();
    return NextResponse.json({
      message: "Register success! Please activate your account.",
    }); // very mecessary to return a response
  } catch (error) {
    return NextResponse.json({
      message: (error as Error).message,
    });
  }
}
