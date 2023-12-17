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
import { IoMail, IoEye, IoEyeOff } from "react-icons/io5";

interface LoginFormProps {
  toggleVisibility: () => void;
  onClose: () => void;
  isVisiblePass: boolean;
}

export default function LoginForm({
  toggleVisibility,
  isVisiblePass,
  onClose,
}: LoginFormProps) {
  return (
    <>
      <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
      <ModalBody>
        <Input
          autoFocus
          endContent={
            <IoMail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }
          label="Email"
          placeholder="Enter your email"
          variant="bordered"
        />
        <Input
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
            >
              {isVisiblePass ? (
                <IoEyeOff className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <IoEye className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          label="Password"
          placeholder="Enter your password"
          type={isVisiblePass ? "text" : "password"}
          variant="bordered"
        />
        <div className="flex py-2 px-1 justify-between">
          <Checkbox
            classNames={{
              label: "text-small",
            }}
          >
            Remember me
          </Checkbox>
          <Link color="primary" href="#" size="sm">
            Forgot password?
          </Link>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="danger" variant="flat" onPress={onClose}>
          Close
        </Button>
        <Button color="primary" onPress={onClose}>
          Sign in
        </Button>
      </ModalFooter>
    </>
  );
}
