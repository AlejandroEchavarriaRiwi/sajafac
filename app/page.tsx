'use client';

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      redirect: false,
      email: form.email,
      password: form.password,
    });

    if (res?.ok) {
      router.push("/dashboard");
    } else {
      setError("Correo o contraseña incorrectos");
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-background text-foreground px-4">
      <div className="w-full max-w-md bg-card rounded-2xl shadow-lg p-8 space-y-6 flex flex-col items-center">
        {/* Branding */}
        <div className="text-center">
          <div className="text-4xl font-extrabold text-primary">SAJA</div>
          <p className="text-sm text-muted-foreground mt-1">
            Sistema de facturación tecnológica
          </p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-4 w-1/2">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-center">
              Correo electrónico
            </label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={handleChange}
              className="w-full p-2 mt-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-center">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={handleChange}
              className="w-full p-2 mt-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary-dark text-black dark:text-white font-bold py-2 px-4 rounded-md transition pointer"
          >
            Ingresar
          </button>
        </form>

        {/* Pie de página */}
        <p className="text-xs text-center text-muted-foreground">
          © {new Date().getFullYear()} Saja. Todos los derechos reservados.
        </p>
      </div>
    </main>
  );
}
