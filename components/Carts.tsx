"use client";

import React from "react";
import useCartStore from "@/stores/useCartStore";

interface CartItem {
  product_title: string;
  quantity: number;
  product_price: number;
}

const Cart = ({ cartItem }: { cartItem: CartItem }) => {
  const { increaseQuantity, decreaseQuantity, removeItem } = useCartStore();
  const handleIncrease = () => {
    increaseQuantity(cartItem);
  };

  const handleDecrease = () => {
    if (cartItem && cartItem.quantity > 1) {
      decreaseQuantity(cartItem);
    } else if (cartItem && cartItem.quantity === 1) {
      removeItem(cartItem);
    }
  };

  const calculatePrice = cartItem.quantity * cartItem.product_price;
  return (
    <div className="grid grid-cols-2 gap-4 border-b p-4">
      <h1 className="col-span-2 text-xl">{cartItem.product_title}</h1>
      <div className="flex items-center">
        <button
          className="bg-black text-white px-4 py-2 rounded-md"
          onClick={handleIncrease}
        >
          +
        </button>
        <span className="px-4">{cartItem.quantity}</span>
        <button
          className="bg-black text-white px-4 py-2 rounded-md"
          onClick={handleDecrease}
        >
          -
        </button>
      </div>
      <h1 className="justify-self-end self-center">{calculatePrice}</h1>
    </div>
  );
};

const Carts = () => {
  const { items, totalPrice } = useCartStore();
  return (
    <label htmlFor="my-modal" className="modal cursor-pointer">
      <label className="modal-box relative max-h-[30rem]" htmlFor="">
        <h3 className="text-2xl font-bold border-b py-4">Cart Items</h3>
        <div className="py-4 flex flex-col gap-4">
          {items.map((item, index) => (
            <Cart key={index} cartItem={item} />
          ))}

          <div className="flex flex-col mt-20 border-t py-4 gap-4">
            <div className="flex">
              <h2 className="mr-auto">Total Price:</h2>
              <h2>${totalPrice}</h2>
            </div>
            <button
              className="disabled:cursor-not-allowed bg-primary rounded-md text-white p-4 font-bold"
              disabled={items.length === 0}
            >
              Checkout
            </button>
          </div>
        </div>
      </label>
    </label>
  );
};

export default Carts;
