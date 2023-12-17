import React from "react";
import Link from "next/link";
import ProfileNav from "@/components/ProfileNav";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <h1 className="font-bold text-black uppercase text-5xl text-center">
        Profile
      </h1>
      <div className="flex mt-20">
        <div>
          <ProfileNav />
        </div>
        <div className="flex-1 pl-20">{children}</div>
      </div>
    </div>
  );
}
