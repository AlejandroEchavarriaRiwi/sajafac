import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

type Context = {
  params: Promise<{
    id: string
  }>
}

// GET product by ID
export async function GET(_req: NextRequest, context: Context) {
  const { id } = await context.params

  try {
    const product = await prisma.product.findUnique({
      where: { id },
    })

    if (!product) {
      return NextResponse.json({ error: "Producto no encontrado" }, { status: 404 })
    }

    return NextResponse.json(product)
  } catch (error) {
    return NextResponse.json({ error: "Error interno" }, { status: 500 })
  }
}

// PUT update product
export async function PUT(req: NextRequest, context: Context) {
  const { id } = await context.params
  const { name, description, type, cost, price } = await req.json()

  try {
    const updated = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        type,
        cost,
        price,
      },
    })

    return NextResponse.json(updated)
  } catch (error) {
    return NextResponse.json({ error: "Error al actualizar" }, { status: 500 })
  }
}

// DELETE product
export async function DELETE(_req: NextRequest, context: Context) {
  const { id } = await context.params

  try {
    await prisma.product.delete({
      where: { id },
    })

    return NextResponse.json({ message: "Producto eliminado" })
  } catch (error) {
    return NextResponse.json({ error: "Error al eliminar" }, { status: 500 })
  }
}
