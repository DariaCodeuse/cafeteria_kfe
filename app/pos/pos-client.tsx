"use client";

import { useCarrito, type ProductoConCategoria } from "./use-carrito";
import { ProductoGrid } from "./producto-grid";
import { TicketVenta } from "./ticket-venta";

export default function PosClient({
  productos,
}: {
  productos: ProductoConCategoria[];
}) {
  const {
    carrito, total, metodoPago, setMetodoPago,
    categorias, categoriaActiva, setCategoriaActiva, productosFiltrados,
    agregar, modificarCantidad, eliminar, cancelarVenta, venta,
  } = useCarrito(productos);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-4 p-4">
      <ProductoGrid
        categorias={categorias}
        categoriaActiva={categoriaActiva}
        setCategoriaActiva={setCategoriaActiva}
        productosFiltrados={productosFiltrados}
        agregar={agregar}
      />
      <TicketVenta
        carrito={carrito}
        total={total}
        metodoPago={metodoPago}
        setMetodoPago={setMetodoPago}
        modificarCantidad={modificarCantidad}
        eliminar={eliminar}
        cancelarVenta={cancelarVenta}
        venta={venta}
      />
    </div>
  );
}