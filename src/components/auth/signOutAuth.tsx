"use client";

import { signOut } from "next-auth/react";
export default function SignOutAuth() {
  return (
    <button onClick={() => signOut()} className="bg-blue-400">
      SignOut
    </button>
  );
}
