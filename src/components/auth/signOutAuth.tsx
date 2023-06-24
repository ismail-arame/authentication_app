"use client";

import { signOut } from "next-auth/react";
export default function SignOutAuth({ className }: { className: string }) {
  return (
    <button onClick={() => signOut()} className={className}>
      Sign Out
    </button>
  );
}
