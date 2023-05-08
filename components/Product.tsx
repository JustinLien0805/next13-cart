"use client";
type ProductProps = {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
};
import Image from "next/image";
import useCartStore from "@/stores/useCartStore";
import Link from "next/link";
const Product = ({ product }: { product: ProductProps }) => {
  const {
    addItem,
    increaseQuantity,
    decreaseQuantity,
    items,
    removeItem,
    totalPrice,
  } = useCartStore();

  const cartItem = items.find((item) => item.product_title === product.title);
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = () => {
    const newCartItem = {
      product_title: product.title,
      quantity: 1,
      product_price: product.price,
    };
    addItem(newCartItem);
  };

  const handleIncrease = () => {
    if (cartItem) {
      increaseQuantity(cartItem);
    } else {
      handleAddToCart();
    }
  };

  const handleDecrease = () => {
    if (cartItem && cartItem.quantity > 1) {
      decreaseQuantity(cartItem);
    } else if (cartItem && cartItem.quantity === 1) {
      removeItem(cartItem);
    }
  };
  return (
    <div className="border-2 p-4 border-black">
      {/* <Image
        src={product.images[0]}
        alt={product.title}
        width={200}
        height={200}
        className="rounded-md"
      /> */}
      <Link href="/photo/1">click me</Link>
      <h1 className="text-lg font-bold">{product.title}</h1>
      <p className="text-sm font-light text-neutral-500">
        {product.description}
      </p>
      <p>${product.price}</p>
      <div>
        <button
          className="bg-black text-white px-4 py-2 rounded-md"
          onClick={handleIncrease}
        >
          +
        </button>
        <span className="px-4">{quantity}</span>
        <button
          className="bg-black text-white px-4 py-2 rounded-md"
          onClick={handleDecrease}
        >
          -
        </button>
      </div>
    </div>
  );
};

export default Product;
