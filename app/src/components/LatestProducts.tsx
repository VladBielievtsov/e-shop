"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from "./ProductCard";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { Skeleton } from "@nextui-org/react";
import { fetchAllProducts } from "@/lib/features/products/productsActions";

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

  const products = [
    {
      img: "https://storage.googleapis.com/lulu-fanatics/product/71842/1280/lululemon-muscle-love-long-sleeve-shirt-white-opal-047748-385276.jpg",
      backImg:
        "https://storage.googleapis.com/lulu-fanatics/product/71842/1280/lululemon-muscle-love-long-sleeve-shirt-white-opal-047748-385275.jpg",
    },
    {
      img: "https://storage.googleapis.com/lulu-fanatics/product/71842/1280/lululemon-muscle-love-long-sleeve-shirt-white-opal-047748-385276.jpg",
      backImg:
        "https://storage.googleapis.com/lulu-fanatics/product/71842/1280/lululemon-muscle-love-long-sleeve-shirt-white-opal-047748-385275.jpg",
    },
    {
      img: "https://storage.googleapis.com/lulu-fanatics/product/71842/1280/lululemon-muscle-love-long-sleeve-shirt-white-opal-047748-385276.jpg",
      backImg:
        "https://storage.googleapis.com/lulu-fanatics/product/71842/1280/lululemon-muscle-love-long-sleeve-shirt-white-opal-047748-385275.jpg",
    },
    {
      img: "https://storage.googleapis.com/lulu-fanatics/product/71842/1280/lululemon-muscle-love-long-sleeve-shirt-white-opal-047748-385276.jpg",
      backImg:
        "https://storage.googleapis.com/lulu-fanatics/product/71842/1280/lululemon-muscle-love-long-sleeve-shirt-white-opal-047748-385275.jpg",
    },
    {
      img: "https://storage.googleapis.com/lulu-fanatics/product/71842/1280/lululemon-muscle-love-long-sleeve-shirt-white-opal-047748-385276.jpg",
      backImg:
        "https://storage.googleapis.com/lulu-fanatics/product/71842/1280/lululemon-muscle-love-long-sleeve-shirt-white-opal-047748-385275.jpg",
    },
  ];
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
        <div className="grid grid-cols-4">
          {[...Array(4)].map((_, idx) => (
            <div className="max-w-[339px] mt-12" key={idx}>
              <Skeleton className="rounded-[50px] w-full">
                <div className="h-[414px] w-full rounded-[50px] bg-default-300"></div>
              </Skeleton>
              <Skeleton className="rounded-full mt-4 mx-2">
                <div className="h-[28px] rounded-full bg-default-200"></div>
              </Skeleton>
              <Skeleton className="rounded-full mt-1 mx-2 w-10">
                <div className="h-[24px] rounded-full bg-default-200"></div>
              </Skeleton>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
