"use client";

import { useState } from "react";
import type { Producto, Categoria } from "@/lib/generated/prisma/client";
import { cobrarVenta } from "./actions";

type ProductoConCategoria = Producto & { categoria: Categoria };
type ItemCarrito = {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
};
type MetodoPago = "efectivo" | "tarjeta";

export default function PosClient({
  productos,
}: {
  productos: ProductoConCategoria[];
}) {
  const [carrito, setCarrito] = useState<ItemCarrito[]>([]);
  const [metodoPago, setMetodoPago] = useState<MetodoPago>("efectivo");

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
  }

  const total = carrito.reduce(
    (suma, item) => suma + item.precio * item.cantidad,
    0,
  );

  async function venta() {
    if (carrito.length === 0) return alert("El carrito está vacío");

    await cobrarVenta(
      carrito.map((item) => ({ id: item.id, cantidad: item.cantidad })),
      3,
      metodoPago
    );

    setCarrito([]);
    setMetodoPago("efectivo");
    alert("Venta realizada con éxito");
  }

  return (
    <div>
      {productos.map((p) => (
        <button key={p.id} onClick={() => agregar(p)}>
          {p.nombre} — ${p.precio}
        </button>
      ))}

      {carrito.map((item) => (
        <div key={item.id}>
          {item.nombre} × {item.cantidad} = ${item.precio * item.cantidad}
          <button onClick={() => modificarCantidad(item.id, -1)}>−</button>
          <button onClick={() => modificarCantidad(item.id, 1)}>+</button>
          <button onClick={() => eliminar(item.id)}>x</button>
        </div>
      ))}

      <h2>Total: ${total}</h2>

      <div className="mt-4 flex gap-2">
        <button onClick={() => setMetodoPago("efectivo")}>Efectivo</button>
        <button onClick={() => setMetodoPago("tarjeta")}>Tarjeta</button>
      </div>

      <div className="mt-4 flex gap-2">
        <button onClick={venta}>Cobrar</button>
        <button onClick={cancelarVenta}>Cancelar venta</button>
      </div>
    </div>
  );
}
