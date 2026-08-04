"use client"
import { Input } from '@/src/components/ui/input';
import { Button } from '@/src/components/ui/button';
import { Label } from '@/src/components/ui/label';
import { useForm } from 'react-hook-form';
import { createProduct } from '@/app/products/products.api';
import { useRouter } from 'next/navigation'

interface FormValues {
  name: string;
  description: string;
  price: string;
  images: string;
}

function ProductForm() {

  const { register, handleSubmit } = useForm<FormValues>();
  const router = useRouter();

  const onSubmit = handleSubmit(async (data: FormValues) => {
    await createProduct({
      ...data,
      price: parseFloat(data.price)
    });
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

      <Button type='submit'>Create Product</Button>
    </form>
  )
}

export default ProductForm