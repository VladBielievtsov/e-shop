import { IProduct } from "@/lib/features/products/productsSlice";
import Link from "next/link";
import React from "react";

interface ProductCardProps {
  img: string;
  backImg: string;
  product: IProduct;
  panel: boolean;
}

export default function ProductCard({
  img,
  backImg,
  product,
  panel = false,
}: ProductCardProps) {
  return (
    <div className="productCard">
      <div className="relative">
        <Link
          href={
            !panel
              ? "/product/" + product.slug
              : "/panel/products/" + product.id
          }
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
      <Link
        href={
          !panel ? "/product/" + product.slug : "/panel/products/" + product.id
        }
        className="block pt-3 px-2"
      >
        <h2 className="font-bold uppercase text-xl">{product.title}</h2>
        <h3 className="font-bold uppercase text-base">${product.price}</h3>
      </Link>
    </div>
  );
}
