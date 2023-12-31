"use client";

import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { CheckboxGroup } from "@nextui-org/react";
import SelectColor from "./SelectColor";
import { CustomCheckbox } from "./CustomCheckbox";
import { LuScrollText } from "react-icons/lu";
import { BsCart2, BsHeart } from "react-icons/bs";
import { SlHandbag } from "react-icons/sl";
import { IProduct } from "@/lib/features/products/productsSlice";
import { ISize } from "@/app/product/[slug]/page";
import FavoriteBtn from "./FavoriteBtn";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import toast from "react-hot-toast";
import { addToCart } from "@/lib/features/cart/cartSlice";

interface ProductAboutProps {
  product: IProduct | undefined;
  sizes: ISize[] | undefined;
}

export default function ProductAbout({ product, sizes }: ProductAboutProps) {
  const { userInfo } = useAppSelector((state: RootState) => state.auth);
  const [sizeSelected, setSizeSelected] = useState<string[]>([]);
  const [runningOut, setRunningOut] = useState<boolean>(false);
  const [isError, setIsError] = useState<string | undefined>();
  const dispatch = useAppDispatch();

  const quantity = sizes?.reduce((acc, cur) => acc + cur.value, 0);

  useEffect(() => {
    if (quantity && quantity < 10) {
      setRunningOut(true);
    } else {
      setRunningOut(false);
    }
  }, [quantity]);

  const notifySuccess = () => toast.success("Product added to the cart");

  function addToCartHandler() {
    setIsError("");
    if (!sizeSelected.length) {
      setIsError("Select size");
    } else {
      const item = {
        id: uuidv4(),
        title: product?.title,
        productId: product?.id,
        slug: product?.slug,
        price: product?.discount
          ? product?.discount
          : product?.price && product?.price,
        totalPrice: product?.discount
          ? product?.discount * sizeSelected.length
          : product?.price && product?.price * sizeSelected.length,
        size: sizeSelected,
      };

      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      console.log(item);

      cart.push(item);
      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch(addToCart(item));

      notifySuccess();
    }
  }

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
        {quantity ? (
          <button
            className="btn large black"
            onClick={() => addToCartHandler()}
          >
            <SlHandbag />
            <span>Add to bag</span>
          </button>
        ) : (
          <></>
        )}
        <FavoriteBtn product={product} />
      </div>
      {!!isError && <p className="mt-2 text-red-500">{isError}</p>}
    </div>
  );
}
