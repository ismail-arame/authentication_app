"use client";

import { useForm, SubmitHandler } from "react-hook-form";

import Input from "../inputs/input";
import { CiUser } from "react-icons/ci";
import { FiMail, FiLock } from "react-icons/fi";
import { BsTelephone } from "react-icons/bs";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
// npm i zxcvbn && npm i --save-dev @types/zxcvbn
import zxcvbn from "zxcvbn";
import CheckboxInput from "../inputs/checkboxInput";
import SlideSubmitButton from "../buttons/slideSubmitButton";
import { toast } from "react-toastify";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";

interface IResetFormProps {}

const FormSchema = z
  .object({
    password: z
      .string()
      .min(6, "Password must be at least 6 characters.")
      .max(32, "Password must be less than 32 characters."),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password doesn't match",
    path: ["confirmPassword"],
  });

type FormSchemaType = z.infer<typeof FormSchema>;

const ResetForm: React.FunctionComponent<IResetFormProps> = () => {
  const param = useParams();
  const token: string = param.token;

  // password length validation
  const [passwordScore, setPasswordScore] = useState<number>(0);
  const validatePasswordStrength = () => {
    let password = watch().password;
    return zxcvbn(password ? password : "").score;
  };

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  // password length validation
  useEffect(() => {
    setPasswordScore(validatePasswordStrength());
  }, [watch().password]);

  const onSubmit: SubmitHandler<FormSchemaType> = async (values) => {
    try {
      const { data } = await axios.post("/api/auth/reset", {
        password: values.password,
        token: token,
      });
      reset();
      toast.success(data.message);
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <div className="w-full px-12 py-4">
      {/* instagram Loading Progress Bar */}
      {isSubmitting && <span className="_it4vx _72fik"></span>}
      <h2 className="text-center text-2xl font-bold tracking-wide text-gray-800">
        Reset password
      </h2>
      <p className="text-center text-sm text-gray-600 mt-2">
        Sign in instead ? &nbsp;
        <Link
          href="/authsignin"
          className="text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
        >
          Sign in
        </Link>
      </p>
      <form className="my-8 text-sm" onSubmit={handleSubmit(onSubmit)}>
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
        {watch().password?.length > 0 && (
          <div className="flex flex-col">
            <div className="flex mt-2 ">
              {Array.from(Array(5).keys()).map((span, i) => (
                <span key={i} className="w-1/5 px-1">
                  <div
                    className={`h-2 rounded-xl ${
                      passwordScore <= 2
                        ? "bg-red-500"
                        : passwordScore < 4
                        ? "bg-yellow-400"
                        : "bg-green-600"
                    }`}
                  ></div>
                </span>
              ))}
            </div>
            <div className="text-black mt-2">
              {`${
                passwordScore === 1
                  ? "Very weak password"
                  : passwordScore === 2
                  ? "weak password"
                  : passwordScore === 3
                  ? "Good Password"
                  : "Strong password"
              }`}
            </div>
          </div>
        )}
        <Input
          name="confirmPassword"
          label="Confirm password"
          type="password"
          icon={<FiLock />}
          placeholder="******************"
          register={register}
          error={errors?.confirmPassword?.message}
          disabled={isSubmitting}
        />
        {/* Submit Button Component */}
        <SlideSubmitButton
          type="submit"
          text="Change password"
          slide_text="Secure password changing"
          icon={<FiLock />}
          disabled={isSubmitting}
        />
      </form>
    </div>
  );
};

export default ResetForm;
