"use client";

import React from "react";
import CategoryCard from "@/components/panel/CategoryCard";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import Link from "next/link";
import EditCategory from "@/components/panel/EditCategory";
import AddCategory from "@/components/panel/AddCategory";

export default function page() {
  const EditCategoryModal = useDisclosure();
  const AddCategoryModal = useDisclosure();

  return (
    <div>
      <div className="flex items-start justify-between">
        <h2 className="uppercase font-bold text-2xl">All Categories</h2>

        <Button onPress={AddCategoryModal.onOpen} className="btn black">
          Add Category
        </Button>
      </div>
      <div className="mt-10 grid grid-cols-3 gap-4">
        <CategoryCard onOpen={EditCategoryModal.onOpen} />
      </div>

      <EditCategory
        isOpen={EditCategoryModal.isOpen}
        onOpenChange={EditCategoryModal.onOpenChange}
      />
      <AddCategory
        isOpen={AddCategoryModal.isOpen}
        onOpenChange={AddCategoryModal.onOpenChange}
      />
    </div>
  );
}
