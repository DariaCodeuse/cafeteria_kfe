"use client";

import { Bar, BarChart, XAxis, YAxis, LabelList } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent,
} from "@/components/ui/chart";
import type { FilaReporte } from "./queries";

const config = {
  ingreso: { label: "Ingreso", color: "var(--chart-1)" },
} satisfies ChartConfig;

export function GraficaVentas({ reporte }: { reporte: FilaReporte[] }) {
  const datos = [...reporte]
    .sort((a, b) => b.ingreso - a.ingreso)
    .slice(0, 10);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gráfica de ventas por producto</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config} className="h-[400px] w-full">
          <BarChart data={datos} layout="vertical" margin={{ left: 20 }}>
            <XAxis type="number" dataKey="ingreso" hide />
            <YAxis
              type="category"
              dataKey="nombre"
              width={130}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12 }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value) => `$${Number(value).toFixed(2)}`}
                />
              }
            />
            <Bar dataKey="ingreso" fill="var(--color-ingreso)" radius={4}>
              <LabelList
                dataKey="ingreso"
                position="right"
                className="fill-foreground"
                fontSize={12}
                formatter={(v: number) => `$${v.toFixed(2)}`}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}