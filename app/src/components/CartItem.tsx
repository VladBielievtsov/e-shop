import { ICart, removeFromCart } from "@/lib/features/cart/cartSlice";
import { useAppDispatch } from "@/lib/hooks";
import { Button } from "@nextui-org/react";
import React from "react";

interface CartItemProps {
  item: ICart;
}

export default function CartItem({ item }: CartItemProps) {
  const dispatch = useAppDispatch();

  function removeHandler(id: string) {
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cart = cart.filter((item: ICart) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(cart));

    dispatch(removeFromCart(id));
  }

  return (
    <div className="flex items-center relative space-x-4">
      <div className="w-[100px] min-w-[100px] h-[100px] overflow-hidden object-center rounded-2xl">
        <img
          src="https://storage.googleapis.com/lulu-fanatics/product/71842/1280/lululemon-muscle-love-long-sleeve-shirt-white-opal-047748-385276.jpg"
          alt="title"
        />
      </div>
      <div className="max-w-[150px]">
        <h4 className="uppercase font-bold text-sm">{item.title}</h4>
        {/* <span className="text-zinc-400 text-sm">ID: 5186046</span> */}
      </div>
      <div className="flex-1 flex flex-col items-end pr-14">
        <div className="min-w-[70px]">
          <p className="font-bold">${item.totalPrice}</p>
          <p>Size: {item.size}</p>
          {/* <p>Color: Red</p> */}
        </div>
      </div>
      <div className="absolute top-0 right-0">
        <Button
          className="bg-zinc-100 w-10 h-10 px-0 min-w-0"
          onClick={() => removeHandler(item.id)}
        >
          <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height="1em"
            role="presentation"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="1em"
          >
            <path d="M18 6L6 18M6 6l12 12"></path>
          </svg>
        </Button>
      </div>
    </div>
  );
}
