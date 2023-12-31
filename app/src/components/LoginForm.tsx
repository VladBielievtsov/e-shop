"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Checkbox,
  Input,
  Link,
} from "@nextui-org/react";
import { IoMail, IoEye, IoEyeOff } from "react-icons/io5";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { Spinner } from "@nextui-org/react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { authLogin } from "@/lib/features/auth/authActions";

interface LoginFormProps {
  toggleVisibility: () => void;
  onClose: () => void;
  isVisiblePass: boolean;
}

type FormValues = {
  email: string;
  password: string;
};

export default function LoginForm({
  toggleVisibility,
  isVisiblePass,
  onClose,
}: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const [isError, setIsError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { loading, error } = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    await dispatch(authLogin(data));
    router.push("/profile");
    onClose();
  };

  return (
    <>
      <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalBody>
          <Input
            autoFocus
            endContent={
              <IoMail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
            label="Email"
            placeholder="Enter your email"
            variant="bordered"
            errorMessage={errors.email?.message || isError}
            isInvalid={!!errors.email}
            {...register("email", {
              required: "Email Address is required",
              pattern: {
                value: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
                message: "Please enter a valid email",
              },
            })}
          />
          <Input
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisiblePass ? (
                  <IoEyeOff className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <IoEye className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            label="Password"
            placeholder="Enter your password"
            type={isVisiblePass ? "text" : "password"}
            variant="bordered"
            errorMessage={errors.password?.message}
            isInvalid={!!errors.password}
            {...register("password", {
              required: "Password Address is required",
            })}
          />
          <div className="flex py-2 px-1 justify-between">
            <Checkbox
              classNames={{
                label: "text-small",
              }}
            >
              Remember me
            </Checkbox>
            <Link color="primary" href="#" size="sm">
              Forgot password?
            </Link>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="flat" onPress={onClose}>
            Close
          </Button>
          <Button color="primary" type="submit" disabled={loading}>
            {loading ? <Spinner /> : "Sign in"}
          </Button>
        </ModalFooter>
      </form>
    </>
  );
}
