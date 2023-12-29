"use client";

import { UserInfo } from "@/lib/features/auth/authSlice";
import { IProduct } from "@/lib/features/products/productsSlice";
import axios from "axios";
import React, { useEffect, useOptimistic, useState } from "react";
import { BsHeart } from "react-icons/bs";

interface FavoriteBtnProps {
  userId: number | undefined;
  product: IProduct | undefined;
}

export interface Favorite {
  id: number;
  user: UserInfo;
  userId: number;
  product: IProduct | undefined;
  productId: number;
}

export default function FavoriteBtn({ product, userId }: FavoriteBtnProps) {
  const [isActive, setIsActive] = useState<boolean>(false);

  async function isFavorite(productId: number | undefined) {
    const result = await axios({
      method: "get",
      url: process.env.BACKEND_URL + `/favorites/${productId}`,
      headers: {},
      withCredentials: true,
    })
      .then((data) => {
        data.data === null ? setIsActive(false) : setIsActive(true);
      })
      .catch(() => {
        setIsActive(false);
      });
  }

  useEffect(() => {
    if (product !== undefined) {
      isFavorite(product.id);
    }
  }),
    [];

  function onSubmitHandler(e: React.FormEvent) {
    e.preventDefault();
    !isActive ? addToFavorites(product?.id) : removeFromFavorites(product?.id);
  }

  async function addToFavorites(productId: number | undefined) {
    const result = await axios({
      method: "post",
      url: process.env.BACKEND_URL + `/favorites/${productId}`,
      headers: {},
      withCredentials: true,
    });
    setIsActive(true);
  }

  async function removeFromFavorites(productId: number | undefined) {
    const result = await axios({
      method: "delete",
      url: process.env.BACKEND_URL + `/favorites/${productId}`,
      headers: {},
      withCredentials: true,
    });
    setIsActive(false);
  }

  return (
    <form onSubmit={onSubmitHandler}>
      <button type="submit" className={`btn large ${isActive ? "active" : ""}`}>
        <BsHeart />
        <span>Favorite</span>
      </button>
    </form>
  );
}
