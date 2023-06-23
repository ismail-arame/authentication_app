import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth/next";
import Image from "next/image";
import SignOutAuth from "@/components/auth/signOutAuth";
import SignInAuth from "@/components/auth/signInAuth";

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log("session is **** : ", session);

  return (
    <>
      {session && session.user ? (
        <>
          <h1>{`Welcome Home ${session?.user?.name}`}</h1>
          <Image
            src={session.user.image as string}
            width={80}
            height={80}
            alt="github img"
            className="rounded-full object-cover"
          />
          <SignOutAuth />
        </>
      ) : (
        <SignInAuth />
      )}
    </>
  );
}
