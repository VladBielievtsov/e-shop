"use client";

import React from "react";
import ProfileNav from "@/components/ProfileNav";
import { useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userInfo } = useAppSelector((state: RootState) => state.auth);

  if (!userInfo) {
    // redirect("/");
  }

  const links = [
    {
      href: "/panel",
      name: "Dashboard",
    },
    {
      href: "/panel/orders",
      name: "Orders",
    },
    {
      href: "/panel/products",
      name: "Products",
    },
    {
      href: "/panel/categories",
      name: "Categories",
    },
    {
      href: "/panel/clients",
      name: "Clients",
    },
    {
      href: "/panel/statistics",
      name: "Statistics",
    },
  ];

  return (
    <div>
      <h1 className="font-bold text-black uppercase text-5xl text-center">
        Panel
      </h1>
      <div className="flex mt-20">
        <div>
          <ProfileNav links={links} />
        </div>
        <div className="flex-1 pl-20">{children}</div>
      </div>
    </div>
  );
}
