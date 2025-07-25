"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Product {
  id: string;
  name: string;
  description: string;
  type: string;
  cost: number;
  price: number;
}

interface EditProductFormProps {
  product: Product;
}

export default function EditProductForm({ product }: EditProductFormProps) {
  const [formData, setFormData] = useState<Product>(product);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === "cost" || name === "price" ? parseFloat(value) : value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`/api/products/${formData.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      router.push("/dashboard/products  ");
      router.refresh();
    } else {
      alert("Error al actualizar el producto");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Nombre"
        className="w-full p-2 border rounded"
      />
      <input
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Descripción"
        className="w-full p-2 border rounded"
      />
      <input
        name="type"
        value={formData.type}
        onChange={handleChange}
        placeholder="Tipo"
        className="w-full p-2 border rounded"
      />
      <input
        type="number"
        name="cost"
        value={formData.cost}
        onChange={handleChange}
        placeholder="Costo"
        className="w-full p-2 border rounded"
      />
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Precio"
        className="w-full p-2 border rounded"
      />
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
        Guardar cambios
      </button>
    </form>
  );
}
