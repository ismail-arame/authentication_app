import User from "@/models/User.model";
import connectDb from "@/utils/connectDb";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const { ACTIVATION_TOKEN_SECRET } = process.env;
// TOKEN Structure Exemple => { id: '649b3771f238604c591bc2a3', iat: 1687893873, exp: 1688153073 }
type tokenType = {
  id: string;
  iat: number;
  exp: number;
};

export async function PUT(req: NextRequest) {
  try {
    await connectDb();

    const body = await req.json();
    const { token } = body;
    console.log("token", token);
    const userToken = jwt.verify(token, ACTIVATION_TOKEN_SECRET!) as tokenType;
    console.log("userToken", userToken);

    const userDB = await User.findById(userToken.id);
    if (!userDB) {
      const userDoesntExist_message = {
        message: "This account no longer exist.",
      };
      return new Response(JSON.stringify(userDoesntExist_message), {
        status: 400,
      });
    }

    if (userDB.emailVerified) {
      const userAlreadyVerified_message = {
        message: "Email address already verified.",
      };
      return new Response(JSON.stringify(userAlreadyVerified_message), {
        status: 400,
      });
    } else {
      await User.findByIdAndUpdate(userToken.id, {
        emailVerified: true,
      });
      return NextResponse.json({
        message: "Your account has been successfully activated.",
      });
    }
  } catch (error) {
    const error_message = { message: (error as Error).message };
    return new Response(JSON.stringify(error_message), {
      status: 500,
    });
  }
}
