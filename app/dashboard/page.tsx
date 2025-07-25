import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/ui/logoutbutton";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  return (
    <main className="min-h-screen p-8 bg-background text-foreground">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Bienvenido al Sistema de Facturación de SAJA,{" "}
          <span className="text-primary">{session.user?.name || "usuario"}</span>
        </h1>
        <LogoutButton />
      </div>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Productos y Servicios */}
        <div className="bg-card shadow rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-2">📦 Productos y Servicios</h2>
          <p className="text-muted-foreground mb-4">
            Crea y gestiona los productos o servicios que ofrece SAJA.
          </p>
          <button className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark">
            Crear nuevo producto/servicio
          </button>
        </div>

        {/* Crear Factura */}
        <div className="bg-card shadow rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-2">🧾 Crear Factura</h2>
          <p className="text-muted-foreground mb-4">
            Genera una nueva factura para tus clientes.
          </p>
          <button className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark">
            Crear factura
          </button>
        </div>

        {/* Estadísticas */}
        <div className="bg-card shadow rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-2">📊 Estadísticas</h2>
          <p className="text-muted-foreground mb-4">
            Revisa las ventas, productos más vendidos y más.
          </p>
          <button className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark">
            Ver estadísticas
          </button>
        </div>
      </section>
    </main>
  );
}
