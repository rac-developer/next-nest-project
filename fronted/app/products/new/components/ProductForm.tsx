"use client"
import { Input } from '@/src/components/ui/input';
import { Button } from '@/src/components/ui/button';
import { Label } from '@/src/components/ui/label';
import { useForm } from 'react-hook-form';
import { createProduct, updateProduct } from '@/app/products/products.api';
import { useParams, useRouter } from 'next/navigation'


interface FormValues {
  name: string;
  description: string;
  price: string;
  images: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number | string;
  images: string;
}

function ProductForm({ product }: { product: Product | null }) {

  const { register, handleSubmit } = useForm<FormValues>({
    values: {
      name: product?.name || '',
      description: product?.description || '',
      price: product?.price ? String(product.price) : '',
      images: product?.images || ''
    }
  });
  const router = useRouter();
  const params = useParams<{id?: string}>();

const onSubmit = handleSubmit(async (data: FormValues) => {
    if (params?.id) {
      // Pasamos params.id y los datos convertidos por separado
      await updateProduct(params.id, {
        name: data.name,
        description: data.description,
        price: parseFloat(data.price),
        images: data.images
      });
    } else {
      await createProduct({
        ...data,
        price: parseFloat(data.price)
      });
    }
    router.push('/')
    router.refresh();
  })

  
  return (
    <form onSubmit={onSubmit}>
      <Label>Product Name</Label>
      <Input {...register('name')}></Input>
      <Label>Description</Label>
      <Input {...register('description')}></Input>
      <Label>Price</Label>
      <Input type='number' step='any' {...register('price')}></Input>
      <Label>Image</Label>
      <Input {...register('images')}></Input>

      <Button type='submit'>{product ? 'Update Product' : 'Create Product'}</Button>
    </form>
  )
}

export default ProductForm