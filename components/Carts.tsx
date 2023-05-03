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
    <div>
      <h1>{cartItem.product_title}</h1>
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
      <h1>{calculatePrice}</h1>
    </div>
  );
};

const Carts = () => {
  const { items } = useCartStore();
  return (
    <label htmlFor="my-modal" className="modal cursor-pointer">
      <label className="modal-box relative h-96" htmlFor="">
        <h3 className="text-lg font-bold">Cart Items</h3>
        <div className="py-4 flex flex-col gap-4">
          {items.map((item, index) => (
            <Cart key={index} cartItem={item} />
          ))}
        </div>
      </label>
    </label>
  );
};

export default Carts;
