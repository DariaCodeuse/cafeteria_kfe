import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const formato = new Intl.DateTimeFormat("es-MX", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

export function FiltroFechas({
  desde,
  hasta,
  inicio,
  fin,
  esDefault,
}: {
  desde?: string;
  hasta?: string;
  inicio: Date;
  fin: Date;
  esDefault: boolean;
}) {
  return (
    <div className="space-y-3">
      <form method="get" className="flex flex-wrap items-end gap-3">
        <div className="grid gap-1.5">
          <Label htmlFor="desde">Desde</Label>
          <Input id="desde" type="date" name="desde" defaultValue={desde} />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="hasta">Hasta</Label>
          <Input id="hasta" type="date" name="hasta" defaultValue={hasta} />
        </div>
        <Button type="submit">Filtrar</Button>
      </form>

      <div className="flex flex-wrap items-center gap-2 text-sm">
        <span className="text-muted-foreground">Mostrando:</span>
        <Badge variant="secondary">
          {formato.format(inicio)} — {formato.format(fin)}
        </Badge>
        {esDefault && (
          <span className="text-xs text-muted-foreground">
            (últimos 7 días por defecto)
          </span>
        )}
      </div>
    </div>
  );
}