"use client";

import { Accordion, AccordionItem } from "@nextui-org/react";
import React from "react";

export default function ProductInfo() {
  return (
    <div className="max-w-[1250px] mx-auto border-t-1 border-b-1 border-divider">
      <Accordion selectionMode="multiple" className="px-0">
        <AccordionItem
          key="1"
          aria-label="Length"
          title={<h3 className="uppercase text-2xl font-bold">Details</h3>}
        >
          Hello
        </AccordionItem>
        <AccordionItem
          key="2"
          aria-label="Length"
          title={<h3 className="uppercase text-2xl font-bold">Size & Fit</h3>}
        >
          Hello
        </AccordionItem>
        <AccordionItem
          key="3"
          aria-label="Length"
          title={
            <h3 className="uppercase text-2xl font-bold">Shipping & returns</h3>
          }
        >
          Hello
        </AccordionItem>
        <AccordionItem
          key="4"
          aria-label="Length"
          title={<h3 className="uppercase text-2xl font-bold">More info</h3>}
        >
          Hello
        </AccordionItem>
      </Accordion>
    </div>
  );
}
