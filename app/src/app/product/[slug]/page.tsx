"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import ProductAbout from "@/components/ProductAbout";
import ProductSlider from "@/components/ProductSlider";
import { FaArrowLeftLong } from "react-icons/fa6";
import ProductInfo from "@/components/ProductInfo";
import LatestProducts from "@/components/LatestProducts";
import { usePathname } from "next/navigation";
import axios from "axios";
import { IProduct } from "@/lib/features/products/productsSlice";

export interface ISize {
  id: number;
  productId: number;
  name: string;
  value: number;
}

export default function ProductPage() {
  const pathname = usePathname();
  const [product, setProduct] = useState<IProduct>();
  const [sizes, setSizes] = useState<ISize[]>();

  async function getProductBySlug(slug: string) {
    const product = await axios.get(`${process.env.BACKEND_URL}${slug}`);
    setProduct(product.data);
  }

  async function getAllSizesById(id: number) {
    const sizes = await axios.get(`${process.env.BACKEND_URL}/sizes/${id}`);
    setSizes(sizes.data);
  }

  useEffect(() => {
    getProductBySlug(pathname);
  }, []);

  useEffect(() => {
    if (product) getAllSizesById(product.id);
  }, [product]);

  return (
    <div>
      <div className="inline-flex">
        <Link href="/shop" className="btn">
          <FaArrowLeftLong />
          <span>Back</span>
        </Link>
      </div>
      <div className="flex pt-10">
        <div className="w-1/2">
          <ProductSlider color={product?.color} />
        </div>
        <div className="w-1/2 pl-32">
          <ProductAbout product={product} sizes={sizes} />
        </div>
      </div>
      <div className="pt-10">
        <ProductInfo />
      </div>
      <div className="pt-20">
        <LatestProducts />
      </div>
    </div>
  );
}
