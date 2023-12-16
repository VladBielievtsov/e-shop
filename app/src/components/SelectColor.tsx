import React from "react";
import Link from "next/link";

export default function SelectColor() {
  const colors = [
    {
      color: "#d93a3a",
      active: true,
    },
    {
      color: "#d9763a",
      active: false,
    },
    {
      color: "#f3aba7",
      active: false,
    },
    {
      color: "#d1d378",
      active: false,
    },
    {
      color: "#9ea2d3",
      active: false,
    },
  ];
  return colors.map((color, idx) => (
    <Link
      key={idx}
      href="#"
      className={`w-[40px] h-[40px] rounded-md ${
        color.active ? "ring-2 ring-black ring-offset-2 ring-" : ""
      }`}
      style={{ backgroundColor: color.color }}
    ></Link>
  ));
}
