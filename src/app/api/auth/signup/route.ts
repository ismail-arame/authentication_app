import User from "@/models/User.model";
import connectDb from "@/utils/connectDb";
import { NextRequest, NextResponse } from "next/server";
import validator from "validator";
// npm i bcryptjs && npm i --save-dev @types/bcryptjs
import bcrypt from "bcryptjs";
import { createActivationToken } from "@/utils/tokenGenerator";
import sendMail from "@/utils/sendMail";
import { activateTemplateEmail } from "@/emailTemplates/activate";

export async function POST(req: NextRequest) {
  try {
    // connect to the mongodb database
    await connectDb();
    //   extract signup form data from the body
    const body = await req.json(); //very necessary in nextjs13.4
    const { firstname, lastname, email, phone, password } = body;

    if (!firstname || !lastname || !email || !phone || !email || !password) {
      const allFields_message = {
        message: "Please fill in all fields.",
      };
      return new Response(JSON.stringify(allFields_message), {
        status: 400,
      });
    }

    if (!validator.isEmail(email)) {
      const notValidEmail_message = {
        message: "Please add a valid email address.",
      };
      return new Response(JSON.stringify(notValidEmail_message), {
        status: 400,
      });
    }

    if (!validator.isMobilePhone(phone)) {
      const notValidPhone_message = {
        message: "Please add a valid phone number.",
      };
      return new Response(JSON.stringify(notValidPhone_message), {
        status: 400,
      });
    }

    //   check if the user already exists in the database
    const user = await User.findOne({
      email: email,
    });
    if (user) {
      const email_message = { message: "This email address already exists" };
      return new Response(JSON.stringify(email_message), {
        status: 400,
      });
    }

    if (password.length < 6) {
      const minimumPasswordLength_message = {
        message: "Password must be at least 6 characters.",
      };
      return new Response(JSON.stringify(minimumPasswordLength_message), {
        status: 400,
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

    /* ----- creating an activation token ----- */
    const activation_token = createActivationToken({
      id: newUser._id.toString(),
    });

    const activation_url = `${process.env.NEXTAUTH_URL}/activate/${activation_token}`;

    /* ----- Sending Mail ----- */
    await sendMail(
      newUser.email,
      newUser.name,
      "",
      activation_url,
      "account activation",
      activateTemplateEmail
    );

    return NextResponse.json({
      message: "Register success! Please activate your account.",
    }); // very mecessary to return a response (200 status code by default)
  } catch (error) {
    const error_message = { message: (error as Error).message };
    return new Response(JSON.stringify(error_message), {
      status: 500,
    });
  }
}
