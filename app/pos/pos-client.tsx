"use client";

import { useState } from "react";
import type { Producto, Categoria } from "@/lib/generated/prisma/client";

type ProductoConCategoria = Producto & { categoria: Categoria };
type ItemCarrito = {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
};

export default function PosClient({
  productos,
}: {
  productos: ProductoConCategoria[];
}) {
  const [carrito, setCarrito] = useState<ItemCarrito[]>([]);

  function agregar(producto: ProductoConCategoria) {
    setCarrito((actual) => {
      const existe = actual.find((item) => item.id === producto.id);

      if (existe) {
        return actual.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item,
        )
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
      actual.map((item) =>
        item.id === productoId
          ? { ...item, cantidad: item.cantidad + cantidad }
          : item,
      )
      .filter((item) => item.cantidad > 0)
    );
  }

  function eliminar(productoId: number) {
    setCarrito((actual) => actual.filter((item) => item.id !== productoId));
  }

  const total = carrito.reduce(
    (suma, item) => suma + item.precio * item.cantidad,
    0,
  );

  return (
    <div>
      {productos.map((p) => (
        <button key={p.id} onClick={() => agregar(p)}>
          {p.nombre} — ${p.precio}
        </button>
      ))}

      <h2>Total: ${total}</h2>
      {carrito.map((item) => (
        <div key={item.id}>
          {item.nombre} × {item.cantidad} = ${item.precio * item.cantidad}
          <button onClick={() => modificarCantidad(item.id, -1)}>−</button>
          <button onClick={() => modificarCantidad(item.id, 1)}>+</button>
          <button onClick={() => eliminar(item.id)}>x</button>
        </div>
      ))}
    </div>
  );
}
