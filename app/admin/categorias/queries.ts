import { prisma } from "@/lib/prisma";

export async function obtenerCategorias() {
  return prisma.categoria.findMany({
    include: {
      _count: { select: { producto: true } },
    },
    orderBy: { nombre: "asc" },
  });
}