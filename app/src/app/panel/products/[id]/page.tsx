"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import {
  deleteProduct,
  updateProduct,
} from "@/lib/features/products/productsActions";
import { IProduct } from "@/lib/features/products/productsSlice";
import { useAppDispatch } from "@/lib/hooks";
import { Button, Input, Spinner, Textarea } from "@nextui-org/react";
import axios from "@/utils/axios";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { deleteSizes, updateSizes } from "@/lib/features/sizes/sizesActions";
import { IoIosClose } from "react-icons/io";
import { LuImagePlus } from "react-icons/lu";

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
  const pathname = usePathname();
  const [product, setProduct] = useState<IProduct>();
  const [isError, setIsError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [sizes, setSizes] = useState<
    { id: string; productId: number; size: string; quantity: number }[]
  >([]);
  const [files, setFiles] = useState<FileList | null>();

  const imagesOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
  };

  async function getProductById(id: string) {
    setIsLoading(true);
    await axios.get(`/panel-product/${id}`).then((response) => {
      setProduct(response.data);
    });
  }

  async function getSizesById(id: number) {
    await axios.get(`/sizes/${id}`).then((response) => {
      setSizes(response.data);
      setIsLoading(false);
    });
  }

  useEffect(() => {
    getProductById(pathname.split("/").slice(-1).join(""));
  }, []);

  useEffect(() => {
    if (product?.id) {
      getSizesById(product.id);
      console.log(product);
    }
  }, [product]);

  const deleteNotify = () => toast.success("Product has beed deleted");

  async function deleteHandler(id: number) {
    const resProducts = await dispatch(deleteProduct({ id }));

    if (resProducts.meta.requestStatus === "rejected") {
      console.log("Error: during deleting product");
    } else {
      deleteNotify();
      router.push("/panel/products");
    }
  }

  const updateNotify = () => toast.success("Product has beed updated");

  const updateHandler: SubmitHandler<FormValues> = async (data) => {
    setIsError("");
    if (product?.id) {
      setIsLoadingUpdate(true);

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
        productId: product.id,
        url: res.data.url,
      }));

      const body = {
        id: product.id,
        title: data.title,
        description: data.description,
        price: +data.price,
        color: data.color,
        discount: +data.discount,
        images: imageUrls,
      };

      const resProduct = await dispatch(updateProduct(body));

      const resultArray = await sizes.map(({ id, ...rest }) => rest);
      const updatedArray = await resultArray.map((item) => ({
        ...item,
        //@ts-ignore
        productId: resProduct?.payload?.id,
      }));

      const resSizes = await dispatch(updateSizes(updatedArray));

      if (resProduct.meta.requestStatus === "rejected") {
        setIsLoadingUpdate(false);
        setIsError("Error: during updating product");
        console.log("Error: during updating product");
      }

      if (resSizes.meta.requestStatus === "rejected") {
        setIsLoadingUpdate(false);
        setIsError("Error: during updating product");
        console.log("Error: during updating product");
      } else {
        setIsLoadingUpdate(false);
        updateNotify();
      }
    }
  };

  const removeSize = (id: string) => {
    setSizes(sizes.filter((size) => size.id !== id));
  };

  if (isLoading) return <h3>Loading...</h3>;

  if (!product) return <h3>Product not found</h3>;

  return (
    <div>
      <form onSubmit={handleSubmit(updateHandler)}>
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-bold text-xl">
              Product: #{product.id}{" "}
              <Link
                href={"/product/" + product.slug}
                className="text-base text-[#7f8ff3] hover:underline"
              >
                View product
              </Link>
            </h3>
            <p>14 Jun 2024 in 23:04</p>
            {!!isError && <p className="text-red-500">{isError}</p>}
          </div>
          <div>
            <Button className="btn black" type="submit">
              {isLoadingUpdate ? <Spinner color="default" /> : "Save changes"}
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
                defaultValue={product.title}
                placeholder=" "
                labelPlacement="outside"
                className="max-w-[420px]"
                {...register("title", { required: "Name is required" })}
              />
            </div>
            <div className="mt-5">
              <Textarea
                label="Description"
                variant="bordered"
                labelPlacement="outside"
                defaultValue={product.description}
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
                defaultValue={product.color}
                placeholder=" "
                labelPlacement="outside"
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
                {...register("picture")}
                onChange={(e) => imagesOnChange(e)}
              />
            </label>
            {files?.length
              ? Array.from(files).map((file, id) => (
                  <img
                    key={id}
                    className="w-[200px] h-[200px] rounded-medium object-cover"
                    src={URL.createObjectURL(file)}
                    alt="img"
                  />
                ))
              : product.images &&
                product.images.length > 0 &&
                product.images.map((img, id) => (
                  <img
                    key={id}
                    className="w-[200px] h-[200px] rounded-medium object-cover"
                    src={process.env.BACKEND_URL + img.url}
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
                  defaultValue={size.size}
                  className="max-w-[220px]"
                  onChange={(e) => (size.size = e.target.value)}
                />
                <Input
                  type="text"
                  variant="bordered"
                  label="Quantity"
                  labelPlacement="outside"
                  placeholder=" "
                  defaultValue={String(size.quantity)}
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
              label="Price"
              defaultValue={String(product.price)}
              labelPlacement="outside"
              className="max-w-[220px]"
              {...register("price", { required: "Price is required" })}
            />
            <Input
              type="number"
              variant="bordered"
              label="Discount"
              defaultValue={String(product.discount)}
              labelPlacement="outside"
              className="max-w-[220px]"
              {...register("discount")}
            />
          </div>
        </div>
      </form>
      <div className="mt-10">
        <Button className="btn red" onClick={() => deleteHandler(product.id)}>
          Delete Product
        </Button>
      </div>
    </div>
  );
}
