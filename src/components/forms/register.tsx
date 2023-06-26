"use client";

import { useForm, SubmitHandler } from "react-hook-form";

import Input from "../inputs/input";
import { CiUser } from "react-icons/ci";
import { FiMail, FiLock } from "react-icons/fi";
import { BsTelephone } from "react-icons/bs";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// npm i validator && npm i --save-dev @types/validator
import validator from "validator";
import { useEffect, useState } from "react";
// npm i zxcvbn && npm i --save-dev @types/zxcvbn
import zxcvbn from "zxcvbn";
import CheckboxInput from "../inputs/checkboxInput";
import SlideSubmitButton from "../buttons/slideSubmitButton";
import { toast } from "react-toastify";
import axios from "axios";
interface IRegisterFormProps {}

const FormSchema = z
  .object({
    firstname: z
      .string()
      .min(2, "First name must be at least 2 characters.")
      .max(32, "First name must be less than 32 characters.")
      .regex(new RegExp("^[a-zA-Z]+$"), "Special characters are not allowed."),
    lastname: z
      .string()
      .min(2, "Last name must be at least 2 characters.")
      .max(32, "Last name must be less than 32 characters.")
      .regex(new RegExp("^[a-zA-Z]+$"), "Special characters are not allowed."),
    email: z.string().email("invalid email address"),
    phone: z.string().refine(validator.isMobilePhone, {
      message: "Please enter a valid phone number",
    }),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters.")
      .max(32, "Password must be less than 32 characters."),

    confirmPassword: z.string(),
    accept: z.literal(true, {
      errorMap: () => ({
        message: "You have to agree to all the terms and conditions",
      }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password doesn't match",
    path: ["confirmPassword"],
  });

type FormSchemaType = z.infer<typeof FormSchema>;

const RegisterForm: React.FunctionComponent<IRegisterFormProps> = () => {
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
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      console.log(data);

      if (data.message) {
        toast.success(data.message);
        reset();
      }
      if (data.errorMessage) toast.error(data.errorMessage);
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <form className="my-8 text-sm" onSubmit={handleSubmit(onSubmit)}>
      <div className="gap-2 md:flex">
        {/* Reusable INPUT Component */}
        <Input
          name="firstname"
          label="First name"
          type="text"
          icon={<CiUser />}
          placeholder="firstname"
          register={register}
          error={errors?.firstname?.message}
          disabled={isSubmitting}
        />
        <Input
          name="lastname"
          label="Last name"
          type="text"
          icon={<CiUser />}
          placeholder="lastname"
          register={register}
          error={errors?.lastname?.message}
          disabled={isSubmitting}
        />
      </div>
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
        name="phone"
        label="Phone number"
        type="text"
        icon={<BsTelephone />}
        placeholder="+(xxx) xx-xx-xx-xx"
        register={register}
        error={errors?.phone?.message}
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
      {/* Checkbox Input Components */}
      <CheckboxInput
        type="checkbox"
        id="accept"
        register={register}
        error={errors?.accept?.message}
      />
      {errors?.accept && (
        <p className="text-[13px] xl:text-xs lg:text-xs sm:text-[13px] text-[#ED4337] mt-1">
          {errors?.accept?.message}
        </p>
      )}
      {/* Submit Button Component */}
      <SlideSubmitButton
        type="submit"
        text="Sign up"
        slide_text="Secure sign up"
        icon={<FiLock />}
        disabled={isSubmitting}
      />
    </form>
  );
};

export default RegisterForm;
