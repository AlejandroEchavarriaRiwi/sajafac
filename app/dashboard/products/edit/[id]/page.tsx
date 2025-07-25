import { EditProductForm } from "@/components/edit-product-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { use } from "react"

export default function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)

  async function getProduct() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${id}`, {
      cache: "no-store",
    })
    if (!res.ok) {
      throw new Error("Producto no encontrado")
    }
    return res.json()
  }

  const product = use(getProduct())

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background px-6 py-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Editar Producto</h1>
          <p className="text-muted-foreground">Modifica la información del producto o servicio</p>
        </div>
      </header>

      {/* Content */}
      <div className="p-6">
        <div className="max-w-2xl mx-auto w-full">
          <Card className="bg-card">
            <CardHeader>
              <CardTitle>Editar Producto</CardTitle>
              <CardDescription>Modifica la información del producto o servicio</CardDescription>
            </CardHeader>
            <CardContent>
              <EditProductForm product={product} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
