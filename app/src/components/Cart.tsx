import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import CartItem from "./CartItem";

interface CartProps {
  isOpen: boolean;
  onOpenChange: () => void;
}

export default function Cart({ isOpen, onOpenChange }: CartProps) {
  return (
    <Modal
      isOpen={isOpen}
      size="lg"
      placement={"bottom-center"}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Cart</ModalHeader>
            <ModalBody className="space-y-4">
              <CartItem />
              <CartItem />
              <CartItem />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={onClose}>
                Check out
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
