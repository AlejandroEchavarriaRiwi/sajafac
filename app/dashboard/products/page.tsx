"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProductsPage() {
  type Product = {
    id: string | number;
    name: string;
    description?: string;
    type: string;
    cost: number;
    price: number;
  };

  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    type: "PRODUCTO",
    cost: "",
    price: "",
  });

  const router = useRouter();

  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e: { target: { name: any; value: any } }) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        cost: Number(form.cost),
        price: Number(form.price),
      }),
    });
    setForm({
      name: "",
      description: "",
      type: "PRODUCTO",
      cost: "",
      price: "",
    });
    fetchProducts();
  };

  const handleDelete = async (id: any) => {
    if (confirm("¿Eliminar este producto?")) {
      await fetch(`/api/products/${id}`, { method: "DELETE" });
      fetchProducts();
    }
  };

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Productos y Servicios</h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-4 mb-6 p-4 rounded shadow"
      >
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Nombre"
          className="p-2 border rounded"
          required
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Descripción"
          className="p-2 border rounded"
        />
        <label htmlFor="type" className="font-medium">
          Tipo
        </label>
        <select
          id="type"
          name="type"
          value={form.type}
          onChange={handleChange}
          className="p-2 border rounded"
        >
          <option value="PRODUCTO">Producto</option>
          <option value="SERVICIO">Servicio</option>
        </select>
        <input
          name="cost"
          value={form.cost}
          onChange={handleChange}
          placeholder="Costo"
          type="number"
          className="p-2 border rounded"
          required
        />
        <input
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Precio"
          type="number"
          className="p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Guardar
        </button>
      </form>

      <table className="w-full text-sm border">
        <thead className="bg-gray-800">
          <tr>
            <th className="p-2 text-left">Nombre</th>
            <th>Tipo</th>
            <th>Precio</th>
            <th>Costo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="border-t">
              <td className="p-2">{p.name}</td>
              <td>{p.type}</td>
              <td>${p.price}</td>
              <td>${p.cost}</td>
              <td className="flex gap-2 p-2">
                <button
                  onClick={() =>
                    router.push(`/dashboard/products/edit/${p.id}`)
                  }
                  className="text-blue-600 hover:underline"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="text-red-600 hover:underline"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
