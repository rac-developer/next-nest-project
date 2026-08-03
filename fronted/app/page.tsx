import Link from "next/link";
import { Button, buttonVariants } from '@/src/components/ui/button'
import { getProducts } from './products/products.api';
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";

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

      <div className="grid grid-cols-4 gap-4 py-4">
        {
          products.map((product) => (
            <Card key={product.id}>
              <CardHeader>
                <CardTitle className="flex justify-between">
                  {product.name}
                  <span className="text-sm font-bold text-green-400">
                    ${product.price}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <img src={product.images} alt={product.name} className="w-full h-auto" />
                <p>
                  {product.description}
                </p>
                <Button className="mt-5">Buy</Button>
              </CardContent>
            </Card>
          ))
        }
      </div>
    </>
  );
}
