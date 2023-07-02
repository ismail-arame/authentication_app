import Form from "@/components/forms/form";
import Background from "@/components/backgrounds/background";
import { getCsrfToken, getProviders } from "next-auth/react";

export default async function AuthSignin() {
  const csrfToken = await getCsrfToken();
  const providers = await getProviders();
  //providers = {{id: ,name: ,...}, {id: ,name: ,...}}
  //using object.values to turn it into an array of objects [{id: ,...}, {id: ,...}]
  // console.log("csrfToken : ", csrfToken);
  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-full h-full flex items-center justify-center">
        {/* ------ Left Side (Form) ------*/}
        <Form
          page="signin"
          providers={Object.values(providers!)}
          csrfToken={csrfToken}
        />
        {/* ------ Right Side (Background) ------ */}
        <Background image="../../../signin.jpg" />
      </div>
    </div>
  );
}
