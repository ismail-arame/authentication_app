import connectDb from "@/utils/connectDb";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/User.model";
import bcrypt from "bcryptjs";

const { RESET_TOKEN_SECRET } = process.env;
type tokenType = {
  id: string;
};
export async function POST(req: NextRequest) {
  try {
    await connectDb();
    const body = await req.json();
    const { password, token } = body;

    //verifying the jwt token
    const userToken = jwt.verify(token, RESET_TOKEN_SECRET!) as tokenType;
    const userDB = await User.findById(userToken.id);
    if (!userDB) {
      const accountDoesnotExist_message = {
        message: "This account no longer exists.",
      };
      return new Response(JSON.stringify(accountDoesnotExist_message), {
        status: 400,
      });
    }

    const cryptedPassword = await bcrypt.hash(password, 12);
    await User.findByIdAndUpdate(userDB.id, {
      password: cryptedPassword,
    });
    return NextResponse.json({
      message: "Password changed successfully",
    });
  } catch (error) {
    const error_message = { message: (error as Error).message };
    return new Response(JSON.stringify(error_message), {
      status: 500,
    });
  }
}
