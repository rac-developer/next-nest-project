import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card"
import ProductForm from "./components/ProductForm"
import { getProduct } from "../products.api"

interface Props {
  params: Promise<{ id: string }> | { id: string }
}

async function ProductNewPage({params}: Props) {
  // Resolvemos params si es una Promesa
  const resolvedParams = params instanceof Promise ? await params : params;
  const id = resolvedParams?.id;

  // Solo hacemos fetch si el ID existe en la URL (modo edición)
  const product = id ? await getProduct(id) : null;

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>{product ? "Edit Product" : "Create Product"}</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Le pasamos el producto (que puede ser los datos o null) */}
          <ProductForm product={product}/>
        </CardContent>
      </Card>
    </div>
  )
}

export default ProductNewPage
