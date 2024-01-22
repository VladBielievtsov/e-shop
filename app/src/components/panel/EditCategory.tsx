import { getCategoryById } from "@/lib/features/category/categorySlice";
import { useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import React from "react";

interface EditCategoryProps {
  isOpen: boolean;
  onOpenChange: () => void;
  isEditing: number | null;
}

export default function EditCategory({
  isOpen,
  onOpenChange,
  isEditing,
}: EditCategoryProps) {
  const category = useAppSelector((state: RootState) =>
    getCategoryById(state, isEditing || 0)
  );

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
      <ModalContent>
        {(onClose) => (
          <>
            {!!category ? (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Edit: {category.name}
                </ModalHeader>
                <ModalBody>
                  <Input
                    autoFocus
                    label="Name"
                    defaultValue={category.name}
                    variant="bordered"
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary">Edit</Button>
                </ModalFooter>
              </>
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
