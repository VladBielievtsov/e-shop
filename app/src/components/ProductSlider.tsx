"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs } from "swiper/modules";
import { Navigation } from "swiper/modules";
import "swiper/css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import ProductColor from "./ProductColor";

export default function ProductSlider() {
  const [thumbsSwiper, setThumbsSwiper] = useState<null | boolean>(null);

  const images = [
    "https://storage.googleapis.com/lulu-fanatics/product/71842/1280/lululemon-muscle-love-long-sleeve-shirt-white-opal-047748-385275.jpg",
    "https://storage.googleapis.com/lulu-fanatics/product/71842/1280/lululemon-muscle-love-long-sleeve-shirt-white-opal-047748-385276.jpg",
    "https://storage.googleapis.com/lulu-fanatics/product/71842/1280/lululemon-muscle-love-long-sleeve-shirt-white-opal-047748-385275.jpg",
    "https://storage.googleapis.com/lulu-fanatics/product/71842/1280/lululemon-muscle-love-long-sleeve-shirt-white-opal-047748-385276.jpg",
    "https://storage.googleapis.com/lulu-fanatics/product/71842/1280/lululemon-muscle-love-long-sleeve-shirt-white-opal-047748-385275.jpg",
    "https://storage.googleapis.com/lulu-fanatics/product/71842/1280/lululemon-muscle-love-long-sleeve-shirt-white-opal-047748-385276.jpg",
  ];

  return (
    <div className="w-full flex items-center">
      <div className="w-[100px] block">
        <Swiper
          allowTouchMove={false}
          modules={[Thumbs]}
          grabCursor
          spaceBetween={0}
          slidesPerView={4}
          watchSlidesProgress
          onSwiper={setThumbsSwiper}
          direction="vertical"
          className="w-full overflow-hidden relative h-[536.88px]"
        >
          {images.map((img, idx) => (
            <SwiperSlide key={idx}>
              <img
                src={img}
                alt="alt"
                className="block aspect-[9/11] rounded-[30px] mb-[12px]"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="w-[calc(100%-100px)] pl-[12px] max-w-full flex flex-col">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          modules={[Navigation, Thumbs]}
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          className="rounded-[50px] max-w-full rounded-se-none overflow-hidden relative"
        >
          <ProductColor color="Red" />
          {images.map((img, idx) => (
            <SwiperSlide key={idx}>
              <img src={img} alt="alt" className="block aspect-[9/11]" />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="inline-flex mx-auto rounded-full bg-[#fff] p-2 -mt-[28px] relative z-10">
          <svg
            width="20"
            height="20"
            viewBox="0 0 50 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-[8px] -left-[14px] transform rotate-90"
          >
            <g clipPath="url(#clip0_7_2)">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M50 0H0C27.6142 0 50 22.3858 50 50V0Z"
                fill="#fff"
              />
            </g>
            <defs>
              <clipPath id="clip0_7_2">
                <rect width="50" height="50" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <button className="swiper-button-prev bg-black text-white py-3 px-5 rounded-s-full">
            <IoIosArrowBack />
          </button>
          <button className="swiper-button-next bg-black text-white py-3 px-5 rounded-e-full">
            <IoIosArrowForward />
          </button>
          <svg
            width="20"
            height="20"
            viewBox="0 0 50 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-[8px] -right-[14px] transform -scale-y-100 rotate-90"
          >
            <g clipPath="url(#clip0_7_2)">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M50 0H0C27.6142 0 50 22.3858 50 50V0Z"
                fill="#fff"
              />
            </g>
            <defs>
              <clipPath id="clip0_7_2">
                <rect width="50" height="50" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}
