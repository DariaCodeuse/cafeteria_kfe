"use client";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
  ItemGroup,
  ItemMedia
} from "@/components/ui/item";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckCircle2Icon, Minus, Plus, Trash2Icon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
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
  const [aviso, setAviso] = useState<string | null>(null);

  // CRUD del carrito
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

  // Función para venta
  async function venta() {
    if (carrito.length === 0) return alert("El carrito está vacío");

    await cobrarVenta(
      carrito.map((item) => ({ id: item.id, cantidad: item.cantidad })),
      3,
      metodoPago,
    );

    setCarrito([]);
    setMetodoPago("efectivo");
    alert("Venta realizada con éxito");
  }

  // Lógica para ui
  const [categoriaActiva, setCategoriaActiva] = useState<string>("Todos");

  const categorias = [
    "Todos",
    ...new Set(productos.map((p) => p.categoria.nombre)),
  ];

  const productosFiltrados =
    categoriaActiva === "Todos"
      ? productos
      : productos.filter((p) => p.categoria.nombre === categoriaActiva);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-4 p-4">
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {categorias.map((c) => (
            <Button
              key={c}
              variant={categoriaActiva === c ? "default" : "outline"}
              size="sm"
              onClick={() => setCategoriaActiva(c)}
            >
              {c}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
          {productosFiltrados.map((p) => (
            <Card
              key={p.id}
              className="cursor-pointer hover:border-primary transition-colors"
              onClick={() => agregar(p)}
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-sm leading-tight">
                  {p.nombre}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold">${p.precio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Card className="w-full h-fit sticky top-20">
        <CardHeader>
          <CardTitle>Venta actual</CardTitle>
          <CardAction>
            <AlertDialog>
              <AlertDialogTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon"
                    disabled={carrito.length === 0}
                  >
                    <Trash2Icon />
                  </Button>
                }
              />
              <AlertDialogContent>
                <AlertDialogHeader>
                  <div className="flex items-center gap-3">
                    <Trash2Icon className="size-5 text-destructive" />
                    <AlertDialogTitle>¿Cancelar la venta?</AlertDialogTitle>
                  </div>
                  <AlertDialogDescription>
                    Se quitarán todos los productos del ticket actual.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Volver</AlertDialogCancel>
                  <AlertDialogAction onClick={cancelarVenta}>
                    Sí, cancelar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardAction>
        </CardHeader>

        <CardContent>
          {aviso && (
            <Alert className="mb-3">
              <CheckCircle2Icon />
              <AlertTitle>{aviso}</AlertTitle>
              <AlertDescription>
                <Button
                  variant="link"
                  size="sm"
                  className="px-0"
                  onClick={() => setAviso(null)}
                >
                  Cerrar
                </Button>
              </AlertDescription>
            </Alert>
          )}

          {carrito.length === 0 ? (
            <p className="text-sm text-muted-foreground py-8 text-center">
              Selecciona productos para iniciar la venta
            </p>
          ) : (
            <ScrollArea className="max-h-[320px] pr-3">
              <ItemGroup className="gap-2">
                {carrito.map((item) => (
                  <Item key={item.id} variant="muted">
                    <ItemMedia variant="image">
                      <div className="size-10 rounded-sm bg-muted-foreground/10" />
                    </ItemMedia>

                    <ItemContent>
                      <ItemTitle className="line-clamp-1">
                        {item.nombre}
                      </ItemTitle>
                      <ItemDescription>${item.precio} c/u</ItemDescription>
                    </ItemContent>

                    <ItemActions>
                      <Button size="icon" variant="outline" className="size-7" onClick={() => modificarCantidad(item.id, -1)}>
                        <Minus />
                      </Button>
                      <span className="w-3 text-center text-sm">
                        {item.cantidad}
                      </span>
                      <Button size="icon" variant="outline" className="size-7" onClick={() => modificarCantidad(item.id, 1)}>
                        <Plus />
                      </Button>
                    </ItemActions>

                    <ItemContent className="flex-none text-center">
                      <ItemDescription>
                        ${(item.precio * item.cantidad)}
                      </ItemDescription>
                    </ItemContent>
                  
                    <ItemActions>
                      <Button size="icon" variant="destructive" className="size-7" onClick={() => eliminar(item.id)}>
                        <Trash2Icon />
                      </Button>
                    </ItemActions>
                  </Item>
                ))}
              </ItemGroup>
            </ScrollArea>
          )}
        </CardContent>

        <CardFooter className="flex-col items-stretch gap-3">
          <div className="flex justify-between items-baseline">
            <span className="text-sm text-muted-foreground">Total</span>
            <span className="text-2xl font-semibold">${total.toFixed(2)}</span>
          </div>

          <div className="flex gap-2">
            <Button
              className="flex-1"
              size="sm"
              variant={metodoPago === "efectivo" ? "default" : "outline"}
              onClick={() => setMetodoPago("efectivo")}
            >
              Efectivo
            </Button>
            <Button
              className="flex-1"
              size="sm"
              variant={metodoPago === "tarjeta" ? "default" : "outline"}
              onClick={() => setMetodoPago("tarjeta")}
            >
              Tarjeta
            </Button>
          </div>

          <Button
            className="w-full"
            onClick={venta}
            disabled={carrito.length === 0}
          >
            Cobrar
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
