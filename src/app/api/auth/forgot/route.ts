import { resetPasswordEmail } from "@/emailTemplates/reset";
import User from "@/models/User.model";
import connectDb from "@/utils/connectDb";
import sendMail from "@/utils/sendMail";
import { createResetToken } from "@/utils/tokenGenerator";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDb();
    const body = await req.json();
    const { email } = body;

    //checking if the email exists
    const user = await User.findOne({
      email: email,
    });
    if (!user) {
      const userDoesnotExist_message = {
        message: "This email address doesn't exist",
      };
      return new Response(JSON.stringify(userDoesnotExist_message), {
        status: 400,
      });
    }

    //creating a reset token
    const user_id = createResetToken({
      id: user._id.toString(),
    });

    const url = `${process.env.NEXTAUTH_URL}/reset/${user_id}`;

    // sending mail
    await sendMail(
      email,
      user.name,
      user.image,
      url,
      "Password Reset",
      resetPasswordEmail
    );

    return NextResponse.json({
      message: "An email has been sent to you, use it to reset your password.",
    });
  } catch (error) {
    const error_message = (error as Error).message;
    return new Response(JSON.stringify(error_message), {
      status: 500,
    });
  }
}
