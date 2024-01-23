import { useForm, SubmitHandler } from "react-hook-form";
import { getCategoryById } from "@/lib/features/category/categorySlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
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
import React, { useState } from "react";
import toast from "react-hot-toast";
import { updateCategory } from "@/lib/features/category/categoryActions";

interface EditCategoryProps {
  isOpen: boolean;
  onOpenChange: () => void;
  isEditing: number | null;
}

type FormValues = {
  name: string;
};

export default function EditCategory({
  isOpen,
  onOpenChange,
  isEditing,
}: EditCategoryProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const [isError, setIsError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const category = useAppSelector((state: RootState) =>
    getCategoryById(state, isEditing || 0)
  );

  const notifySuccess = () => toast.success("Category has beed updated");

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsError("");
    setIsLoading(true);

    const category = await dispatch(
      updateCategory({ id: isEditing || 0, ...data })
    );

    if (category.meta.requestStatus === "rejected") {
      setIsLoading(false);
      setIsError("Error: during updating category");
      console.log("Error: during updating category");
    } else {
      setIsLoading(false);
      notifySuccess();
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
      <ModalContent>
        {(onClose) => (
          <>
            {!!category ? (
              <form onSubmit={handleSubmit(onSubmit)}>
                <ModalHeader className="flex flex-col gap-1">
                  Edit: {category.name}
                </ModalHeader>
                <ModalBody>
                  <Input
                    autoFocus
                    label="Name"
                    defaultValue={category.name}
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
                    {isLoading ? <Spinner /> : "Edit"}
                  </Button>
                </ModalFooter>
              </form>
            ) : (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Category not found
                </ModalHeader>
              </>
            )}
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
