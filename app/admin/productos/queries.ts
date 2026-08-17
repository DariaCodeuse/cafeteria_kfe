import { prisma } from "@/lib/prisma";

export async function obtenerProductos() {
  return prisma.producto.findMany({
    include: { categoria: true },
    orderBy: { nombre: "asc" },
  });
}

export async function obtenerCategorias() {
  return prisma.categoria.findMany({ orderBy: { nombre: "asc" } });
}