// import RegisterForm from "@/components/forms/register";

import Form from "@/components/forms/form";
import Background from "@/components/backgrounds/background";

export default function Auth() {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-full h-full flex items-center justify-center">
        {/* ------ Left Side (Form) ------*/}
        <Form />
        {/* ------ Right Side (Background) ------ */}
        <Background image="../../../signup.jpg" />
      </div>
    </div>
  );
}
