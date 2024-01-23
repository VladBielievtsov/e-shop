import { useGetCategories } from "@/hooks/useGetCategories";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import React from "react";

interface SelectCategoryProps {
  selectedCategiry: Set<number>;
  setSelectedCategiry: React.Dispatch<React.SetStateAction<Set<number>>>;
}

export default function SelectCategory({
  selectedCategiry,
  setSelectedCategiry,
}: SelectCategoryProps) {
  const categories = useGetCategories();

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
        selectedKeys={selectedCategiry}
        // @ts-ignore
        onSelectionChange={setSelectedCategiry}
      >
        {!!categories ? (
          categories?.map((category) => (
            <DropdownItem key={category.id}>{category.name}</DropdownItem>
          ))
        ) : (
          <DropdownItem>Error</DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
}
