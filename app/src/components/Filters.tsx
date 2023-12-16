"use client";

import React, { useState } from "react";
import {
  Accordion,
  AccordionItem,
  CheckboxGroup,
  Checkbox,
  Slider,
} from "@nextui-org/react";

import { CustomCheckbox } from "./CustomCheckbox";

export default function Filters() {
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

  const [selectedLength, setSelectedLength] = useState([""]);
  const length = ["mini", "mid", "maxi"];

  const [categorySelected, setCategorySelected] = useState([""]);
  const categories = [
    "kids",
    "child",
    "women",
    "men",
    "body",
    "sport",
    "sustainability",
    "divided",
  ];

  const [selectedBrand, setSelectedBrand] = useState([""]);
  const brands = [
    "Ralph Lauren",
    "Vans",
    "Nike",
    "New Balance",
    "Moschimo",
    "Gucci",
    "Zara",
    "Poma",
    "Roberto Cavalli",
    "Belstaff",
    "Giorgio Amani",
  ];

  const [sizeSelected, setSizeSelected] = useState([""]);
  const sizes = [
    "xxxs",
    "xxs",
    "xs",
    "s",
    "m",
    "l",
    "xl",
    "xxl",
    "xxxl",
    "xxxxl",
  ];

  const [price, setPrice] = useState([0, 5000]);

  return (
    <aside>
      <Accordion
        defaultExpandedKeys={["1", "2", "3", "4", "5"]}
        selectionMode="multiple"
        className="px-0"
      >
        <AccordionItem
          key="1"
          aria-label="Length"
          title={<h3 className="uppercase text-2xl font-bold">Length</h3>}
        >
          <div className="flex flex-col gap-3 pb-4">
            <CheckboxGroup
              color="black"
              value={selectedLength}
              onValueChange={setSelectedLength}
            >
              {length.map((len, idx) => (
                <Checkbox value={len} key={idx}>
                  <span className="font-bold uppercase">{len}</span>
                </Checkbox>
              ))}
            </CheckboxGroup>
          </div>
        </AccordionItem>
        <AccordionItem
          key="2"
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
              <CustomCheckbox value="all">all</CustomCheckbox>
              {categories.map((categorym, idx) => (
                <CustomCheckbox value={categorym} key={idx}>
                  {categorym}
                </CustomCheckbox>
              ))}
            </CheckboxGroup>
          </div>
        </AccordionItem>
        <AccordionItem
          key="3"
          aria-label="Brand"
          title={<h3 className="uppercase text-2xl font-bold">Brand</h3>}
        >
          <div className="flex flex-col gap-3 pb-4">
            <CheckboxGroup
              color="black"
              value={selectedBrand}
              onValueChange={setSelectedBrand}
            >
              {brands.map((brand, idx) => (
                <Checkbox value={brand} key={idx}>
                  <span className="font-bold uppercase">{brand}</span>
                </Checkbox>
              ))}
            </CheckboxGroup>
          </div>
        </AccordionItem>
        <AccordionItem
          key="4"
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
              {sizes.map((categorym, idx) => (
                <CustomCheckbox value={categorym} key={idx}>
                  {categorym}
                </CustomCheckbox>
              ))}
            </CheckboxGroup>
          </div>
        </AccordionItem>
        <AccordionItem
          key="5"
          aria-label="Price"
          title={<h3 className="uppercase text-2xl font-bold">Price</h3>}
        >
          <div className="flex flex-col gap-3 pb-4 overflow-hidden">
            <div className="flex justify-between">
              <span className="uppercase font-bold">${price[0]}</span>
              <span className="uppercase font-bold">${price[1]}</span>
            </div>
            <Slider
              step={100}
              maxValue={5000}
              minValue={0}
              value={price}
              onChange={setPrice}
              className="w-full"
            />
          </div>
        </AccordionItem>
      </Accordion>
      <div></div>
    </aside>
  );
}
