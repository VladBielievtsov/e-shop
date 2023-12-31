"use client";

import { UserInfo } from "@/lib/features/auth/authSlice";
import { IProduct } from "@/lib/features/products/productsSlice";
import React, { useEffect, useOptimistic, useState } from "react";
import { BsHeart } from "react-icons/bs";

interface FavoriteBtnProps {
  product: IProduct | undefined;
}

export default function FavoriteBtn({ product }: FavoriteBtnProps) {
  const [isActive, setIsActive] = useState<boolean>(false);

  let items = JSON.parse(localStorage.getItem("favoriteProducts") || "[]");

  useEffect(() => {
    if (items) {
      if (items.includes(product?.id)) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    }
  });

  function favoriteHandler() {
    if (!items.includes(product?.id)) {
      items.push(product?.id);
      setIsActive(true);
      localStorage.setItem("favoriteProducts", JSON.stringify(items));
    } else {
      items = items.filter((item: number) => item !== product?.id);

      setIsActive(false);
      localStorage.setItem("favoriteProducts", JSON.stringify(items));
    }
  }

  return (
    <button
      onClick={favoriteHandler}
      className={`btn large ${isActive ? "active" : ""}`}
    >
      <BsHeart />
      <span>Favorite</span>
    </button>
  );
}
