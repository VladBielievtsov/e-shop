"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs } from "swiper/modules";
import { Navigation } from "swiper/modules";
import "swiper/css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import ProductColor from "./ProductColor";
import { IProductImages } from "@/lib/features/products/productsSlice";

interface ProductSliderProps {
  color: string | undefined;
  images: IProductImages[];
}

export default function ProductSlider({ color, images }: ProductSliderProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<null | boolean>(null);

  return (
    <div className="w-full">
      <div className="w-full pl-[12px] max-w-full flex flex-col">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          modules={[Navigation, Thumbs]}
          thumbs={{
            // @ts-ignore
            swiper:
              // @ts-ignore
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          className={`rounded-[50px] max-w-full overflow-hidden relative ${
            color ? "rounded-se-none" : ""
          }`}
        >
          {color && <ProductColor color={color} />}

          {images.map((img, idx) => (
            <SwiperSlide key={idx}>
              <img
                src={process.env.BACKEND_URL + img.url}
                alt="alt"
                className="block aspect-[9/11] object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="inline-flex mx-auto rounded-full bg-[#fff] p-2 -mt-[28px] relative z-10 object-cover">
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
      <div className="w-full block">
        <Swiper
          modules={[Thumbs]}
          grabCursor
          spaceBetween={20}
          slidesPerView={4}
          watchSlidesProgress
          // @ts-ignore
          onSwiper={setThumbsSwiper}
          className="w-full overflow-hidden relative"
        >
          {images.map((img, idx) => (
            <SwiperSlide key={idx}>
              <img
                src={process.env.BACKEND_URL + img.url}
                alt="alt"
                className="block aspect-[9/11] rounded-[30px] mb-[12px] object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
