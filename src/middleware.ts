import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl;

  //when using JWT with NextAuth we can get the token without having to handle JWT decryption / verification yourself
  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production", //cookies are transmitted only over HTTPS
  });

  //if the user is not logged in we will redirect him to the authentication page
  if (pathname === "/") {
    if (!session) {
      return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/auth`);
    }
  }
  //if the user is logged in we will redirect him to the Base URL
  if (pathname === "/auth") {
    if (session) {
      return NextResponse.redirect(`${origin}`);
    }
  }
}
