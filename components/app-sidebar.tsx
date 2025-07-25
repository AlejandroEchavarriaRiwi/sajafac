"use client"
import { BarChart3, FileText, Home, Package, Settings, LogOut } from "lucide-react"
import { signOut } from "next-auth/react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface AppSidebarProps {
  user?: {
    name?: string | null
    email?: string | null
    image?: string | null
  }
}

export function AppSidebar({ user }: AppSidebarProps) {
  const pathname = usePathname()

  const navItems = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
    },
    {
      title: "Productos y Servicios",
      url: "/dashboard/products",
      icon: Package,
    },
    {
      title: "Facturas",
      url: "/dashboard/invoices",
      icon: FileText,
    },
    {
      title: "Estadísticas",
      url: "/dashboard/stats",
      icon: BarChart3,
    },
    {
      title: "Configuración",
      url: "/dashboard/settings",
      icon: Settings,
    },
  ]

  return (
    <div className="flex h-full w-full flex-col sidebar-content">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-sidebar-border px-4 py-4 bg-sidebar">
        <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Package className="size-4" />
        </div>
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-semibold text-sidebar-foreground">SAJA</span>
          <span className="truncate text-xs text-sidebar-foreground/70">Sistema de Facturación</span>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-auto bg-sidebar">
        <div className="p-4">
          <div className="mb-2">
            <h3 className="mb-2 px-2 text-xs font-semibold text-sidebar-foreground/70 uppercase tracking-wider">
              Navegación
            </h3>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.url
                return (
                  <Link
                    key={item.title}
                    href={item.url}
                    className={`
                      flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors
                      ${
                        isActive
                          ? "bg-sidebar-accent text-sidebar-accent-foreground"
                          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      }
                    `}
                  >
                    <item.icon className="size-4" />
                    <span>{item.title}</span>
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-sidebar-border bg-sidebar p-4">
        <div className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-sidebar-accent transition-colors cursor-pointer">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            {user?.name?.charAt(0) || "U"}
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold text-sidebar-foreground">{user?.name}</span>
            <span className="truncate text-xs text-sidebar-foreground/70">{user?.email}</span>
          </div>
          <button
            onClick={() => signOut()}
            className="flex items-center justify-center size-8 rounded-lg hover:bg-sidebar-accent transition-colors"
            title="Cerrar sesión"
          >
            <LogOut className="size-4 text-sidebar-foreground" />
          </button>
        </div>
      </div>
    </div>
  )
}
