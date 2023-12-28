"use client";

import React from "react";
import { Modal, ModalContent, Tabs, Tab } from "@nextui-org/react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

interface AuthModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
}

export default function AuthModal({ isOpen, onOpenChange }: AuthModalProps) {
  const [isVisiblePass, setIsVisiblePass] = React.useState(false);
  const toggleVisibility = () => setIsVisiblePass(!isVisiblePass);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
      <ModalContent>
        {(onClose) => (
          <>
            <Tabs aria-label="Options" fullWidth className="px-7 pt-7">
              <Tab key="login" title="Login">
                <LoginForm
                  toggleVisibility={toggleVisibility}
                  isVisiblePass={isVisiblePass}
                  onClose={onClose}
                />
              </Tab>
              <Tab key="register" title="Sign up">
                <RegisterForm onClose={onClose} />
              </Tab>
            </Tabs>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
