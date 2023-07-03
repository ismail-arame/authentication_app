"use client";

import { useForm, SubmitHandler } from "react-hook-form";

import Input from "../inputs/input";
import { FiMail, FiLock } from "react-icons/fi";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SlideSubmitButton from "../buttons/slideSubmitButton";
import Link from "next/link";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import axios from "axios";

interface IForgotFormProps {}

const FormSchema = z.object({
  email: z.string().email("invalid email address"),
});

type FormSchemaType = z.infer<typeof FormSchema>;

const ForgotForm: React.FunctionComponent<IForgotFormProps> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit: SubmitHandler<FormSchemaType> = async (values) => {
    try {
      const { data } = await axios.post(`/api/auth/forgot`, {
        email: values.email,
      });
      toast.success(data.message);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="w-full px-12 py-4">
      {isSubmitting && <span className="_it4vx _72fik"></span>}
      <h2 className="text-center text-2xl font-bold tracking-wide text-gray-800">
        Forgot password
      </h2>
      <p className="text-center text-sm text-gray-600 mt-2">
        Sign in instead &nbsp;
        <Link
          href="/authsignin"
          className="text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
        >
          Sign in
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
        {/* Submit Button Component */}
        <SlideSubmitButton
          type="submit"
          text="Send email"
          slide_text="Secure email sending"
          icon={<FiLock />}
          disabled={isSubmitting}
        />
      </form>
    </div>
  );
};

export default ForgotForm;
