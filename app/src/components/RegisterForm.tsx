import React, { useState } from "react";
import {
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import { IoMail, IoPerson } from "react-icons/io5";
import { FaUnlock } from "react-icons/fa6";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { Spinner } from "@nextui-org/react";

interface RegisterFormProps {
  onClose: () => void;
}

type FormValues = {
  name: string;
  email: string;
  password: string;
};

export default function RegisterForm({ onClose }: RegisterFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const [isError, setIsError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const notifySuccess = () => toast.success("Account has beed created");

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsError("");
    setIsLoading(true);
    const user = await axios({
      method: "post",
      url: process.env.BACKEND_URL + "/register",
      headers: {},
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
    })
      .then(() => {
        setIsLoading(false);
        notifySuccess();
      })
      .catch((error) => {
        setIsLoading(false);
        if (error.response) {
          console.log(error.response.data.msg);
          console.log(error.response.status);
          console.log(error.response.headers);
          setIsError(error.response.data.msg);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }

        console.log(error.config);
      });
  };

  return (
    <>
      <ModalHeader className="flex flex-col gap-1">Sign up</ModalHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalBody>
          <Input
            autoFocus
            endContent={
              <IoPerson className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
            label="Name"
            placeholder="Enter your name"
            variant="bordered"
            errorMessage={errors.name?.message}
            isInvalid={!!errors.name}
            {...register("name", { required: "Name Address is required" })}
          />

          <Input
            endContent={
              <IoMail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
            label="Email"
            placeholder="Enter your email"
            variant="bordered"
            errorMessage={errors.email?.message || isError}
            isInvalid={!!errors.email}
            {...register("email", { required: "Email Address is required" })}
          />

          <Input
            endContent={
              <FaUnlock className="text-2xl text-default-400 pointer-events-none" />
            }
            label="Password"
            placeholder="Enter your password"
            type={"text"}
            variant="bordered"
            errorMessage={errors.password?.message}
            isInvalid={!!errors.password}
            {...register("password", {
              required: "Password Address is required",
              minLength: { value: 6, message: "Minimum 6 characters" },
            })}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="flat" onPress={onClose}>
            Close
          </Button>
          <Button color="primary" type="submit" disabled={isLoading}>
            {isLoading ? <Spinner /> : "Sign up"}
          </Button>
        </ModalFooter>
      </form>
    </>
  );
}
