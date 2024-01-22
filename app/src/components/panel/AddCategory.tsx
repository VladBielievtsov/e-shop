import React, { useState } from "react";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@nextui-org/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch } from "@/lib/hooks";
import { createCategory } from "@/lib/features/category/categoryActions";
import toast from "react-hot-toast";

interface AddCategoryProps {
  isOpen: boolean;
  onOpenChange: () => void;
}

type FormValues = {
  name: string;
};

export default function AddCategory({
  isOpen,
  onOpenChange,
}: AddCategoryProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const [isError, setIsError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const notifySuccess = () => toast.success("Category has beed created");

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsError("");
    setIsLoading(true);

    const category = await dispatch(createCategory(data));

    if (category.meta.requestStatus === "rejected") {
      setIsLoading(false);
      setIsError("Error: during creating category");
      console.log("Error: during creating category");
    } else {
      setIsLoading(false);
      notifySuccess();
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
      <ModalContent>
        {(onClose) => (
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader className="flex flex-col gap-1">
              Add Category
            </ModalHeader>
            <ModalBody>
              <Input
                autoFocus
                label="Name"
                variant="bordered"
                {...register("name", {
                  required: "Name is required",
                })}
              />
              {!!isError && <p className="text-red-500">{isError}</p>}
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" type="submit" disabled={isLoading}>
                {isLoading ? <Spinner /> : "Add"}
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
}
