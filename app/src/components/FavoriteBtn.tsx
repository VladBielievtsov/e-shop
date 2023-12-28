"use client";

import { UserInfo } from "@/lib/features/auth/authSlice";
import { IProduct } from "@/lib/features/products/productsSlice";
import React, { useOptimistic } from "react";
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
  // const predicate = (favorite: Favorite) =>
  //   favorite.userId === userId && favorite.productId === product?.id;

  // const [optimisticFavorites, addOptimisticFavorites] = useOptimistic<
  //   Favorite[]
  // >(
  //   product?.favorites,
  //   //@ts-ignore
  //   (state: Favorite[], newFavorite: Favorite) =>
  //     state.some(predicate)
  //       ? state.filter((favorite) => favorite.userId !== userId)
  //       : [...state, newFavorite]
  // );

  async function addToFavorites(value: FormDataEntryValue | null) {}

  return (
    <form
      action={async (formData: FormData) => {
        const productId = formData.get("productId");
        // addOptimisticFavorites({ productId, userId });
        await addToFavorites(productId);
      }}
    >
      <input type="hidden" name="productId" value={product?.id} />
      <button type="submit" className="btn large">
        <BsHeart />
        <span>Favorite</span>
      </button>
    </form>
  );
}
