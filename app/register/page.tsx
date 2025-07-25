'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      alert("Usuario registrado correctamente");
      router.push("/login");
    } else {
      const { error } = await res.json();
      alert(error);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-background text-foreground">
      <form onSubmit={handleSubmit} className="bg-card p-8 rounded-2xl shadow-md w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold">Registro de usuario</h1>
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          onChange={handleChange}
          className="w-full p-2 rounded-lg border"
        />
        <input
          type="email"
          name="email"
          placeholder="Correo"
          onChange={handleChange}
          className="w-full p-2 rounded-lg border"
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          onChange={handleChange}
          className="w-full p-2 rounded-lg border"
        />
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg">
          Registrarse
        </button>
      </form>
    </main>
  );
}
