"use client";

import { useForm, SubmitHandler } from "react-hook-form";

import Input from "../inputs/input";
import { FiMail, FiLock } from "react-icons/fi";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SlideSubmitButton from "../buttons/slideSubmitButton";
import Link from "next/link";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

interface ILoginFormProps {}

const FormSchema = z.object({
  email: z.string().email("invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters.")
    .max(32, "Password must be less than 32 characters."),
});

type FormSchemaType = z.infer<typeof FormSchema>;

const LoginForm: React.FunctionComponent<ILoginFormProps> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  const router = useRouter();
  const onSubmit: SubmitHandler<FormSchemaType> = async (values) => {
    try {
      const { data } = await axios.post("/api/auth/signin", {
        ...values,
      });
      console.log(data);
      Cookies.set("user", JSON.stringify(data), { sameSite: "none" });
      toast.success(data.message);
      router.push("/");
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="w-full px-12 py-4">
      {isSubmitting && <span className="_it4vx _72fik"></span>}
      <h2 className="text-center text-2xl font-bold tracking-wide text-gray-800">
        Sign in
      </h2>
      <p className="text-center text-sm text-gray-600 mt-2">
        You do not have an account ? &nbsp;
        <Link
          href="/authsignup"
          className="text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
        >
          Sign up
        </Link>
      </p>
      <form className="my-8 text-sm" onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="email"
          label="Email"
          type="text"
          icon={<FiMail />}
          placeholder="email@email.com"
          register={register}
          error={errors?.email?.message}
          disabled={isSubmitting}
        />
        <Input
          name="password"
          label="Password"
          type="password"
          icon={<FiLock />}
          placeholder="******************"
          register={register}
          error={errors?.password?.message}
          disabled={isSubmitting}
        />
        {/* Submit Button Component */}
        <SlideSubmitButton
          type="submit"
          text="Sign in"
          slide_text="Secure sign in"
          icon={<FiLock />}
          disabled={isSubmitting}
        />
      </form>
    </div>
  );
};

export default LoginForm;
