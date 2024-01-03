"use client";

import React, { useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { fetchAllProducts } from "@/lib/features/products/productsActions";
import { Button } from "@nextui-org/react";
import Link from "next/link";

export default function page() {
  const dispatch = useAppDispatch();

  const productsStatus = useAppSelector(
    (state: RootState) => state.products.status
  );

  let { data } = useAppSelector((state: RootState) => state.products);

  useEffect(() => {
    if (productsStatus === "idle") {
      // @ts-ignore
      dispatch(fetchAllProducts());
    } else if (productsStatus === "loading") {
      // setIsLoading(true);
    } else {
      // setIsLoading(false);
    }
  }, [productsStatus, dispatch]);
  return (
    <div>
      <div className="flex items-start justify-between">
        <h2 className="uppercase font-bold text-2xl">Products</h2>

        <Link href="/panel/products/create" className="btn black">
          Add Product
        </Link>
      </div>
      <div className="grid grid-cols-4 mt-10">
        {data?.length ? (
          data.map((product, idx) => (
            <ProductCard
              panel={true}
              product={product}
              key={product.id}
              img="https://storage.googleapis.com/lulu-fanatics/product/71842/1280/lululemon-muscle-love-long-sleeve-shirt-white-opal-047748-385276.jpg"
              backImg="https://storage.googleapis.com/lulu-fanatics/product/71842/1280/lululemon-muscle-love-long-sleeve-shirt-white-opal-047748-385275.jpg"
            />
          ))
        ) : (
          <h3>There are no products</h3>
        )}
      </div>
    </div>
  );
}
