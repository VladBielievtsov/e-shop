"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { CheckboxGroup } from "@nextui-org/react";
import SelectColor from "./SelectColor";
import { CustomCheckbox } from "./CustomCheckbox";
import { LuScrollText } from "react-icons/lu";
import { BsCart2, BsHeart } from "react-icons/bs";
import { SlHandbag } from "react-icons/sl";
import { IProduct } from "@/lib/features/products/productsSlice";
import { ISize } from "@/app/product/[slug]/page";

interface ProductAboutProps {
  product: IProduct | undefined;
  sizes: ISize[] | undefined;
}

export default function ProductAbout({ product, sizes }: ProductAboutProps) {
  const [sizeSelected, setSizeSelected] = useState([""]);
  const [runningOut, setRunningOut] = useState<boolean>(false);

  const quantity = sizes?.reduce((acc, cur) => acc + cur.value, 0);

  useEffect(() => {
    if (quantity && quantity < 10) {
      setRunningOut(true);
    } else {
      setRunningOut(false);
    }
  }, [quantity]);

  return (
    <div>
      <h1 className="font-bold text-black uppercase text-5xl leading-[125%]">
        {product?.title}
      </h1>
      {runningOut && (
        <span className="text-orange-600 bg-orange-100 rounded-md font-medium px-2 py-1 mt-4 inline-block">
          The product is running out
        </span>
      )}
      {!quantity && (
        <span className="text-zinc-600 bg-zinc-100 rounded-md font-medium px-2 py-1 mt-4 inline-block">
          Out of stock
        </span>
      )}

      {product?.discount ? (
        <p className="font-bold text-red-500 uppercase text-2xl mt-4">
          ${product?.discount}{" "}
          <span className="line-through text-zinc-600 font-medium text-xl">
            ${product?.price}
          </span>
        </p>
      ) : (
        <p className="font-bold text-black uppercase text-2xl mt-4">
          ${product?.price}
        </p>
      )}
      <div className="flex items-center space-x-4 mt-8">
        <SelectColor />
      </div>
      <div className="mt-8">
        <h3 className="uppercase text-2xl font-bold">Select a size</h3>
        <CheckboxGroup
          className="gap-1 mt-4"
          orientation="horizontal"
          value={sizeSelected}
          onValueChange={setSizeSelected}
        >
          {!!sizes &&
            sizes.map(
              (size) =>
                !!size.value && (
                  <CustomCheckbox value={size.name} key={size.id} large="true">
                    {size.name}
                  </CustomCheckbox>
                )
            )}
        </CheckboxGroup>
      </div>
      <div className="mt-8">
        <a href="#" className="inline-flex items-center">
          <LuScrollText />{" "}
          <span className="uppercase font-bold ml-2 underline">Size guide</span>
        </a>
      </div>
      <div className="flex items-center space-x-4 mt-8">
        <button className="btn large black">
          <SlHandbag />
          <span>Add to bag</span>
        </button>
        <button className="btn large">
          <BsHeart />
          <span>Favorite</span>
        </button>
      </div>
    </div>
  );
}
