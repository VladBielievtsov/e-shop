"use client";

import React, { useEffect, useState } from "react";
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
import EditCategory from "@/components/panel/EditCategory";
import AddCategory from "@/components/panel/AddCategory";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { getAllCategories } from "@/lib/features/category/categoryActions";
import { useGetCategories } from "@/hooks/useGetCategories";

export default function page() {
  const EditCategoryModal = useDisclosure();
  const AddCategoryModal = useDisclosure();
  const [isEditing, setIsEditing] = useState<number | null>(null);

  const categories = useGetCategories();

  return (
    <div>
      <div className="flex items-start justify-between">
        <h2 className="uppercase font-bold text-2xl">All Categories</h2>

        <Button onPress={AddCategoryModal.onOpen} className="btn black">
          Add Category
        </Button>
      </div>
      <div className="mt-10 grid grid-cols-3 gap-4">
        {categories?.map((category) => (
          <CategoryCard
            key={category.id}
            id={category.id}
            name={category.name}
            setIsEditing={setIsEditing}
            onOpen={EditCategoryModal.onOpen}
          />
        ))}
      </div>

      <EditCategory
        isEditing={isEditing}
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
