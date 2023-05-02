import { Inter } from "next/font/google";
import Product from "@/components/Product";
import { Suspense } from "react";
const inter = Inter({ subsets: ["latin"] });

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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="grid grid-cols-2 gap-4">
        <Suspense fallback={<div>Loading...</div>}>
          {products.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </Suspense>
      </div>
    </main>
  );
}
