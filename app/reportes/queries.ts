import { prisma } from "@/lib/prisma";

export type FilaReporte = {
  id: number;
  nombre: string;
  cantidad: number;
  ingreso: number;
};

export function calcularRango(desde?: string, hasta?: string) {
  const fin = hasta ? new Date(hasta) : new Date();
  fin.setHours(23, 59, 59, 999);

  const inicio = desde ? new Date(desde) : new Date();
  if (!desde) inicio.setDate(inicio.getDate() - 6); // semana actual
  inicio.setHours(0, 0, 0, 0);

  return { inicio, fin };
}

export async function obtenerReporte(inicio: Date, fin: Date) {
  const detalles = await prisma.detalleVenta.findMany({
    where: { venta: { fecha: { gte: inicio, lte: fin } } },
    include: { producto: true },
  });

  const mapa = new Map<number, FilaReporte>();

  for (const d of detalles) {
    const actual = mapa.get(d.id_producto) ?? {
      id: d.id_producto,
      nombre: d.producto.nombre,
      cantidad: 0,
      ingreso: 0,
    };
    actual.cantidad += d.cantidad;
    actual.ingreso += d.cantidad * d.precio_unitario;
    mapa.set(d.id_producto, actual);
  }

  const reporte = [...mapa.values()].sort((a, b) => b.cantidad - a.cantidad);

  const tickets = await prisma.venta.count({
    where: { fecha: { gte: inicio, lte: fin } },
  });

  const totalVendido = reporte.reduce((s, r) => s + r.ingreso, 0);
  const totalUnidades = reporte.reduce((s, r) => s + r.cantidad, 0);

  return {
    reporte,
    metricas: {
      totalVendido,
      totalUnidades,
      tickets,
      promedio: tickets > 0 ? totalVendido / tickets : 0,
    },
  };
}