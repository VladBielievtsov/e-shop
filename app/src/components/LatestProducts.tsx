"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from "./ProductCard";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { Skeleton } from "@nextui-org/react";
import { fetchAllProducts } from "@/lib/features/products/productsActions";
import SkeletonCard from "./SkeletonCard";

export default function LatestProducts() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useAppDispatch();

  const productsStatus = useAppSelector(
    (state: RootState) => state.products.status
  );

  const { data } = useAppSelector((state: RootState) => state.products);

  useEffect(() => {
    if (productsStatus === "idle") {
      // @ts-ignore
      dispatch(fetchAllProducts());
    } else if (productsStatus === "loading") {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [productsStatus, dispatch]);

  return (
    <div>
      <h2 className="uppercase font-bold text-5xl">Latest products</h2>
      {!isLoading ? (
        <Swiper
          spaceBetween={50}
          slidesPerView={4}
          className="latestProducts mt-12"
        >
          {!!data &&
            data.map((product, idx) => (
              <SwiperSlide key={product.id} className="max-w-[338.5px]">
                <ProductCard
                  product={product}
                  img="https://storage.googleapis.com/lulu-fanatics/product/71842/1280/lululemon-muscle-love-long-sleeve-shirt-white-opal-047748-385276.jpg"
                  backImg="https://storage.googleapis.com/lulu-fanatics/product/71842/1280/lululemon-muscle-love-long-sleeve-shirt-white-opal-047748-385275.jpg"
                />
              </SwiperSlide>
            ))}
        </Swiper>
      ) : (
        <div className="grid grid-cols-4 mb-12">
          <SkeletonCard />
        </div>
      )}
    </div>
  );
}
