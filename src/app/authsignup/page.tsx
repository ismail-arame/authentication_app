import Form from "@/components/forms/form";
import Background from "@/components/backgrounds/background";
import { getCsrfToken, getProviders } from "next-auth/react";

export default async function AuthSignup() {
  const csrfToken = await getCsrfToken();
  const providers = await getProviders();
  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-full h-full flex items-center justify-center">
        {/* ------ Left Side (Form) ------*/}
        <Form
          page="signup"
          providers={Object.values(providers!)}
          csrfToken={csrfToken}
        />
        {/* ------ Right Side (Background) ------ */}
        <Background image="../../../signup.jpg" />
      </div>
    </div>
  );
}
