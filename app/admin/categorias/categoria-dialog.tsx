"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { PencilIcon, PlusIcon } from "lucide-react";
import { toast } from "sonner";
import { crearCategoria, actualizarCategoria } from "./actions";
import type { Categoria } from "@/lib/generated/prisma/client";

export function CategoriaDialog({ categoria }: { categoria?: Categoria }) {
  const [abierto, setAbierto] = useState(false);
  const [pendiente, startTransition] = useTransition();
  const editando = Boolean(categoria);

  function onSubmit(formData: FormData) {
    startTransition(async () => {
      if (editando) {
        await actualizarCategoria(formData);
        toast.success("Categoría actualizada");
      } else {
        await crearCategoria(formData);
        toast.success("Categoría creada");
      }
      setAbierto(false);
    });
  }

  return (
    <Dialog open={abierto} onOpenChange={setAbierto}>
      <DialogTrigger
        render={
          editando ? (
            <Button variant="ghost" size="icon" className="size-8">
              <PencilIcon />
            </Button>
          ) : (
            <Button>
              <PlusIcon />
              Nueva categoría
            </Button>
          )
        }
      />

      <DialogContent className="sm:max-w-md">
        <form action={onSubmit}>
          <DialogHeader>
            <DialogTitle>
              {editando ? "Editar categoría" : "Nueva categoría"}
            </DialogTitle>
            <DialogDescription>
              Las categorías agrupan los productos en el punto de venta.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup className="py-4">
            {editando && (
              <input type="hidden" name="id" value={categoria!.id} />
            )}

            <Field>
              <FieldLabel htmlFor="nombre">Nombre</FieldLabel>
              <Input
                id="nombre"
                name="nombre"
                defaultValue={categoria?.nombre}
                placeholder="Bebidas Calientes"
                required
              />
              <FieldDescription>
                Se muestra como filtro en el punto de venta.
              </FieldDescription>
            </Field>
          </FieldGroup>

          <DialogFooter>
            <Button type="submit" disabled={pendiente}>
              {pendiente ? "Guardando..." : "Guardar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}