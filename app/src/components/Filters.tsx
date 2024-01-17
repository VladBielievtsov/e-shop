"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Accordion,
  AccordionItem,
  CheckboxGroup,
  Checkbox,
  Slider,
} from "@nextui-org/react";

import { CustomCheckbox } from "./CustomCheckbox";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { getAllSizes } from "@/lib/features/sizes/sizesActions";

export default function Filters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  const sizesStatus = useAppSelector((state: RootState) => state.sizes.status);

  let { sizes } = useAppSelector((state: RootState) => state.sizes);

  useEffect(() => {
    if (sizesStatus === "idle") {
      // @ts-ignore
      dispatch(getAllSizes());
    }
  }, [sizesStatus, dispatch]);

  const [categorySelected, setCategorySelected] = useState<string[]>(
    searchParams.getAll("category") ? searchParams.getAll("category") : []
  );
  const categories = ["kids", "child", "women", "men"];

  const [sizeSelected, setSizeSelected] = useState<string[]>(
    searchParams.getAll("sizes") ? searchParams.getAll("sizes") : []
  );

  const [price, setPrice] = useState<number[]>([
    searchParams.get("priceFrom")
      ? parseInt(searchParams.get("priceFrom")!)
      : 0,
    searchParams.get("priceTo") ? parseInt(searchParams.get("priceTo")!) : 5000,
  ]);

  function applyHandler() {
    const path = [];
    // price
    const priceFrom = price[0] !== 0 && "priceFrom=" + price[0];
    const priceTo = price[1] !== 5000 && "priceTo=" + price[1];

    !!priceFrom && path.push(priceFrom);
    !!priceTo && path.push(priceTo);

    // sizes
    if (sizeSelected.length) {
      for (let i = 0; i < sizeSelected.length; i++) {
        path.push("sizes=" + sizeSelected[i]);
      }
    }

    // category
    if (categorySelected.length) {
      for (let i = 0; i < categorySelected.length; i++) {
        path.push("category=" + categorySelected[i]);
      }
    }

    router.push(`/shop?${path.join("&")}`);
  }

  return (
    <aside>
      <Accordion
        defaultExpandedKeys={["1", "2", "3", "4", "5"]}
        selectionMode="multiple"
        className="px-0"
      >
        <AccordionItem
          key="1"
          aria-label="Category"
          title={<h3 className="uppercase text-2xl font-bold">Category</h3>}
        >
          <div className="flex flex-col gap-3 pb-4">
            <CheckboxGroup
              className="gap-1"
              orientation="horizontal"
              value={categorySelected}
              onValueChange={setCategorySelected}
            >
              {categories.map((categorym, idx) => (
                <CustomCheckbox value={categorym} key={idx}>
                  {categorym}
                </CustomCheckbox>
              ))}
            </CheckboxGroup>
          </div>
        </AccordionItem>

        <AccordionItem
          key="2"
          aria-label="Size"
          title={<h3 className="uppercase text-2xl font-bold">Size</h3>}
        >
          <div className="flex flex-col gap-3 pb-4">
            <CheckboxGroup
              className="gap-1"
              orientation="horizontal"
              value={sizeSelected}
              onValueChange={setSizeSelected}
            >
              {!!sizes &&
                sizes.map((size, idx) => (
                  <CustomCheckbox value={size.size} key={idx}>
                    {size.size}
                  </CustomCheckbox>
                ))}
            </CheckboxGroup>
          </div>
        </AccordionItem>
        <AccordionItem
          key="3"
          aria-label="Price"
          title={<h3 className="uppercase text-2xl font-bold">Price</h3>}
        >
          <div className="flex flex-col gap-3 pb-4 overflow-hidden">
            <div className="flex justify-between">
              <span className="uppercase font-bold">${price[0]}</span>
              <span className="uppercase font-bold">${price[1]}</span>
            </div>
            <Slider
              aria-label="price"
              step={100}
              maxValue={5000}
              minValue={0}
              value={price}
              //@ts-ignore
              onChange={setPrice}
              className="w-full"
            />
          </div>
        </AccordionItem>
      </Accordion>
      <div className="mt-3">
        <button
          className="btn large black w-full justify-center"
          onClick={() => applyHandler()}
        >
          <span>Apply</span>
        </button>
      </div>
    </aside>
  );
}
