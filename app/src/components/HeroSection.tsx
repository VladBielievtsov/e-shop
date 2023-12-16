import React from "react";
import Link from "next/link";
import { BsCart2, BsHeart } from "react-icons/bs";

export default function HeroSection() {
  return (
    <div className="flex items-center mt-10">
      <div className="w-1/2">
        <img
          src="https://images.unsplash.com/photo-1475180098004-ca77a66827be?q=80&w=2572&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="alt"
          className="aspect-square object-cover rounded-[50px]"
        />
      </div>
      <div className="pl-[100px]">
        <h1 className="text-7xl font-bold uppercase">
          Ultimate
          <br /> fashion
          <br /> destination
        </h1>
        <p className="text-lg uppercase font-bold py-10">
          discover the latest trends, shop with style
        </p>
        <div className="inline-block">
          <Link href="/shop" className="btn">
            <BsCart2 />
            <span>Go to shop</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
