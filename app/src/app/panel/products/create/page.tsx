"use client";

import React, { useState } from "react";
import { Button, Input, Textarea } from "@nextui-org/react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { Spinner } from "@nextui-org/react";

type FormValues = {
  title: string;
  description: string;
  color: string;
  price: string;
  discount: string;
};

export default function page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const [isError, setIsError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const notifySuccess = () => toast.success("Product has beed created");

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsError("");
    setIsLoading(true);
    await axios({
      method: "post",
      url: process.env.BACKEND_URL + "/product",
      headers: {},
      data: {
        title: data.title,
        description: data.description,
        price: +data.price,
        color: data.color,
        discount: +data.discount,
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
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-bold text-xl">Create</h3>
            {!!isError && <p className="text-red-500">{isError}</p>}
          </div>
          <div>
            <Button type="submit" className="btn black" disabled={isLoading}>
              {isLoading ? <Spinner color="default" /> : "Create products"}
            </Button>
          </div>
        </div>
        <div className="mt-10">
          <h4 className="font-bold">Description:</h4>
          <div className="bg-white shadow-md p-4 rounded-xl mt-4">
            <div>
              <Input
                type="text"
                variant="bordered"
                label="Product name"
                labelPlacement="outside"
                placeholder=" "
                className="max-w-[420px]"
                {...register("title", { required: "Name is required" })}
              />
            </div>
            <div className="mt-5">
              <Textarea
                label="Description"
                variant="bordered"
                labelPlacement="outside"
                placeholder=""
                className="max-w-full"
                {...register("description", {
                  required: "Description is required",
                })}
              />
            </div>
            <div className="mt-11">
              <Input
                type="text"
                variant="bordered"
                label="Color"
                labelPlacement="outside"
                placeholder=" "
                className="max-w-[420px]"
                {...register("color", { required: "Color is required" })}
              />
            </div>
          </div>
          <h4 className="font-bold mt-10">Pricing:</h4>
          <div className="bg-white shadow-md p-4 rounded-xl mt-4 flex space-x-4">
            <Input
              type="text"
              variant="bordered"
              placeholder=" "
              label="Price"
              labelPlacement="outside"
              className="max-w-[220px]"
              {...register("price", { required: "Price is required" })}
            />
            <Input
              type="text"
              variant="bordered"
              defaultValue="0"
              label="Discount"
              labelPlacement="outside"
              className="max-w-[220px]"
              {...register("discount")}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
