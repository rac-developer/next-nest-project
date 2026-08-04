'use client'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Button } from '@/src/components/ui/button'
import { deleteProduct } from "@/app/products/products.api";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    description: string;
    images: string;
  };
}

export default function ProductCard({ product }: ProductCardProps) {

  const router = useRouter();

  const handleDelete = async() => {
    await deleteProduct(product.id)
    router.refresh();
  }

  return (
    <div>
      <Card key={product.id} onClick={() => {
        router.push(`/products/${product.id}`)
      }}>
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
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button className="mt-5" onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/products/${product.id}/edit`)
                }}>Editar</Button>
                <Button className="mt-5" variant="destructive" onClick={(e) => {
                  e.stopPropagation();
                  handleDelete();
                }}>Eliminar</Button>
              </CardFooter>
            </Card>
    </div>
  )
}
