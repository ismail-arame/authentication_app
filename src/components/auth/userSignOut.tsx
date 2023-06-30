"use client";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function UserSignOut({ className }: { className: string }) {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        Cookies.remove("user");
        router.push("/authsignin");
      }}
      className={className}
    >
      Sign Out
    </button>
  );
}
