"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ProfileNav() {
  const pathname = usePathname();

  const profileLinks = [
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
    <ul className="space-y-4">
      {profileLinks.map((nav) => (
        <li key={nav.name}>
          <Link
            href={nav.href}
            className={`uppercase font-bold text-2xl hover:underline ${
              pathname === nav.href ? "underline" : ""
            }`}
          >
            {nav.name}
          </Link>
        </li>
      ))}
      <li>
        <Link href="/" className="uppercase text-2xl font-bold hover:underline">
          Logout
        </Link>
      </li>
    </ul>
  );
}