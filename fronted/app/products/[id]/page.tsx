import { getProduct } from '@/app/products/products.api'
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card';
import Link from 'next/link';
import { buttonVariants } from '@/src/components/ui/button';

interface Props {
  params: Promise<{ id: string }>
}

export default async function ProductDetailPage({ params }: Props) {
  const product = await getProduct((await params).id);

  console.log(product);

  return (
    <div className='flex justify-center items-center h-screen'>
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center justify-between text-2xl'>
            {product.name}
            <Link href="/" className={buttonVariants()}>Go back</Link>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>{product.price}</p>
          <p>{product.description}</p>
          <img
            src={product.images}
            alt={product.name}
            className='w-full h-64 object-cover'
          />
        </CardContent>
      </Card>
    </div>
  )
}
