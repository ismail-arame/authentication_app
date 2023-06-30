import Form from "@/components/forms/form";
import Background from "@/components/backgrounds/background";

export default async function AuthSignin() {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-full h-full flex items-center justify-center">
        {/* ------ Left Side (Form) ------*/}
        <Form page="signin" />
        {/* ------ Right Side (Background) ------ */}
        <Background image="../../../signin.jpg" />
      </div>
    </div>
  );
}
