"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import SignInAuth from "@/components/auth/signInAuth";

export default function Activate() {
  const [success, setSuccess] = useState<string>("");
  const [error, setError] = useState<string>("");
  const param = useParams();
  const token = param.token;
  //   console.log("token", token);
  useEffect(() => {
    activateAccount();
  }, [token]);
  const activateAccount = async () => {
    try {
      // POST is used to create new resources, while PUT is used to update existing resources. POST requests are not idempotent, meaning that each request may result in a different outcome, whereas PUT requests are idempotent and can be repeated without causing different effects.
      const { data } = await axios.put("/api/auth/activate", {
        token,
      });
      setSuccess(data.message);
    } catch (error: any) {
      setError(error?.response?.data.message);
    }
  };
  return (
    <div className="bg-black h-screen flex items-center justify-center text-center">
      {error && (
        <div>
          <p className="text-red-500 text-xl font-bold">{error}</p>
          <SignInAuth className="mt-4 bg-blue-500 text-white hover:bg-blue-700 text-md uppercase font-bold px-8 py-2 rounded-md sm:mr-2 mb-1 ease-linear transition-all duration-150" />
        </div>
      )}
      {success && (
        <div>
          <p className="text-green-500 text-xl font-bold">{success}</p>
          <SignInAuth className="mt-4 bg-blue-500 text-white hover:bg-blue-700 text-md uppercase font-bold px-8 py-2 rounded-md sm:mr-2 mb-1 ease-linear transition-all duration-150" />
        </div>
      )}
    </div>
  );
}
