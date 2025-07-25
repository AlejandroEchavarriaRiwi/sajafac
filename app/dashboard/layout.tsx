import type React from "react"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { AppSidebar } from "@/components/app-sidebar"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/")
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar fijo */}
      <div className="sidebar-fixed">
        <AppSidebar user={session.user} />
      </div>

      {/* Contenido principal */}
      <div className="main-content flex-1">{children}</div>
    </div>
  )
}
