import Link from "next/link";
import { buttonVariants } from '@/src/components/ui/button'
import { getProducts } from './products/products.api';
import ProductCard from "@/src/components/ui/ProductCard";

export const dynamic = 'force-dynamic';

export default async function Home() {

  const products = await getProducts();
  console.log(products)
  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-4xl font-bold">NextNestApp</h1>
        <Link
          href="/products/new"
          className={buttonVariants()}
        >
          Create Product
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 py-4">
        {
          products.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))
        }
      </div>
    </>
  );
}
