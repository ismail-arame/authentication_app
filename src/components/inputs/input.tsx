"use client";

import { useState } from "react";
// import { IoAlertCircleSharp } from "react-icons/io";
import { IoIosAlert } from "react-icons/io";
import { ImEye, ImEyeBlocked } from "react-icons/im";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { useMediaQuery } from "react-responsive";

interface IInputProps {
  name: string;
  label: string;
  type: string;
  icon: React.ReactNode;
  placeholder: string;
  register: any;
  error: string | undefined;
  disabled: boolean;
}

const Input: React.FunctionComponent<IInputProps> = ({
  name,
  label,
  type,
  icon,
  placeholder,
  register,
  error,
  disabled,
}: IInputProps) => {
  const isScreenBiggerthan1024px = useMediaQuery({
    query: "(min-width: 1024px)",
  });
  const isScreenBetween1024And768px = useMediaQuery({
    minWidth: "1135px",
    maxWidth: "1279px",
  });

  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const calculateTranslate = (): string => {
    if (
      (name == "firstname" || name == "lastname") &&
      isScreenBetween1024And768px
    )
      return "translateY(-10px)";
    else if (
      (name == "firstname" || name == "lastname") &&
      isScreenBiggerthan1024px
    )
      return "translateY(-18px)";
    return "translateY(-12px)";
  };
  return (
    <div className="mt-3 w-[100%]">
      <label htmlFor={name} className="text-gray-700">
        {label}
      </label>
      <div className="relative mt-1 rounded-md">
        <div
          className="pointer-events-none absolute left-0 inset-y-0 flex items-center justify-center pl-3 top-0.5"
          style={{ transform: `${error ? calculateTranslate() : ""}` }}
        >
          <span className="text-gray-500 text-sm">{icon}</span>
        </div>
        <input
          type={showPassword ? "text" : type}
          placeholder={placeholder}
          className="w-full py-2 pr-8 pl-7 block rounded-md border border-gray-300 outline-transparent focus:border-blue-500 text-sm"
          {...register(name)}
          style={{
            borderColor: `${error ? "#ED4337" : ""}`,
          }}
        />
        {/* ----- Show and Hide Password ----- */}
        {(name === "password" || name === "confirmPassword") && (
          <div
            className="absolute top-[11px] right-2 text-lg text-gray-700 cursor-pointer"
            onClick={() => setShowPassword((prev) => !prev)}
            style={{ right: `${error ? "2rem" : ""}` }}
          >
            {showPassword ? <VscEye /> : <VscEyeClosed />}
          </div>
        )}
        {error && (
          <div className="fill-red-500 absolute right-2 text-xl top-2.5 ">
            <IoIosAlert fill="#ED4337" />
          </div>
        )}
        {error && (
          <p className="text-[13px] xl:text-xs lg:text-xs sm:text-[13px] text-[#ED4337] mt-1">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default Input;
