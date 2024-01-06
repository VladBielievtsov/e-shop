"use client";

import React, { useState } from "react";
import { Button, Input, Textarea } from "@nextui-org/react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { Spinner } from "@nextui-org/react";
import { useAppDispatch } from "@/lib/hooks";
import { createProduct } from "@/lib/features/products/productsActions";

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
  const dispatch = useAppDispatch();

  const notifySuccess = () => toast.success("Product has beed created");

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsError("");
    setIsLoading(true);

    const body = {
      title: data.title,
      description: data.description,
      price: +data.price,
      color: data.color,
      discount: +data.discount,
    };

    const res = await dispatch(createProduct(body));

    if (res.meta.requestStatus === "rejected") {
      setIsLoading(false);
      setIsError("Error: during creating product");
      console.log("Error: during creating product");
    } else {
      setIsLoading(false);
      notifySuccess();
    }
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
              type="number"
              variant="bordered"
              placeholder=" "
              label="Price"
              labelPlacement="outside"
              className="max-w-[220px]"
              {...register("price", { required: "Price is required" })}
            />
            <Input
              type="number"
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
