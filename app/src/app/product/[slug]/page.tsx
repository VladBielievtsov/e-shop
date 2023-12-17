import React from "react";
import Link from "next/link";
import ProductAbout from "@/components/ProductAbout";
import ProductSlider from "@/components/ProductSlider";
import { FaArrowLeftLong } from "react-icons/fa6";
import ProductInfo from "@/components/ProductInfo";
import LatestProducts from "@/components/LatestProducts";

export default function ProductPage() {
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
          <ProductSlider />
        </div>
        <div className="w-1/2 pl-32">
          <ProductAbout />
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
