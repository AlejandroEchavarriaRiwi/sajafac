"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"

interface Product {
  id: string
  name: string
  description: string
  type: string
  cost: number
  price: number
}

interface EditProductFormProps {
  product: Product
}

export function EditProductForm({ product }: EditProductFormProps) {
  const [formData, setFormData] = useState<Product>(product)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleChange = (name: string, value: string | number) => {
    setFormData({
      ...formData,
      [name]:
        typeof value === "string" && (name === "cost" || name === "price") ? Number.parseFloat(value) || 0 : value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const res = await fetch(`/api/products/${formData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        toast.success("Producto actualizado exitosamente")
        router.push("/dashboard/products")
        router.refresh()
      } else {
        toast.error("Error al actualizar el producto")
      }
    } catch (error) {
      toast.error("Error al actualizar el producto")
    } finally {
      setIsLoading(false)
    }
  }

  const margin = formData.price > 0 ? (((formData.price - formData.cost) / formData.price) * 100).toFixed(1) : "0"

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/products">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h2 className="text-lg font-semibold">Editando: {product.name}</h2>
          <p className="text-sm text-muted-foreground">Modifica los campos que necesites actualizar</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Nombre del producto/servicio"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Tipo *</Label>
            <Select value={formData.type} onValueChange={(value) => handleChange("type", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona el tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PRODUCTO">Producto</SelectItem>
                <SelectItem value="SERVICIO">Servicio</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Descripción</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Descripción del producto/servicio"
            rows={3}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="cost">Costo *</Label>
            <Input
              id="cost"
              type="number"
              step="0.01"
              value={formData.cost}
              onChange={(e) => handleChange("cost", e.target.value)}
              placeholder="0.00"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Precio *</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => handleChange("price", e.target.value)}
              placeholder="0.00"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Margen de ganancia</Label>
            <div className="flex items-center h-10 px-3 py-2 border border-input bg-muted rounded-md">
              <span className={`font-medium ${Number.parseFloat(margin) > 20 ? "text-green-600" : "text-red-600"}`}>
                {margin}%
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <Button type="submit" disabled={isLoading} className="flex-1">
            <Save className="mr-2 h-4 w-4" />
            {isLoading ? "Guardando..." : "Guardar cambios"}
          </Button>
          <Button type="button" variant="outline" asChild>
            <Link href="/dashboard/products">Cancelar</Link>
          </Button>
        </div>
      </form>
    </div>
  )
}
