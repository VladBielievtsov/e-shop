import { Skeleton } from "@nextui-org/react";
import React from "react";

export default function SkeletonCard() {
  return (
    <div className="max-w-[339px]">
      <Skeleton className="rounded-[50px] w-full">
        <div className="h-[414px] w-full rounded-[50px] bg-default-300"></div>
      </Skeleton>
      <Skeleton className="rounded-full mt-4 mx-2">
        <div className="h-[28px] rounded-full bg-default-200"></div>
      </Skeleton>
      <Skeleton className="rounded-full mt-1 mx-2 w-10">
        <div className="h-[24px] rounded-full bg-default-200"></div>
      </Skeleton>
    </div>
  );
}
