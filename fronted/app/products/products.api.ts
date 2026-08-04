export async function getProducts() {
  const data = await fetch('http://localhost:4000/api/products');
  return await data.json();
}

export async function createProduct(product: { name: string, description: string, price: number, images: string }) {
  return await fetch('http://localhost:4000/api/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  })
}

export async function deleteProduct(id: string) {
  return await fetch(`http://localhost:4000/api/products/${id}`, {
    method: 'DELETE',
  })
}