"use client";

import { signIn } from "next-auth/react";
export default function SignInAuth({ className }: { className: string }) {
  return (
    <button onClick={() => signIn()} className={className}>
      SignIn
    </button>
  );
}
