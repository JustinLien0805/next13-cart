import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
};

export default async function Home() {
  const res = await fetch("https://dummyjson.com/products");
  const data = await res.json();
  const products: Product[] = await data.products;
  console.log(products[0].images[0]);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="grid grid-cols-2 gap-4">
        {products.map((product) => (
          <div className="border-2 p-4 border-black">
            <Image
              src={product.images[0]}
              alt={product.title}
              width={200}
              height={200}
              className="rounded-md"
            />
            <h1 className="text-lg font-bold">{product.title}</h1>
            <p className="text-sm font-light text-neutral-500">
              {product.description}
            </p>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
