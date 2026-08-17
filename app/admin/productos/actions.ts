"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function crearProducto(formData: FormData) {
  await prisma.producto.create({
    data: {
      nombre: String(formData.get("nombre")),
      descripcion: String(formData.get("descripcion")),
      precio: Number(formData.get("precio")),
      id_categoria: Number(formData.get("id_categoria")),
    },
  })

  revalidatePath("/admin/productos")
}

export async function actualizarProducto(formData: FormData) {
  await prisma.producto.update({
    where: { id: Number(formData.get("id")) },
    data: {
      nombre: String(formData.get("nombre")),
      descripcion: String(formData.get("descripcion")),
      precio: Number(formData.get("precio")),
      id_categoria: Number(formData.get("id_categoria")),
    },
  })

  revalidatePath("/admin/productos")
}

export async function cambiarEstado(id: number, estado: boolean) {
  await prisma.producto.update({
    where: { id },
    data: { estado },
  })

  revalidatePath("/admin/productos")
}