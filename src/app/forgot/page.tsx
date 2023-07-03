import Background from "@/components/backgrounds/background";
import ForgotForm from "@/components/forms/forgot";

export default async function Forgot() {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-full h-full flex items-center justify-center">
        {/* ------ Left Side (Form) ------*/}
        <div className="w-full sm:w-5/6 md:h-2/3 lg:w-1/2 xl:w-1/3 2xl:w-1/3 h-full bg-white flex flex-col items-center justify-center">
          {/* _____________ Forgot FORM _____________ */}
          <ForgotForm />
        </div>
        {/* ------ Right Side (Background) ------ */}
        <Background image="../../../reset.jpg" />
      </div>
    </div>
  );
}
