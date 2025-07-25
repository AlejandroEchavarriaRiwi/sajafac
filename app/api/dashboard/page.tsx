import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // si moviste las opciones allí
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">Bienvenido al Dashboard, {session.user?.name || "usuario"}</h1>
      {/* Aquí irá la lógica de ventas, productos, etc. */}
    </main>
  );
}
