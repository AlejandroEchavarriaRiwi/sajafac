import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Package, FileText, BarChart3, DollarSign, Users } from "lucide-react"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background px-6 py-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">¡Bienvenido de vuelta, {session.user?.name}!</h1>
          <p className="text-muted-foreground">Aquí tienes un resumen de tu sistema de facturación SAJA</p>
        </div>
      </header>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Estadísticas rápidas */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ventas del mes</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45,231.89</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+20.1%</span> desde el mes pasado
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Facturas</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+2,350</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+180.1%</span> desde el mes pasado
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Productos</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+12,234</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+19%</span> desde el mes pasado
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Clientes activos</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+573</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+201</span> desde el mes pasado
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Acciones principales */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="hover:shadow-md transition-shadow bg-card">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Package className="h-5 w-5 text-primary" />
                <CardTitle>Productos y Servicios</CardTitle>
              </div>
              <CardDescription>Gestiona tu catálogo de productos y servicios</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total de productos</span>
                <Badge variant="secondary">24</Badge>
              </div>
              <Button asChild className="w-full">
                <Link href="/dashboard/products">
                  <Package className="mr-2 h-4 w-4" />
                  Gestionar productos
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow bg-card">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-primary" />
                <CardTitle>Crear Factura</CardTitle>
              </div>
              <CardDescription>Genera nuevas facturas para tus clientes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Facturas este mes</span>
                <Badge variant="secondary">156</Badge>
              </div>
              <Button asChild className="w-full">
                <Link href="/dashboard/invoices/new">
                  <FileText className="mr-2 h-4 w-4" />
                  Nueva factura
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow bg-card">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                <CardTitle>Estadísticas</CardTitle>
              </div>
              <CardDescription>Analiza el rendimiento de tu negocio</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Crecimiento</span>
                <Badge variant="default" className="bg-green-100 text-green-800">
                  +12.5%
                </Badge>
              </div>
              <Button asChild variant="outline" className="w-full bg-transparent">
                <Link href="/dashboard/stats">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Ver estadísticas
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
