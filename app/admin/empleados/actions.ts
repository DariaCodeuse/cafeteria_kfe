"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function crearEmpleado(formData: FormData) {
  await prisma.empleado.create({
    data: {
      nombre: String(formData.get("nombre")),
      ap_paterno: String(formData.get("ap_paterno")),
      ap_materno: String(formData.get("ap_materno")),
      rol: String(formData.get("rol")),
    },
  });

  revalidatePath("/admin/empleados");
}

export async function actualizarEmpleado(formData: FormData) {
  await prisma.empleado.update({
    where: { id: Number(formData.get("id")) },
    data: {
      nombre: String(formData.get("nombre")),
      ap_paterno: String(formData.get("ap_paterno")),
      ap_materno: String(formData.get("ap_materno")),
      rol: String(formData.get("rol")),
    },
  });

  revalidatePath("/admin/empleados");
}

export async function eliminarEmpleado(id: number) {
  const ventas = await prisma.venta.count({ where: { id_empleado: id } });

  if (ventas > 0) {
    return {
      error: "No se puede eliminar: tiene ventas registradas",
    };
  }

  await prisma.empleado.delete({ where: { id } });

  revalidatePath("/admin/empleados");
  return { error: null };
}