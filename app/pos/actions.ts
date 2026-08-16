"use server";

import { prisma } from "@/lib/prisma";
type ItemVenta = { id: number; cantidad: number };

export async function cobrarVenta(items: ItemVenta[], idEmpleado: number, metodoPago: string) {
  // 1. Traer precios reales desde la db
  const productos = await prisma.producto.findMany({
    where: { id: { in: items.map((item) => item.id) } },
  });

  // 2. Renglones con precio real
  const detalles = items.map((item) => {
    const producto = productos.find((p) => p.id === item.id)!;
    return {
      id_producto: producto.id,
      cantidad: item.cantidad,
      precio_unitario: producto.precio,
    };
  });

  // 3. Calcular total
  const total = detalles.reduce(
    (suma, d) => suma + d.precio_unitario * d.cantidad,
    0,
  );

  const venta = await prisma.venta.create({
    data: {
      total,
      metodo_pago: metodoPago,
      id_empleado: idEmpleado,
      detalle_venta: {
        create: detalles,
      },
    },
  });

  return venta;
}
