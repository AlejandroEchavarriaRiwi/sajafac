"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface EditProductFormProps {
  id: string;
}

const EditProductForm = ({ id }: EditProductFormProps) => {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    description: "",
    type: "",
    cost: 0,
    price: 0,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`/api/products/${id}`);
      if (res.ok) {
        const data = await res.json();
        setForm({
          name: data.name,
          description: data.description,
          type: data.type,
          cost: data.cost,
          price: data.price,
        });
      } else {
        alert("Error al cargar el producto");
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "cost" || name === "price" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    setLoading(false);

    if (res.ok) {
      alert("Producto actualizado");
      router.push("/dashboard/products");
    } else {
      const data = await res.json();
      alert(data.error || "Error al actualizar");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-4 shadow-md rounded">
      <h2 className="text-xl font-bold">Editar Producto</h2>

      <input
        type="text"
        name="name"
        placeholder="Nombre"
        value={form.name}
        onChange={handleChange}
        required
        className="w-full border p-2"
      />

      <textarea
        name="description"
        placeholder="Descripción"
        value={form.description}
        onChange={handleChange}
        required
        className="w-full border p-2"
      />

      <input
        type="text"
        name="type"
        placeholder="Tipo"
        value={form.type}
        onChange={handleChange}
        required
        className="w-full border p-2"
      />

      <input
        type="number"
        name="cost"
        placeholder="Costo"
        value={form.cost}
        onChange={handleChange}
        required
        min={0}
        className="w-full border p-2"
      />

      <input
        type="number"
        name="price"
        placeholder="Precio"
        value={form.price}
        onChange={handleChange}
        required
        min={0}
        className="w-full border p-2"
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Guardando..." : "Guardar Cambios"}
      </button>
    </form>
  );
};

export default EditProductForm;
