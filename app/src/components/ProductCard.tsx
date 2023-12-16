import Link from "next/link";
import React from "react";
import { BsHeart, BsCart2 } from "react-icons/bs";

interface ProductCardProps {
  img: string;
  backImg: string;
}

export default function ProductCard({ img, backImg }: ProductCardProps) {
  return (
    <div className="productCard">
      <div className="relative">
        <Link
          href="/product/001"
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
        <button className="absolute top-6 right-6 text-white border bg-zinc-500 flex items-center justify-center w-10 h-10 rounded-full">
          <BsHeart />
        </button>
        <button className="absolute top-[75px] right-6 text-white border bg-zinc-500 flex items-center justify-center w-10 h-10 rounded-full">
          <BsCart2 />
        </button>
      </div>
      <Link href="/product/001" className="block pt-3 px-2">
        <h2 className="font-bold uppercase text-xl">Women gf jins style</h2>
        <h3 className="font-bold uppercase text-base">$21.99</h3>
      </Link>
    </div>
  );
}
