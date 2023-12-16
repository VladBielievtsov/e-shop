"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from "./ProductCard";

export default function LatestProducts() {
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
          {products.map((product, idx) => (
            <SwiperSlide key={idx} className="max-w-[338.5px]">
              <ProductCard img={product.img} backImg={product.backImg} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}
