import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Metricas({
  totalVendido, tickets, promedio, totalUnidades,
}: {
  totalVendido: number; tickets: number; promedio: number; totalUnidades: number;
}) {
  const datos = [
    { label: "Ventas totales", valor: `$${totalVendido.toFixed(2)}` },
    { label: "Tickets", valor: tickets },
    { label: "Ticket promedio", valor: `$${promedio.toFixed(2)}` },
    { label: "Unidades vendidas", valor: totalUnidades },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {datos.map((d) => (
        <Card key={d.label}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-normal text-muted-foreground">
              {d.label}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{d.valor}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}