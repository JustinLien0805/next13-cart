import { Inter } from "next/font/google";
import Product from "@/components/Product";
import { Suspense } from "react";
import Carts from "@/components/Carts";

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
};

export default async function Home() {
  const res = await fetch("https://dummyjson.com/products", {
    cache: "no-store",
  });
  const data = await res.json();
  const products: Product[] = await data.products;
  return (
    <main className="flex relative min-h-screen bg-white flex-col items-center justify-between p-24">
      <label htmlFor="my-modal" className="btn absolute top-4 right-4">
        open cart
      </label>
      <div className="grid grid-cols-2 gap-4">
        <Suspense fallback={<div>Loading...</div>}>
          {products.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </Suspense>

        {/* Put this part before </body> tag */}
        <input type="checkbox" id="my-modal" className="modal-toggle" />
        <Carts />
      </div>
    </main>
  );
}
