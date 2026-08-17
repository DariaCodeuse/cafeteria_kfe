"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Trash2Icon } from "lucide-react";
import { toast } from "sonner";
import { eliminarCategoria } from "./actions";
import { CategoriaDialog } from "./categoria-dialog";
import type { Categoria } from "@/lib/generated/prisma/client";

type CategoriaConConteo = Categoria & { _count: { producto: number } };

export function GridCategorias({
  categorias,
}: {
  categorias: CategoriaConConteo[];
}) {
  async function borrar(c: CategoriaConConteo) {
    const resultado = await eliminarCategoria(c.id);

    if (resultado.error) {
      toast.error(resultado.error);
    } else {
      toast.success("Categoría eliminada");
    }
  }

  if (categorias.length === 0) {
    return (
      <p className="rounded-lg border p-8 text-center text-sm text-muted-foreground">
        Todavía no hay categorías registradas.
      </p>
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {categorias.map((c) => (
        <Card key={c.id}>
          <CardHeader>
            <CardTitle className="truncate">{c.nombre}</CardTitle>
            <CardAction>
              <div className="flex items-center gap-1">
                <CategoriaDialog categoria={c} />
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8"
                  disabled={c._count.producto > 0}
                  onClick={() => borrar(c)}
                >
                  <Trash2Icon />
                </Button>
              </div>
            </CardAction>
          </CardHeader>

          <CardContent>
            <Badge variant="secondary">
              {c._count.producto}{" "}
              {c._count.producto === 1 ? "producto" : "productos"}
            </Badge>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}