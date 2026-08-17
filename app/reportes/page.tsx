import { calcularRango, obtenerReporte } from "./queries";
import { FiltroFechas } from "./filtro-fechas";
import { Metricas } from "./metricas";
import { TablaProductos } from "./tabla-productos";
import { TopProductos } from "./top-productos";
import { GraficaVentas } from "./grafica-ventas";

export default async function ReportesPage({
  searchParams,
}: {
  searchParams: Promise<{ desde?: string; hasta?: string }>;
}) {
  const { desde, hasta } = await searchParams;
  const { inicio, fin } = calcularRango(desde, hasta);
  const { reporte, metricas } = await obtenerReporte(inicio, fin);

  return (
    <div className="space-y-6 p-4">
      <FiltroFechas
        desde={desde}
        hasta={hasta}
        inicio={inicio}
        fin={fin}
        esDefault={!desde && !hasta}
      />
      <Metricas {...metricas} />
      <TablaProductos reporte={reporte} />
      <TopProductos reporte={reporte} />
      <GraficaVentas reporte={reporte} />
    </div>
  );
}