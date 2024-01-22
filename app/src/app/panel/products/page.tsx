"use client";

import React, { useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { fetchAllProducts } from "@/lib/features/products/productsActions";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import Link from "next/link";
import { BiSortDown, BiSortUp } from "react-icons/bi";

export default function page() {
  const dispatch = useAppDispatch();

  const productsStatus = useAppSelector(
    (state: RootState) => state.products.status
  );

  let { data } = useAppSelector((state: RootState) => state.products);

  useEffect(() => {
    if (productsStatus === "idle") {
      dispatch(fetchAllProducts());
    } else if (productsStatus === "loading") {
      // setIsLoading(true);
    } else {
      // setIsLoading(false);
    }
  }, [productsStatus, dispatch]);
  return (
    <div>
      <div className="flex items-start justify-between">
        <h2 className="uppercase font-bold text-2xl">Products</h2>

        <Link href="/panel/products/create" className="btn black">
          Add Product
        </Link>
      </div>
      <div className="flex justify-end space-x-4 mt-10">
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
              <div className="flex items-center ">
                <span className="mr-2">New First</span>
              </div>
            </DropdownItem>
            <DropdownItem key="priceup">
              <div className="flex items-center ">
                <span className="mr-2">Old First</span>
              </div>
            </DropdownItem>
            <DropdownItem key="priceup">
              <div className="flex items-center ">
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
      <div className="grid grid-cols-4 mt-10 gap-4">
        {data?.length ? (
          [...data]
            .reverse()
            .map((product, idx) => (
              <ProductCard panel={true} product={product} key={product.id} />
            ))
        ) : (
          <h3>There are no products</h3>
        )}
      </div>
    </div>
  );
}
