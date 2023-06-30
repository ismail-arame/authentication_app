import Form from "@/components/forms/form";
import Background from "@/components/backgrounds/background";

export default async function AuthSignup() {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-full h-full flex items-center justify-center">
        {/* ------ Left Side (Form) ------*/}
        <Form page="signup" />
        {/* ------ Right Side (Background) ------ */}
        <Background image="../../../signup.jpg" />
      </div>
    </div>
  );
}
