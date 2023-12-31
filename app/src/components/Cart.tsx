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
import { useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";

interface CartProps {
  isOpen: boolean;
  onOpenChange: () => void;
}

export default function Cart({ isOpen, onOpenChange }: CartProps) {
  const items = useAppSelector((state: RootState) => state.cart);

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
              {items.data.length ? (
                items.data.map((item) => <CartItem item={item} key={item.id} />)
              ) : (
                <h3>Cart is Empty</h3>
              )}
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Close
              </Button>
              {!!items.data.length && (
                <Button color="primary" onPress={onClose}>
                  Check out
                </Button>
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
