"use client";

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
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Minus, Plus, Trash2Icon } from "lucide-react";
import type { ItemCarrito, MetodoPago } from "./use-carrito";

type Props = {
  carrito: ItemCarrito[];
  total: number;
  metodoPago: MetodoPago;
  setMetodoPago: (metodo: MetodoPago) => void;
  modificarCantidad: (id: number, cantidad: number) => void;
  eliminar: (id: number) => void;
  cancelarVenta: () => void;
  venta: () => void;
};

export function TicketVenta({
  carrito,
  total,
  metodoPago,
  setMetodoPago,
  modificarCantidad,
  eliminar,
  cancelarVenta,
  venta,
}: Props) {
  return (
    <Card className="w-full sticky top-20 flex flex-col h-[calc(100vh-7rem)]">
      <CardHeader>
        <CardTitle>Venta actual</CardTitle>
        <CardAction>
          <Button
            variant="ghost"
            size="sm"
            disabled={carrito.length === 0}
            onClick={cancelarVenta}
          >
            Vaciar
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent className="flex-1 min-h-0 flex flex-col gap-3">
        {carrito.length === 0 ? (
          <p className="text-sm text-muted-foreground py-8 text-center">
            Selecciona productos para iniciar la venta
          </p>
        ) : (
          <ScrollArea className="flex-1 min-h-0 w-full">
            <ItemGroup className="gap-2 w-full pr-3">
              {carrito.map((item) => (
                <Item key={item.id} variant="muted" className="w-full">
                  <ItemMedia variant="image">
                    <div className="size-10 rounded-sm bg-muted-foreground/10" />
                  </ItemMedia>

                  <ItemContent className="min-w-0">
                    <ItemTitle className="line-clamp-1">
                      {item.nombre}
                    </ItemTitle>
                    <ItemDescription>
                      ${item.precio} c/u · $
                      {(item.precio * item.cantidad).toFixed(2)}
                    </ItemDescription>
                  </ItemContent>

                  <ItemActions className="flex-none">
                    <Button size="icon" variant="outline" className="size-7"
                      onClick={() => modificarCantidad(item.id, -1)}>
                      <Minus />
                    </Button>
                    <span className="w-4 text-center text-sm">
                      {item.cantidad}
                    </span>
                    <Button size="icon" variant="outline" className="size-7"
                      onClick={() => modificarCantidad(item.id, 1)}>
                      <Plus />
                    </Button>
                    <Button size="icon" variant="ghost" className="size-7"
                      onClick={() => eliminar(item.id)}>
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
          <Button className="flex-1" size="sm"
            variant={metodoPago === "efectivo" ? "default" : "outline"}
            onClick={() => setMetodoPago("efectivo")}>
            Efectivo
          </Button>
          <Button className="flex-1" size="sm"
            variant={metodoPago === "tarjeta" ? "default" : "outline"}
            onClick={() => setMetodoPago("tarjeta")}>
            Tarjeta
          </Button>
        </div>

        <Button className="w-full" onClick={venta}
          disabled={carrito.length === 0}>
          Cobrar
        </Button>
      </CardFooter>
    </Card>
  );
}