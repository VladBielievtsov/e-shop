"use client";

import { useSearchParams } from "next/navigation";
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
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { useEffect } from "react";
import { fetchAllProducts } from "@/lib/features/products/productsActions";
import { IProduct } from "@/lib/features/products/productsSlice";

export default function Shop() {
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  const productsStatus = useAppSelector(
    (state: RootState) => state.products.status
  );

  let { data } = useAppSelector((state: RootState) => state.products);

  useEffect(() => {
    if (productsStatus === "idle") {
      // @ts-ignore
      dispatch(fetchAllProducts());
    }
  }, [productsStatus, dispatch]);

  useEffect(() => {
    if (data) {
      data = data?.filter((product: IProduct) => {
        product.price > parseInt(searchParams.get("priceFrom")!) &&
          product.price < parseInt(searchParams.get("priceTo")!);
      });
    }
  });

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
          {!!data &&
            [...data]
              .reverse()
              .map((product) => (
                <ProductCard panel={false} product={product} key={product.id} />
              ))}
        </div>
      </div>
    </div>
  );
}
