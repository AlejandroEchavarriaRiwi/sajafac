'use client';

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-background text-foreground">
      <div className="bg-card p-8 rounded-2xl shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">Iniciar sesión en Saja</h1>
        <button
          onClick={() => signIn("github")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl w-full"
        >
          Iniciar sesión con GitHub
        </button>
      </div>
    </main>
  );
}
