"use client";

import React, { useEffect } from "react";
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

export default function page() {
  const EditCategoryModal = useDisclosure();
  const AddCategoryModal = useDisclosure();
  const dispatch = useAppDispatch();

  const categoriesStatus = useAppSelector(
    (state: RootState) => state.categories.status
  );

  let { categories } = useAppSelector((state: RootState) => state);

  useEffect(() => {
    if (categoriesStatus === "idle") {
      dispatch(getAllCategories());
    }
  }, [categoriesStatus, dispatch]);

  return (
    <div>
      <div className="flex items-start justify-between">
        <h2 className="uppercase font-bold text-2xl">All Categories</h2>

        <Button onPress={AddCategoryModal.onOpen} className="btn black">
          Add Category
        </Button>
      </div>
      <div className="mt-10 grid grid-cols-3 gap-4">
        {categories.categories?.map((category) => (
          <CategoryCard
            key={category.id}
            name={category.name}
            onOpen={EditCategoryModal.onOpen}
          />
        ))}
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
