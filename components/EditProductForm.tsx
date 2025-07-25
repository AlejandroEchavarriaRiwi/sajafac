"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";

interface Product {
  id: string;
  name: string;
  description: string;
  type: string;
  cost: number;
  price: number;
}

interface Props {
  product: Product;
}

export default function EditProductForm({ product }: Props) {
  const [formData, setFormData] = useState({
    name: product.name,
    description: product.description,
    type: product.type,
    cost: product.cost.toString(),
    price: product.price.toString(),
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const updatedProduct = {
      name: formData.name,
      description: formData.description,
      type: formData.type,
      cost: Number(formData.cost),
      price: Number(formData.price),
    };

    const res = await fetch(`/api/products/${product.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProduct),
    });

    if (res.ok) {
      router.push("/dashboard/products");
      router.refresh();
    } else {
      console.error("Error actualizando producto");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 p-4 border rounded">
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Nombre"
        className="w-full border p-2"
        required
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Descripción"
        className="w-full border p-2"
        required
      />
      <input
        type="text"
        name="type"
        value={formData.type}
        onChange={handleChange}
        placeholder="Tipo"
        className="w-full border p-2"
        required
      />
      <input
        type="number"
        name="cost"
        value={formData.cost}
        onChange={handleChange}
        placeholder="Costo"
        className="w-full border p-2"
        required
      />
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Precio"
        className="w-full border p-2"
        required
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Guardar cambios
      </button>
    </form>
  );
}
