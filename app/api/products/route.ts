// POST: Crear producto o servicio
// GET: Listar productos

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const data = await req.json();
  const { name, description, type, cost, price } = data;

  if (!name || !type || cost < 0 || price < 0) {
    return NextResponse.json({ error: "Faltan campos" }, { status: 400 });
  }

  const newProduct = await prisma.product.create({
    data: {
      name,
      description,
      type,
      cost,
      price,
    },
  });

  return NextResponse.json(newProduct);
}

export async function GET() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(products);
}
