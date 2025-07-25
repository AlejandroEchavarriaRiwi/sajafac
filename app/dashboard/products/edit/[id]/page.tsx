import EditProductForm from "@/components/EditProductForm";
import React from "react";
import { use } from "react";

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  async function getProduct() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Producto no encontrado");
    }

    return res.json();
  }

  const product = use(getProduct());

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Editar Producto</h1>
      <EditProductForm product={product} />
    </main>
  );
}
