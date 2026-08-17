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
import { crearEmpleado, actualizarEmpleado } from "./actions";
import type { Empleado } from "@/lib/generated/prisma/client";

export function EmpleadoDialog({ empleado }: { empleado?: Empleado }) {
  const [abierto, setAbierto] = useState(false);
  const [pendiente, startTransition] = useTransition();
  const editando = Boolean(empleado);

  function onSubmit(formData: FormData) {
    startTransition(async () => {
      if (editando) {
        await actualizarEmpleado(formData);
        toast.success("Empleado actualizado");
      } else {
        await crearEmpleado(formData);
        toast.success("Empleado registrado");
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
              Nuevo empleado
            </Button>
          )
        }
      />

      <DialogContent>
        <form action={onSubmit}>
          <DialogHeader>
            <DialogTitle>
              {editando ? "Editar empleado" : "Nuevo empleado"}
            </DialogTitle>
            <DialogDescription>
              El rol define a qué módulos tiene acceso.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup className="py-4">
            {editando && <input type="hidden" name="id" value={empleado!.id} />}

            <Field>
              <FieldLabel htmlFor="nombre">Nombre</FieldLabel>
              <Input
                id="nombre"
                name="nombre"
                defaultValue={empleado?.nombre}
                required
              />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="ap_paterno">Apellido paterno</FieldLabel>
                <Input
                  id="ap_paterno"
                  name="ap_paterno"
                  defaultValue={empleado?.ap_paterno}
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="ap_materno">Apellido materno</FieldLabel>
                <Input
                  id="ap_materno"
                  name="ap_materno"
                  defaultValue={empleado?.ap_materno}
                  required
                />
              </Field>
            </div>

            <Field>
              <FieldLabel htmlFor="rol">Rol</FieldLabel>
              <select
                id="rol"
                name="rol"
                defaultValue={empleado?.rol ?? "Cajero"}
                className="border-input h-9 w-full rounded-md border bg-transparent px-3 text-sm shadow-xs"
                required
              >
                <option value="Cajero">Cajero</option>
                <option value="Gerente">Gerente</option>
              </select>
              <FieldDescription>
                El cajero solo entra al punto de venta; el gerente administra
                todo.
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