"use client";

import { signIn } from "next-auth/react";
export default function SignInAuth() {
  return (
    <button onClick={() => signIn()} className="bg-blue-400">
      SignIn
    </button>
  );
}
