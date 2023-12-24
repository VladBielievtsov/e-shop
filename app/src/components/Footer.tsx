import React from "react";
import Link from "next/link";
import { FaFacebook, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="container mx-auto px-4 mt-20">
      <div className="flex border-t-1 border-b-1 border-black">
        <div className="flex-1 p-4 border-r-1 border-black">
          <h3 className="uppercase text-2xl font-bold">Other information</h3>
          <ul className="grid grid-cols-5 gap-1 mt-6">
            <li className="mb-2">
              <a
                href="/"
                className="font-bold uppercase text-zinc-500 hover:text-zinc-900 hover:underline"
              >
                about us
              </a>
            </li>
            <li className="mb-2">
              <a
                href="/"
                className="font-bold uppercase text-zinc-500 hover:text-zinc-900 hover:underline"
              >
                social impact
              </a>
            </li>
            <li className="mb-2">
              <a
                href="/"
                className="font-bold uppercase text-zinc-500 hover:text-zinc-900 hover:underline"
              >
                careers
              </a>
            </li>
            <li className="mb-2">
              <a
                href="/"
                className="font-bold uppercase text-zinc-500 hover:text-zinc-900 hover:underline"
              >
                ambassadors
              </a>
            </li>
            <li className="mb-2">
              <a
                href="/"
                className="font-bold uppercase text-zinc-500 hover:text-zinc-900 hover:underline"
              >
                our partners
              </a>
            </li>
            <li className="mb-2">
              <a
                href="/"
                className="font-bold uppercase text-zinc-500 hover:text-zinc-900 hover:underline"
              >
                our brands
              </a>
            </li>
            <li className="mb-2">
              <a
                href="/"
                className="font-bold uppercase text-zinc-500 hover:text-zinc-900 hover:underline"
              >
                affiliate
              </a>
            </li>
            <li className="mb-2">
              <a
                href="/"
                className="font-bold uppercase text-zinc-500 hover:text-zinc-900 hover:underline"
              >
                investors
              </a>
            </li>
            <li className="mb-2">
              <a
                href="/"
                className="font-bold uppercase text-zinc-500 hover:text-zinc-900 hover:underline"
              >
                press
              </a>
            </li>
          </ul>
        </div>
        <div className="p-4">
          <h3 className="uppercase text-2xl font-bold">Follow us</h3>
          <div className="flex items-center space-x-4 mt-6">
            <Link
              href="/"
              className="border border-zinc-800 flex items-center justify-center w-10 h-10 rounded-full hover:bg-[#f3af7f] hover:border-[#f3af7f] duration-150"
            >
              <FaFacebook />
            </Link>
            <Link
              href="/"
              className="border border-zinc-800 flex items-center justify-center w-10 h-10 rounded-full hover:bg-[#f3af7f] hover:border-[#f3af7f] duration-150"
            >
              <FaTwitter />
            </Link>
            <Link
              href="/"
              className="border border-zinc-800 flex items-center justify-center w-10 h-10 rounded-full hover:bg-[#f3af7f] hover:border-[#f3af7f] duration-150"
            >
              <FaYoutube />
            </Link>
            <Link
              href="/"
              className="border border-zinc-800 flex items-center justify-center w-10 h-10 rounded-full hover:bg-[#f3af7f] hover:border-[#f3af7f] duration-150"
            >
              <FaInstagram />
            </Link>
          </div>
        </div>
      </div>
      <div className="flex p-4 py-6">
        <div className="uppercase font-bold flex-1">©2023 Copyright</div>
        <ul className="flex space-x-4">
          <li>
            <a
              href="/"
              className="font-bold uppercase text-zinc-500 hover:text-zinc-900 hover:underline"
            >
              terms
            </a>
          </li>
          <li>
            <a
              href="/"
              className="font-bold uppercase text-zinc-500 hover:text-zinc-900 hover:underline"
            >
              privacy
            </a>
          </li>
          <li>
            <a
              href="/"
              className="font-bold uppercase text-zinc-500 hover:text-zinc-900 hover:underline"
            >
              cookie preferences
            </a>
          </li>
          <li>
            <a
              href="/"
              className="font-bold uppercase text-zinc-500 hover:text-zinc-900 hover:underline"
            >
              privacy rights
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
