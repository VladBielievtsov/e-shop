"use client";

import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
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
      href: "/profile",
      name: "User details",
    },
    {
      href: "/profile/wish-list",
      name: "Wish List",
    },
    {
      href: "/profile/purchase-history",
      name: "Purchase History",
    },
  ];

  return (
    <div>
      <h1 className="font-bold text-black uppercase text-5xl text-center">
        Profile
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
