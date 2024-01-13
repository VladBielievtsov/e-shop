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
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { profileUpdate } from "@/lib/features/auth/authActions";

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
  const [isError, setIsError] = useState<string>();

  const dispatch = useAppDispatch();

  const notifySuccess = () => toast.success("Account has beed updated");

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    setIsError("");

    const body = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      region: data.region,
      city: data.city,
      postOffice: data.postOffice,
    };

    const resUser = await dispatch(profileUpdate(body));

    if (resUser.meta.requestStatus === "rejected") {
      setIsLoading(false);
      setIsError("Error: during updating product");
      console.log("Error: during updating product");
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
            <ModalHeader className="flex flex-col gap-1">
              Edit details
            </ModalHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
              {!!isError && <p className="text-red-500">{isError}</p>}
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
