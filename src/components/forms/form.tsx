import SocialButton from "../buttons/socialButton";
import LoginForm from "./login";
import RegisterForm from "./register";

export default function Form({
  page,
  providers,
  csrfToken,
}: {
  page: string;
  providers: any;
  csrfToken: string | undefined;
}) {
  return (
    <div className="w-full sm:w-5/6 md:h-2/3 lg:w-1/2 xl:w-1/3 2xl:w-1/3 h-full bg-white flex flex-col items-center justify-center">
      {/* _____________ SIGNUP or Register FORM*/}
      {/* <RegisterForm /> */}
      {page === "signin" ? <LoginForm /> : <RegisterForm />}
      <div className="w-full flex items-center justify-between px-12">
        <div className="w-full h-[1px] bg-gray-300"></div>
        <span className="text-sm uppercase mx-6 text-gray-400">Or</span>
        <div className="w-full h-[1px] bg-gray-300"></div>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {providers?.map((provider: any) => {
          return (
            <SocialButton
              key={provider.id}
              id={provider.id}
              text={
                page === "signin"
                  ? `Sign in with ${provider.id}`
                  : `Sign up with ${provider.id}`
              }
              csrfToken={csrfToken}
            />
          );
        })}
      </div>
    </div>
  );
}
