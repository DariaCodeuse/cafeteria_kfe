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
import { Textarea } from "@/components/ui/textarea";
import { PencilIcon, PlusIcon } from "lucide-react";
import { toast } from "sonner";
import { crearProducto, actualizarProducto } from "./actions";
import type { Categoria, Producto } from "@/lib/generated/prisma/client";

type Props = {
  categorias: Categoria[];
  producto?: Producto;
};

export function ProductoDialog({ categorias, producto }: Props) {
  const [abierto, setAbierto] = useState(false);
  const [pendiente, startTransition] = useTransition();
  const editando = Boolean(producto);

  function onSubmit(formData: FormData) {
    startTransition(async () => {
      if (editando) {
        await actualizarProducto(formData);
        toast.success("Producto actualizado");
      } else {
        await crearProducto(formData);
        toast.success("Producto creado");
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
              Nuevo producto
            </Button>
          )
        }
      />

      <DialogContent>
        <form action={onSubmit}>
          <DialogHeader>
            <DialogTitle>
              {editando ? "Editar producto" : "Nuevo producto"}
            </DialogTitle>
            <DialogDescription>
              Los cambios se reflejan de inmediato en el punto de venta.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup className="py-4">
            {editando && <input type="hidden" name="id" value={producto!.id} />}

            <Field>
              <FieldLabel htmlFor="nombre">Nombre</FieldLabel>
              <Input
                id="nombre"
                name="nombre"
                defaultValue={producto?.nombre}
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="descripcion">Descripción</FieldLabel>
              <Textarea
                id="descripcion"
                name="descripcion"
                rows={4}
                defaultValue={producto?.descripcion ?? ""}
                placeholder="Cómo se prepara o qué lleva el producto"
              />
              <FieldDescription>
                Aparece en el catálogo del punto de venta.
              </FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="precio">Precio</FieldLabel>
              <Input
                id="precio"
                name="precio"
                type="number"
                step="0.01"
                min="0"
                defaultValue={producto?.precio}
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="id_categoria">Categoría</FieldLabel>
              <select
                id="id_categoria"
                name="id_categoria"
                defaultValue={producto?.id_categoria}
                className="border-input h-9 w-full rounded-md border bg-transparent px-3 text-sm shadow-xs"
                required
              >
                {categorias.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nombre}
                  </option>
                ))}
              </select>
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