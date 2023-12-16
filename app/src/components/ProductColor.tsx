import React from "react";

interface ProductColorProps {
  color: string;
}

export default function ProductColor({ color }: ProductColorProps) {
  return (
    <div className="absolute top-0 right-0 z-20  rounded-bl-2xl bg-[#fff] px-4 py-2">
      <svg
        width="20"
        height="20"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-0 -left-[20px]"
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
      <span className="uppercase font-bold">{color} - Color</span>
      <svg
        width="20"
        height="20"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute -bottom-[20px] right-0"
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
  );
}
