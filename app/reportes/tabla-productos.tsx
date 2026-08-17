import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import type { FilaReporte } from "./queries";

export function TablaProductos({ reporte }: { reporte: FilaReporte[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Productos vendidos en el periodo</CardTitle>
      </CardHeader>
      <CardContent>
        {reporte.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No hay ventas en este rango de fechas.
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Producto</TableHead>
                <TableHead className="text-right">Unidades</TableHead>
                <TableHead className="text-right">Ingreso</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reporte.map((r) => (
                <TableRow key={r.id}>
                  <TableCell>{r.nombre}</TableCell>
                  <TableCell className="text-right">{r.cantidad}</TableCell>
                  <TableCell className="text-right">
                    ${r.ingreso.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}