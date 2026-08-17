"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2Icon } from "lucide-react";
import { toast } from "sonner";
import { eliminarEmpleado } from "./actions";
import { EmpleadoDialog } from "./empleado-dialog";
import type { Empleado } from "@/lib/generated/prisma/client";

type EmpleadoConConteo = Empleado & { _count: { venta: number } };

export function TablaEmpleados({
  empleados,
}: {
  empleados: EmpleadoConConteo[];
}) {
  async function borrar(e: EmpleadoConConteo) {
    const resultado = await eliminarEmpleado(e.id);

    if (resultado.error) {
      toast.error(resultado.error);
    } else {
      toast.success("Empleado eliminado");
    }
  }

  return (
    <div className="rounded-lg border">
      <Table className="table-fixed w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[45%]">Empleado</TableHead>
            <TableHead className="w-[20%]">Rol</TableHead>
            <TableHead className="w-[15%] text-center">Ventas</TableHead>
            <TableHead className="w-[20%] text-center">Modificar</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {empleados.map((e) => (
            <TableRow key={e.id}>
              <TableCell className="truncate font-medium">
                {e.nombre} {e.ap_paterno} {e.ap_materno}
              </TableCell>

              <TableCell>
                <Badge variant={e.rol === "Gerente" ? "default" : "secondary"}>
                  {e.rol}
                </Badge>
              </TableCell>

              <TableCell className="text-center">{e._count.venta}</TableCell>

              <TableCell>
                <div className="flex items-center justify-center gap-1">
                  <EmpleadoDialog empleado={e} />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8"
                    disabled={e._count.venta > 0}
                    onClick={() => borrar(e)}
                  >
                    <Trash2Icon />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}