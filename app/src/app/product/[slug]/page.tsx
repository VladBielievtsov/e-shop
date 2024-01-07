"use client";

import React, { useEffect, useState } from "react";
import ProductAbout from "@/components/ProductAbout";
import ProductSlider from "@/components/ProductSlider";
import { FaArrowLeftLong } from "react-icons/fa6";
import ProductInfo from "@/components/ProductInfo";
import LatestProducts from "@/components/LatestProducts";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import { IProduct } from "@/lib/features/products/productsSlice";
import { Button } from "@nextui-org/react";

export interface ISize {
  id: number;
  productId: number;
  size: string;
  quantity: number;
}

export default function ProductPage() {
  const pathname = usePathname();
  const router = useRouter();
  const [product, setProduct] = useState<IProduct>();
  const [sizes, setSizes] = useState<ISize[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function getProductBySlug(slug: string) {
    setIsLoading(true);
    await axios.get(`${process.env.BACKEND_URL}${slug}`).then((response) => {
      setProduct(response.data);
      setIsLoading(false);
    });
  }

  async function getAllSizesById(id: number) {
    await axios
      .get(`${process.env.BACKEND_URL}/sizes/${id}`)
      .then((response) => {
        setSizes(response.data);
        console.log(response);
      });
  }

  useEffect(() => {
    getProductBySlug(pathname);
  }, []);

  useEffect(() => {
    if (product) getAllSizesById(product.id);
  }, [product]);

  if (!product)
    return (
      <div>
        <div className="inline-flex">
          <Button
            onClick={() => router.back()}
            className="text-xs bg-white px-0 min-w-0 border border-zinc-200 flex items-center justify-center w-10 h-10 rounded-xl hover:bg-[#f3af7f] hover:border-[#f3af7f] duration-150"
          >
            <FaArrowLeftLong />
          </Button>
        </div>
        <div className="mt-10">
          <h3 className="text-lg">Product not found</h3>
        </div>
      </div>
    );

  return (
    <div>
      <div className="inline-flex">
        <Button
          onClick={() => router.back()}
          className="text-xs bg-white px-0 min-w-0 border border-zinc-200 flex items-center justify-center w-10 h-10 rounded-xl hover:bg-[#f3af7f] hover:border-[#f3af7f] duration-150"
        >
          <FaArrowLeftLong />
        </Button>
      </div>
      <div className="flex pt-10 min-h-[700px]">
        <div className="w-1/2">
          {!isLoading ? (
            <ProductSlider color={product?.color} />
          ) : (
            <h3>Loading...</h3>
          )}
        </div>
        <div className="w-1/2 pl-32 relative">
          {!isLoading ? (
            <ProductAbout product={product} sizes={sizes} />
          ) : (
            <h3>Loding</h3>
          )}
        </div>
      </div>
      <div className="pt-10">
        <ProductInfo desc={product?.description} />
      </div>
      <div className="pt-20">
        <LatestProducts />
      </div>
    </div>
  );
}
