import { prisma } from "@/lib/prisma";

export async function obtenerEmpleados() {
  return prisma.empleado.findMany({
    include: {
      _count: { select: { venta: true } },
    },
    orderBy: { nombre: "asc" },
  });
}