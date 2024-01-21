import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import React from "react";

interface SelectCategoryProps {
  selectedCategiry: Set<string>;
  setSelectedCategiry: React.Dispatch<React.SetStateAction<Set<string>>>;
}

export default function SelectCategory({
  selectedCategiry,
  setSelectedCategiry,
}: SelectCategoryProps) {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          variant="bordered"
          className="capitalize border border-zinc-300"
        >
          Select Category
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Multiple selection example"
        variant="flat"
        closeOnSelect={false}
        selectionMode="multiple"
        // selectedKeys={selectedCategiry}
        // @ts-ignore
        onSelectionChange={setSelectedCategiry}
      >
        <DropdownItem key="text">Text</DropdownItem>
        <DropdownItem key="number">Number</DropdownItem>
        <DropdownItem key="date">Date</DropdownItem>
        <DropdownItem key="single_date">Single Date</DropdownItem>
        <DropdownItem key="iteration">Iteration</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
