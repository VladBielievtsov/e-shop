"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/lib/features/auth/authSlice";
import { useAppDispatch } from "@/lib/hooks";

interface ILinks {
  name: string;
  href: string;
}

interface ProfileNav {
  links: ILinks[];
}

export default function ProfileNav({ links }: ProfileNav) {
  const pathname = usePathname();

  const dispatch = useAppDispatch();

  return (
    <ul className="space-y-4">
      {links.map((nav) => (
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
        <Link
          href="#"
          onClick={() => dispatch(logout())}
          className="uppercase text-2xl font-bold hover:underline"
        >
          Logout
        </Link>
      </li>
    </ul>
  );
}
