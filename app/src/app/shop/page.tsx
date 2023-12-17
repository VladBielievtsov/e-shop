"use client";

import Filters from "@/components/Filters";
import {
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { BiSortDown, BiSortUp } from "react-icons/bi";
import ProductCard from "@/components/ProductCard";

export default function Shop() {
  return (
    <div className="flex">
      <div className="w-[280px] pt-12">
        <Filters />
      </div>
      <div className="flex-1">
        <div className="flex justify-end space-x-4">
          <input
            type="search"
            placeholder="Search"
            className="h-[40px] rounded-full border border-black bg-transparent text-black placeholder:text-black placeholder:uppercase uppercase placeholder:font-bold font-bold px-4 pb-0.5"
          />
          <Dropdown>
            <DropdownTrigger>
              <button className="focus:outline-0 border border-black rounded-full h-[40px] px-4 flex items-center">
                <span className="text-black uppercase font-bold mr-2">
                  sort by
                </span>{" "}
                <BiSortUp />
              </button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Action event example">
              <DropdownItem key="priceup">
                <div className="flex items-center">
                  <span className="mr-2">Price Up</span> <BiSortUp />
                </div>
              </DropdownItem>
              <DropdownItem key="pricedown">
                <div className="flex items-center">
                  <span className="mr-2">Price Down</span> <BiSortDown />
                </div>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <div className="w-full grid grid-cols-3 gap-6 pt-6 pl-20">
          {[...Array(10)].map((_, idx) => (
            <ProductCard
              key={idx}
              img="https://storage.googleapis.com/lulu-fanatics/product/71842/1280/lululemon-muscle-love-long-sleeve-shirt-white-opal-047748-385276.jpg"
              backImg="https://storage.googleapis.com/lulu-fanatics/product/71842/1280/lululemon-muscle-love-long-sleeve-shirt-white-opal-047748-385275.jpg"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
