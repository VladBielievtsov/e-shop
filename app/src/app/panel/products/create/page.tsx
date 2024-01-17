"use client";

import React, { useEffect, useState } from "react";
import { Button, Input, Textarea } from "@nextui-org/react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { Spinner } from "@nextui-org/react";
import { useAppDispatch } from "@/lib/hooks";
import { createProduct } from "@/lib/features/products/productsActions";
import { v4 as uuidv4 } from "uuid";
import { createSize } from "@/lib/features/sizes/sizesActions";
import { IoIosClose } from "react-icons/io";
import { LuImagePlus } from "react-icons/lu";
import axios from "@/utils/axios";

type FormValues = {
  title: string;
  description: string;
  color: string;
  price: string;
  discount: string;
  picture: FileList;
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
  const [sizes, setSizes] = useState<
    { id: string; productId: number; size: string; quantity: number }[]
  >([]);
  const [files, setFiles] = useState<FileList | null>();

  const imagesOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
  };

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

    const resProduct = await dispatch(createProduct(body));
    const resultArray = await sizes.map(({ id, ...rest }) => rest);
    const updatedArray = await resultArray.map((item) => ({
      ...item,
      //@ts-ignore
      productId: resProduct?.payload?.id,
    }));
    const resSizes = await dispatch(createSize(updatedArray));

    const uploadPromises = [];

    for (let i = 0; i < data.picture.length; i++) {
      const formData = new FormData();
      formData.append("image", data.picture[i]);

      uploadPromises.push(
        axios.post("/upload", formData, {
          headers: {
            "content-type": `multipart/form-data; boundary=image`,
          },
        })
      );
    }

    const resImagesArray = await Promise.all(uploadPromises);

    const imageUrls = await resImagesArray.map((res) => ({
      // @ts-ignore
      productId: resProduct?.payload?.id,
      url: res.data.url,
    }));

    const resProducImages = await axios.post("product-images", imageUrls);

    if (resProduct.meta.requestStatus === "rejected") {
      setIsLoading(false);
      setIsError("Error: during creating product");
      console.log("Error: during creating product");
    }
    if (resSizes.meta.requestStatus === "rejected") {
      setIsLoading(false);
      setIsError("Error: during creating product, sizes");
      console.log("Error: during creating product, sizes");
    } else {
      setIsLoading(false);
      notifySuccess();
    }
  };

  const removeSize = (id: string) => {
    setSizes(sizes.filter((size) => size.id !== id));
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
          <h4 className="font-bold mt-10">Images:</h4>
          <div className="bg-white shadow-md p-4 rounded-xl mt-4 flex gap-3 flex-wrap">
            <label className="text-6xl flex flex-col items-center justify-center w-[200px] h-[200px] border-medium hover:border-default-400 border-default-200 duration-150 rounded-medium border-dashed cursor-pointer">
              <LuImagePlus />
              <p className="text-base">Upload images</p>
              <input
                className="w-0 h-0 opacity-0"
                type="file"
                multiple
                accept=".png, .jpg, .jpeg"
                {...register("picture", {
                  required: "Picture is required",
                })}
                onChange={(e) => imagesOnChange(e)}
              />
            </label>
            {!!files &&
              Array.from(files).map((file, id) => (
                <img
                  key={id}
                  className="w-[200px] h-[200px] rounded-medium object-cover"
                  src={URL.createObjectURL(file)}
                  alt="img"
                />
              ))}
          </div>
          <h4 className="font-bold mt-10">Quantity & Sizes:</h4>
          <div className="bg-white shadow-md p-4 rounded-xl mt-4 space-y-4">
            <Button
              className="border border-zinc-300 mb-4"
              onClick={() =>
                setSizes((prev) => [
                  ...prev,
                  { id: uuidv4(), productId: 0, size: "", quantity: 0 },
                ])
              }
            >
              Add Size
            </Button>
            {sizes.map((size) => (
              <div key={size.id} className="flex space-x-4 items-end">
                <Input
                  type="text"
                  variant="bordered"
                  label="Size"
                  labelPlacement="outside"
                  placeholder=" "
                  required
                  className="max-w-[220px]"
                  onChange={(e) => (size.size = e.target.value)}
                />
                <Input
                  type="text"
                  variant="bordered"
                  label="Quantity"
                  labelPlacement="outside"
                  placeholder=" "
                  className="max-w-[220px]"
                  onChange={(e) => (size.quantity = +e.target.value)}
                />
                <Button
                  className="border border-zinc-300 p-0 w-10 h-10 min-w-0 text-2xl hover:bg-red-500"
                  onClick={() => removeSize(size.id)}
                >
                  <IoIosClose />
                </Button>
              </div>
            ))}
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
