"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ProductoConCategoria } from "./use-carrito";

type Props = {
  categorias: string[];
  categoriaActiva: string;
  setCategoriaActiva: (categoria: string) => void;
  productosFiltrados: ProductoConCategoria[];
  agregar: (producto: ProductoConCategoria) => void;
};

export function ProductoGrid({
  categorias,
  categoriaActiva,
  setCategoriaActiva,
  productosFiltrados,
  agregar,
}: Props) {
  return (
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
              <CardTitle className="text-sm leading-tight">{p.nombre}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold">${p.precio}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}