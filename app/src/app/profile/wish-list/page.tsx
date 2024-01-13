"use client";

import ProductCard from "@/components/ProductCard";
import SkeletonCard from "@/components/SkeletonCard";
import { IProduct } from "@/lib/features/products/productsSlice";
import axios from "@/utils/axios";
import React, { useEffect, useState } from "react";

export default function WishList() {
  const [favorites, setFavorites] = useState<IProduct[] | undefined>();
  const fav = JSON.parse(localStorage.getItem("favoriteProducts") || "[]");

  async function getProductsByIds() {
    await axios({
      method: "post",
      url: `/favorites`,
      data: {
        indexes: fav,
      },
    }).then((response) => {
      setFavorites(response.data);
    });
  }

  useEffect(() => {
    getProductsByIds();
  }, []);

  return (
    <div>
      <h2 className="uppercase font-bold text-2xl">Wish List</h2>
      <div className="grid grid-cols-3 gap-6 mt-10">
        {fav.length !== 0 ? (
          favorites ? (
            favorites?.map((product, idx) => (
              <ProductCard
                panel={false}
                key={product.id}
                product={product}
                img="https://storage.googleapis.com/lulu-fanatics/product/71842/1280/lululemon-muscle-love-long-sleeve-shirt-white-opal-047748-385276.jpg"
                backImg="https://storage.googleapis.com/lulu-fanatics/product/71842/1280/lululemon-muscle-love-long-sleeve-shirt-white-opal-047748-385275.jpg"
              />
            ))
          ) : (
            <SkeletonCard />
          )
        ) : (
          <h3 className="text-xl">There are no wish products</h3>
        )}
      </div>
    </div>
  );
}
