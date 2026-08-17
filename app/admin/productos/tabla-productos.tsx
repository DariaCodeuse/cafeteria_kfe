"use client";

import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
import { cambiarEstado } from "./actions";
import { ProductoDialog } from "./producto-dialog";
import type { Categoria, Producto } from "@/lib/generated/prisma/client";

type ProductoConCategoria = Producto & { categoria: Categoria };

export function TablaProductos({
  productos,
  categorias,
}: {
  productos: ProductoConCategoria[];
  categorias: Categoria[];
}) {
  async function alternar(p: ProductoConCategoria) {
    await cambiarEstado(p.id, !p.estado);
    toast.success(p.estado ? "Producto desactivado" : "Producto activado");
  }

  return (
    <div className="rounded-lg border">
      <Table className="table-fixed w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[55%]">Producto</TableHead>
            <TableHead className="w-[15%]">Categoría</TableHead>
            <TableHead className="w-[15%] text-right">Precio</TableHead>
            <TableHead className="w-[15%] text-center">
              Disponible en venta
            </TableHead>
            <TableHead className="w-[12%] text-center">Editar</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {productos.map((p) => (
            <TableRow key={p.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  {/* Espacio para la imagen del producto */}
                  <div className="size-10 flex-none rounded-md bg-muted-foreground/10" />

                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{p.nombre}</p>
                    <Tooltip>
                      <TooltipTrigger
                        render={
                          <p className="truncate text-left text-xs text-muted-foreground">
                            {p.descripcion}
                          </p>
                        }
                      />
                      <TooltipContent className="max-w-xs">
                        {p.descripcion}
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              </TableCell>

              <TableCell className="truncate">{p.categoria.nombre}</TableCell>

              <TableCell className="text-right">
                ${p.precio.toFixed(2)}
              </TableCell>

              <TableCell>
                <div className="flex justify-center">
                  <Switch
                    checked={p.estado}
                    onCheckedChange={() => alternar(p)}
                    aria-label={
                      p.estado
                        ? "Quitar del punto de venta"
                        : "Mostrar en el punto de venta"
                    }
                  />
                </div>
              </TableCell>

              <TableCell>
                <div className="flex justify-center">
                  <ProductoDialog categorias={categorias} producto={p} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}