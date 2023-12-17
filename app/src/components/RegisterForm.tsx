import React from "react";
import {
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Checkbox,
  Input,
  Link,
} from "@nextui-org/react";
import { IoMail, IoPerson } from "react-icons/io5";
import { FaUnlock } from "react-icons/fa6";
interface RegisterFormProps {
  onClose: () => void;
}

export default function RegisterForm({ onClose }: RegisterFormProps) {
  return (
    <>
      <ModalHeader className="flex flex-col gap-1">Sign up</ModalHeader>
      <ModalBody>
        <Input
          autoFocus
          endContent={
            <IoPerson className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }
          label="Name"
          placeholder="Enter your name"
          variant="bordered"
        />
        <Input
          endContent={
            <IoMail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }
          label="Email"
          placeholder="Enter your email"
          variant="bordered"
        />
        <Input
          endContent={
            <FaUnlock className="text-2xl text-default-400 pointer-events-none" />
          }
          label="Password"
          placeholder="Enter your password"
          type={"text"}
          variant="bordered"
        />
      </ModalBody>
      <ModalFooter>
        <Button color="danger" variant="flat" onPress={onClose}>
          Close
        </Button>
        <Button color="primary" onPress={onClose}>
          Sign up
        </Button>
      </ModalFooter>
    </>
  );
}
