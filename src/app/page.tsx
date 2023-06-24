import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth/next";
import Image from "next/image";
import SignOutAuth from "@/components/auth/signOutAuth";
import SignInAuth from "@/components/auth/signInAuth";

export default async function Home() {
  const session = await getServerSession(authOptions);
  // console.log("session is **** : ", session);

  return (
    <div className="bg-black min-h-screen text-white flex items-center justify-center">
      <div className="mx-auto">
        <div className="border border-white relative flex flex-col w-full rounded-lg">
          <div className="flex flex-wrap justify-center items-center">
            <div className="w-full text-right">
              <div className="py-6 px-3">
                <SignOutAuth
                  className={
                    " bg-blue-500 hover:bg-blue-700 text-lg font-bold px-8 py-2 rounded-md sm:mr-2 mb-1 ease-linear transition-all duration-150"
                  }
                />
              </div>
            </div>
            <div className="w-full flex justify-center">
              <Image
                src={session?.user?.image as string}
                height={160}
                width={160}
                alt={`${session?.user?.name} image`}
                className="rounded-full"
              />
            </div>
            <div className="text-center mt-12">
              <h3 className="text-4xl font-semibold mb-2">
                {session?.user?.name}
              </h3>
              <div className="text-sm mb-2 font-bold ">
                {session?.user?.email}
              </div>
              <div className="mb-2 mt-10">
                You signed in using &nbsp;
                <span className="capitalize bg-blue-400 text-white px-4 py-1 ml-2 font-bold italic text-lg rounded-md">
                  {session?.user?.provider}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
