"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckboxGroup } from "@nextui-org/react";
import SelectColor from "./SelectColor";
import { CustomCheckbox } from "./CustomCheckbox";
import { LuScrollText } from "react-icons/lu";
import { BsCart2, BsHeart } from "react-icons/bs";

export default function ProductAbout() {
  const [sizeSelected, setSizeSelected] = useState([""]);
  const sizes = [
    "xxxs",
    "xxs",
    "xs",
    "s",
    "m",
    "l",
    "xl",
    "xxl",
    "xxxl",
    "xxxxl",
  ];
  return (
    <div>
      <h1 className="font-bold text-black uppercase text-5xl leading-[125%]">
        Luxury women long coat gh
      </h1>
      <span className="text-orange-600 bg-orange-100 rounded-md font-medium px-2 py-1 mt-4 inline-block">
        The product is running out
      </span>
      <span className="text-zinc-600 bg-zinc-100 rounded-md font-medium px-2 py-1 mt-4 inline-block">
        Out of stock
      </span>
      <p className="font-bold text-black uppercase text-2xl mt-4">$11.50</p>
      <p className="font-bold text-red-500 uppercase text-2xl mt-4">
        $11.50{" "}
        <span className="line-through text-zinc-600 font-medium text-xl">
          $11.50
        </span>
      </p>
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
          {sizes.map((size, idx) => (
            <CustomCheckbox value={size} key={idx} large="true">
              {size}
            </CustomCheckbox>
          ))}
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
          <BsCart2 />
          <span>Add to card</span>
        </button>
        <button className="btn large">
          <BsHeart />
          <span>Favorite</span>
        </button>
      </div>
    </div>
  );
}
