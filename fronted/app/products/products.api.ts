export const BACKEND_URL = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL;

export async function getProducts() {
  const data = await fetch(`${BACKEND_URL}/api/products`);
  return await data.json();
}

export async function getProduct(id: string) {
  const data = await fetch(`${BACKEND_URL}/api/products/${id}`,{});
  return await data.json();
}

export async function createProduct(product: { name: string, description: string, price: number, images: string }) {
  return await fetch(`${BACKEND_URL}/api/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  })
}

export async function deleteProduct(id: string) {
  return await fetch(`${BACKEND_URL}/api/products/${id}`, {
    method: 'DELETE',
  })
}

// Separamos el 'id' del resto de los datos (name, description, price, images)
export async function updateProduct(id: string, product: { name: string, description: string, price: number, images: string }) {
  return await fetch(`${BACKEND_URL}/api/products/${id}`, {
    method: 'PATCH', // Debe ser PATCH para coincidir con NestJS
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product), // El JSON ya no llevará el campo "id"
  })
}
