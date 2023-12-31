"use client";

import Link from "next/link";
import { Button } from "@nextui-org/button";
import { FcGoogle } from "react-icons/fc";
import {
  AiFillApple,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { redirect } from "next/navigation";

type Inputs = {
  email: string;
  password: string;
};

export default function Login() {
  const [isVisible, setIsVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const toggleVisibility = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsVisible(!isVisible);
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    // console.log(data);
  };
  return (
    <div className="max-w-[384px] w-full mx-auto py-40">
      <h1 className="text-3xl font-bold mb-2">Login ✨ </h1>
      <p className="text-neutral-700">Get started shoping today.</p>

      <form
        className="flex flex-col gap-4 mt-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          value={"vladbielievtsov@gmail.com"}
          type="email"
          variant="bordered"
          label="Email"
          labelPlacement="outside"
          placeholder="Enter your email"
          {...register("email", {
            required: "Fuild is required",
            pattern: {
              value: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
              message: "Please enter a valid email",
            },
          })}
          errorMessage={errors.email && errors.email?.message}
          color={errors.email && "danger"}
          autoComplete="off"
        />
        <Input
          type={isVisible ? "text" : "password"}
          variant="bordered"
          label="Password"
          labelPlacement="outside"
          placeholder="At least 8 characters"
          endContent={
            <button onClick={toggleVisibility}>
              {isVisible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </button>
          }
          {...register("password", {
            required: "Fuild is required",
          })}
          errorMessage={errors.password && errors.password?.message}
          color={errors.password && "danger"}
          autoComplete="off"
        />
        <div className="flex justify-end">
          <Link
            href="/auth/forgot-password"
            className="text-sm font-medium text-blue-500"
          >
            Forgot Password?
          </Link>
        </div>
        <Button variant="flat" color={"primary"} type="submit">
          Login
        </Button>
      </form>

      <p className="mt-[20px]">
        Don't have an account?{" "}
        <Link href="register" className="text-blue-500">
          Sign up
        </Link>
      </p>
    </div>
  );
}
