"use client";

import { useState } from "react";
import type { Producto, Categoria } from "@/lib/generated/prisma/client";
import { cobrarVenta } from "./actions";
import { toast } from "sonner"

export type ProductoConCategoria = Producto & { categoria: Categoria };
export type ItemCarrito = {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
};
export type MetodoPago = "efectivo" | "tarjeta";

export function useCarrito(productos: ProductoConCategoria[]) {
  const [carrito, setCarrito] = useState<ItemCarrito[]>([]);
  const [metodoPago, setMetodoPago] = useState<MetodoPago>("efectivo");
  const [aviso, setAviso] = useState<string | null>(null);
  const [categoriaActiva, setCategoriaActiva] = useState("Todos");

  function agregar(producto: ProductoConCategoria) {
    setCarrito((actual) => {
      const existe = actual.find((item) => item.id === producto.id);
      if (existe) {
        return actual.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item,
        );
      }
      return [
        ...actual,
        {
          id: producto.id,
          nombre: producto.nombre,
          precio: producto.precio,
          cantidad: 1,
        },
      ];
    });
  }

  function modificarCantidad(productoId: number, cantidad: number) {
    setCarrito((actual) =>
      actual
        .map((item) =>
          item.id === productoId
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item,
        )
        .filter((item) => item.cantidad > 0),
    );
  }

  function eliminar(productoId: number) {
    setCarrito((actual) => actual.filter((item) => item.id !== productoId));
  }

  function cancelarVenta() {
    setCarrito([]);
    setMetodoPago("efectivo");
    toast.info("Venta cancelada");
  }

  const total = carrito.reduce(
    (suma, item) => suma + item.precio * item.cantidad,
    0,
  );

  async function venta() {
    if (carrito.length === 0) return;
    await cobrarVenta(
      carrito.map((item) => ({ id: item.id, cantidad: item.cantidad })),
      metodoPago,
    );
    setCarrito([]);
    setMetodoPago("efectivo");
    toast.success("Venta realizada con éxito");
  }

  const categorias = [
    "Todos",
    ...new Set(productos.map((p) => p.categoria.nombre)),
  ];

  const productosFiltrados =
    categoriaActiva === "Todos"
      ? productos
      : productos.filter((p) => p.categoria.nombre === categoriaActiva);

  return {
    carrito, total, metodoPago, setMetodoPago,
    aviso, setAviso,
    categorias, categoriaActiva, setCategoriaActiva, productosFiltrados,
    agregar, modificarCantidad, eliminar, cancelarVenta, venta,
  };
}