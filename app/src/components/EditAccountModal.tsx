import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
  Spinner,
} from "@nextui-org/react";
import { UserInfo } from "@/lib/features/auth/authSlice";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";

interface EditAccountModal {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
  userInfo: UserInfo | null;
}

type FormValues = {
  name: string;
  phone: string;
  email: string;
  region: string;
  city: string;
  postOffice: string;
};

export default function EditAccountModal({
  isOpen,
  onOpen,
  onOpenChange,
  userInfo,
}: EditAccountModal) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const notifySuccess = () => toast.success("Account has beed updated");

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    await axios({
      method: "patch",
      url: process.env.BACKEND_URL + "/update",
      headers: {},
      withCredentials: true,
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        region: data.region,
        city: data.city,
        postOffice: data.postOffice,
      },
    })
      .then((res) => {
        setIsLoading(false);
        notifySuccess();
      })
      .catch((error) => {
        setIsLoading(false);
        if (error.response) {
          console.log(error.response.data.msg);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }

        console.log(error.config);
      });
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Edit details
            </ModalHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalBody>
                <Input
                  autoFocus
                  label="Name"
                  placeholder="Enter your email"
                  variant="bordered"
                  errorMessage={errors.name?.message}
                  defaultValue={userInfo?.name}
                  {...register("name", {
                    required: "Name is required",
                  })}
                />
                <Input
                  label="Phone"
                  placeholder="Enter your phone"
                  variant="bordered"
                  defaultValue={userInfo?.phone || ""}
                  {...register("phone")}
                />
                <Input
                  label="Email"
                  placeholder="Enter your email"
                  variant="bordered"
                  defaultValue={userInfo?.email}
                  errorMessage={errors.email?.message}
                  {...register("email", {
                    required: "Email Address is required",
                  })}
                />
                <Input
                  label="Region"
                  placeholder="Enter your region"
                  variant="bordered"
                  defaultValue={userInfo?.region || ""}
                  {...register("region")}
                />
                <Input
                  label="City"
                  placeholder="Enter your city"
                  variant="bordered"
                  defaultValue={userInfo?.city || ""}
                  {...register("city")}
                />
                <Input
                  label="Post office"
                  placeholder="Enter your post office"
                  variant="bordered"
                  defaultValue={userInfo?.postOffice || ""}
                  {...register("postOffice")}
                />
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
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
