"use client";

import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from "./ProductCard";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { fetchAllProducts } from "@/lib/features/products/productsActions";

export default function LatestProducts() {
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
      // setIsLoading(true);
    } else {
      // setIsLoading(false);
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
      {!!products && (
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
      )}
    </div>
  );
}
