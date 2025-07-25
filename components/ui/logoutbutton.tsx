// components/LogoutButton.tsx
"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  const handleLogout = async () => {
    const confirmed = confirm("¿Estás seguro de que deseas cerrar sesión?");
    if (confirmed) {
      alert("¡Hasta pronto!");
      await signOut({ callbackUrl: "/" }); // Redirige al inicio
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
    >
      Cerrar sesión
    </button>
  );
}
