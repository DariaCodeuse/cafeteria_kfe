import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { FilaReporte } from "./queries";

export function TopProductos({ reporte }: { reporte: FilaReporte[] }) {
  const top = reporte.slice(0, 3);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Los 3 más vendidos</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3 sm:grid-cols-3">
        {top.map((r, i) => (
          <div key={r.id} className="flex items-center gap-3 rounded-lg border p-3">
            <span className="flex size-6 flex-none items-center justify-center rounded-full bg-primary/10 text-xs font-medium">
              {i + 1}
            </span>
            {/* Espacio para la imagen del producto */}
            <div className="size-12 flex-none rounded-md bg-muted-foreground/10" />
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{r.nombre}</p>
              <p className="text-xs text-muted-foreground">
                {r.cantidad} unidades · ${r.ingreso.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}