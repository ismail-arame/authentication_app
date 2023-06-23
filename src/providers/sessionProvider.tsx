"use client";

import { SessionProvider } from "next-auth/react";
import { ChildrenProps } from "@/interfaces/childrenProps";

//this components serves as a wrapper arround the original SessioProvider component provided by NextAuth
//and this is because the sessionProvider is a client component and if we wrap it directly as a parent of the app all components would be client component
export default function NextAuthSessionProvider({ children }: ChildrenProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
