import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
// import jwt from "jsonwebtoken";
import * as jose from "jose";

const { LOGIN_TOKEN_SECRET } = process.env;
// TOKEN Structure Exemple => { id: '649b3771f238604c591bc2a3', iat: 1687893873, exp: 1688153073 }
type tokenType = {
  id: string;
  iat: number;
  exp: number;
};

export async function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl;
  let cookie = req.cookies.get("user");
  if (cookie) {
    try {
      // console.log(JSON.parse(cookie?.value));
      const cookie_object = JSON.parse(cookie?.value);
      const secret = new TextEncoder().encode(LOGIN_TOKEN_SECRET);
      const token = cookie_object.token;
      // const jwt =
      //   "eyJhbGciOiJIUzI1NiJ9.eyJ1cm46ZXhhbXBsZTpjbGFpbSI6dHJ1ZSwiaWF0IjoxNjY5MDU2MjMxLCJpc3MiOiJ1cm46ZXhhbXBsZTppc3N1ZXIiLCJhdWQiOiJ1cm46ZXhhbXBsZTphdWRpZW5jZSJ9.C4iSlLfAUMBq--wnC6VqD9gEOhwpRZpoRarE0m7KEnI";
      //verifying token using jose because jwt is not supported inside a middleware in nextjs13
      const { payload } = await jose.jwtVerify(token, secret);

      // console.log("payload is =>  ", payload);
      //if the user is not logged in we will redirect him to the authentication page
      if (pathname === "/") {
        if (!payload) {
          return NextResponse.redirect(
            `${process.env.NEXTAUTH_URL}/authsignin`
          );
        }
      }
      // //if the user is logged in we will redirect him to the Base URL
      if (pathname === "/authsignin" || pathname === "/authsignup") {
        if (payload) {
          return NextResponse.redirect(`${origin}`);
        }
      }
    } catch (error) {
      console.log((error as Error).message);
      // return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/authsignin`);
    }
  } else {
    //when using JWT with NextAuth we can get the token without having to handle JWT decryption / verification yourself
    const session = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
      secureCookie: process.env.NODE_ENV === "production", //cookies are transmitted only over HTTPS
    });

    //if the user is not logged in we will redirect him to the authentication page
    if (pathname === "/") {
      if (!session) {
        return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/authsignin`);
      }
    }
    //if the user is logged in we will redirect him to the Base URL
    if (pathname === "/authsignin" || pathname === "/authsignup") {
      if (session) {
        return NextResponse.redirect(`${origin}`);
      }
    }
  }
}
