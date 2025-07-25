"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Package, Search } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

type Product = {
  id: string | number
  name: string
  description?: string
  type: string
  cost: number
  price: number
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [form, setForm] = useState({
    name: "",
    description: "",
    type: "PRODUCTO",
    cost: "",
    price: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products")
      const data = await res.json()
      setProducts(data)
      setFilteredProducts(data)
    } catch (error) {
      toast.error("Error al cargar productos")
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.type.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredProducts(filtered)
  }, [searchTerm, products])

  const handleChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          cost: Number(form.cost),
          price: Number(form.price),
        }),
      })

      if (response.ok) {
        setForm({
          name: "",
          description: "",
          type: "PRODUCTO",
          cost: "",
          price: "",
        })
        fetchProducts()
        toast.success("Producto creado exitosamente")
      } else {
        toast.error("Error al crear producto")
      }
    } catch (error) {
      toast.error("Error al crear producto")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string | number) => {
    try {
      const response = await fetch(`/api/products/${id}`, { method: "DELETE" })
      if (response.ok) {
        fetchProducts()
        toast.success("Producto eliminado exitosamente")
      } else {
        toast.error("Error al eliminar producto")
      }
    } catch (error) {
      toast.error("Error al eliminar producto")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background px-6 py-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Productos y Servicios</h1>
          <p className="text-muted-foreground">Gestiona tu catálogo de productos y servicios</p>
        </div>
      </header>

      {/* Content */}
      <div className="p-6 space-y-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Formulario de creación */}
          <Card className="lg:col-span-1 bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Nuevo Producto/Servicio
              </CardTitle>
              <CardDescription>Agrega un nuevo producto o servicio a tu catálogo</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre *</Label>
                  <Input
                    id="name"
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder="Nombre del producto/servicio"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea
                    id="description"
                    value={form.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                    placeholder="Descripción opcional"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Tipo *</Label>
                  <Select value={form.type} onValueChange={(value) => handleChange("type", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PRODUCTO">Producto</SelectItem>
                      <SelectItem value="SERVICIO">Servicio</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cost">Costo *</Label>
                    <Input
                      id="cost"
                      type="number"
                      step="0.01"
                      value={form.cost}
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
                      value={form.price}
                      onChange={(e) => handleChange("price", e.target.value)}
                      placeholder="0.00"
                      required
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Guardando..." : "Guardar Producto"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Lista de productos */}
          <Card className="lg:col-span-2 bg-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Catálogo ({filteredProducts.length})
                  </CardTitle>
                  <CardDescription>Lista de todos tus productos y servicios</CardDescription>
                </div>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Buscar productos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead className="text-right">Costo</TableHead>
                      <TableHead className="text-right">Precio</TableHead>
                      <TableHead className="text-right">Margen</TableHead>
                      <TableHead className="w-[100px]">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                          No se encontraron productos
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredProducts.map((product) => {
                        const margin = (((product.price - product.cost) / product.price) * 100).toFixed(1)
                        return (
                          <TableRow key={product.id}>
                            <TableCell className="font-medium">
                              <div>
                                <div>{product.name}</div>
                                {product.description && (
                                  <div className="text-sm text-muted-foreground truncate max-w-[200px]">
                                    {product.description}
                                  </div>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant={product.type === "PRODUCTO" ? "default" : "secondary"}>
                                {product.type}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">${product.cost.toFixed(2)}</TableCell>
                            <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
                            <TableCell className="text-right">
                              <Badge variant={Number.parseFloat(margin) > 20 ? "default" : "destructive"}>
                                {margin}%
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => router.push(`/dashboard/products/edit/${product.id}`)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>¿Eliminar producto?</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Esta acción no se puede deshacer. El producto será eliminado permanentemente.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                      <AlertDialogAction
                                        onClick={() => handleDelete(product.id)}
                                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                      >
                                        Eliminar
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                            </TableCell>
                          </TableRow>
                        )
                      })
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
