"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function crearCategoria(formData: FormData) {
  await prisma.categoria.create({
    data: { nombre: String(formData.get("nombre")) },
  });

  revalidatePath("/admin/categorias");
  revalidatePath("/admin/productos");
}

export async function actualizarCategoria(formData: FormData) {
  await prisma.categoria.update({
    where: { id: Number(formData.get("id")) },
    data: { nombre: String(formData.get("nombre")) },
  });

  revalidatePath("/admin/categorias");
  revalidatePath("/admin/productos");
}

export async function eliminarCategoria(id: number) {
  const productos = await prisma.producto.count({
    where: { id_categoria: id },
  });

  if (productos > 0) {
    return { error: "No se puede eliminar: tiene productos asignados" };
  }

  await prisma.categoria.delete({ where: { id } });

  revalidatePath("/admin/categorias");
  return { error: null };
}