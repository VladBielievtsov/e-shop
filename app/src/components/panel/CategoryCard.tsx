import React from "react";
import { Button, Card, CardHeader, Divider } from "@nextui-org/react";
import { RiDeleteBin7Line } from "react-icons/ri";
import { FiEdit2 } from "react-icons/fi";

interface CategoryCardProps {
  onOpen: () => void;
  name: string;
  id: number;
  setIsEditing: React.Dispatch<React.SetStateAction<number | null>>;
}

export default function CategoryCard({
  onOpen,
  name,
  id,
  setIsEditing,
}: CategoryCardProps) {
  const onPressEdit = () => {
    onOpen();
    setIsEditing(id);
  };

  return (
    <Card className="max-w-full">
      <CardHeader className="flex gap-3 justify-between">
        <div className="flex flex-col">
          <p className="text-md">{name}</p>
          <p className="text-small text-default-500">103 Products</p>
        </div>
        <div className="flex space-x-2">
          <Button
            onPress={onPressEdit}
            className="border border-zinc-300 min-w-0 hover:bg-zinc-300"
          >
            <FiEdit2 />
          </Button>
          <Button className="border border-zinc-300 min-w-0 hover:bg-zinc-300">
            <RiDeleteBin7Line />
          </Button>
        </div>
      </CardHeader>
    </Card>
  );
}
