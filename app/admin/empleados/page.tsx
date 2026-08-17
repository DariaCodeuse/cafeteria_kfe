import { obtenerEmpleados } from "./queries";
import { TablaEmpleados } from "./tabla-empleados";
import { EmpleadoDialog } from "./empleado-dialog";

export default async function EmpleadosPage() {
  const empleados = await obtenerEmpleados();

  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-medium">Personal</h2>
          <p className="text-sm text-muted-foreground">
            {empleados.length} empleados registrados
          </p>
        </div>
        <EmpleadoDialog />
      </div>

      <TablaEmpleados empleados={empleados} />
    </div>
  );
}