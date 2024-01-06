"use client";

import { deleteProduct } from "@/lib/features/products/productsActions";
import { IProduct } from "@/lib/features/products/productsSlice";
import { useAppDispatch } from "@/lib/hooks";
import { Button, Input, Textarea } from "@nextui-org/react";
import axios from "axios";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function page() {
  const pathname = usePathname();
  const [product, setProduct] = useState<IProduct>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  async function getProductById(id: string) {
    setIsLoading(true);
    await axios
      .get(`${process.env.BACKEND_URL}/panel-product/${id}`)
      .then((response) => {
        setProduct(response.data);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    getProductById(pathname.split("/").slice(-1).join(""));
  }, []);

  const deleteNotify = () => toast.success("Product has beed deleted");

  async function deleteHandler(id: number) {
    const res = await dispatch(deleteProduct({ id }));
    if (res.meta.requestStatus === "rejected") {
      console.log("Error: during deleting product");
    } else {
      deleteNotify();
      router.push("/panel/products");
    }
  }

  if (isLoading) return <h3>Loading...</h3>;

  if (!product) return <h3>Product not found</h3>;

  return (
    <div>
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
        </div>
        <div>
          <Button className="btn black">Save changes</Button>
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
            />
          </div>
          <div className="mt-5">
            <Textarea
              label="Description"
              variant="bordered"
              labelPlacement="outside"
              defaultValue={product.description}
              className="max-w-full"
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
            />
          </div>
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
          />
          <Input
            type="number"
            variant="bordered"
            label="Discount"
            defaultValue={String(product.discount)}
            labelPlacement="outside"
            className="max-w-[220px]"
          />
        </div>
        <div className="mt-10">
          <Button className="btn red" onClick={() => deleteHandler(product.id)}>
            Delete Product
          </Button>
        </div>
      </div>
    </div>
  );
}
