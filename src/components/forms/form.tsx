import LoginForm from "./login";
import RegisterForm from "./register";

export default function Form({ page }: { page: string }) {
  return (
    <div className="w-full sm:w-5/6 md:h-2/3 lg:w-1/2 xl:w-1/3 2xl:w-1/3 h-full bg-white flex items-center justify-center">
      {/* _____________ SIGNUP or Register FORM*/}
      {/* <RegisterForm /> */}
      {page === "signin" ? <LoginForm /> : <RegisterForm />}
    </div>
  );
}
