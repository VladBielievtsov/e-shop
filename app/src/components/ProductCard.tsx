import { IProduct } from "@/lib/features/products/productsSlice";
import Link from "next/link";
import React from "react";
import { BsHeart, BsCart2 } from "react-icons/bs";

interface ProductCardProps {
  img: string;
  backImg: string;
  product: IProduct;
}

export default function ProductCard({
  img,
  backImg,
  product,
}: ProductCardProps) {
  return (
    <div className="productCard">
      <div className="relative">
        <Link
          href={"/product/" + product.slug}
          className="block rounded-[50px] overflow-hidden relative aspect-[9/11]"
        >
          <img
            src={backImg}
            alt="alt"
            className="absolute h-full object-cover"
          />
          <img
            src={img}
            alt="alt"
            className="absolute h-full object-cover productCard__hide"
          />
        </Link>
      </div>
      <Link href={"/product/" + product.slug} className="block pt-3 px-2">
        <h2 className="font-bold uppercase text-xl">{product.title}</h2>
        <h3 className="font-bold uppercase text-base">${product.price}</h3>
      </Link>
    </div>
  );
}
