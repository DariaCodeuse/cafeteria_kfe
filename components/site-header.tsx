"use client"

import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"

const titulos: Record<string, string> = {
  "/pos": "Punto de venta",
  "/admin/productos": "Productos",
  "/reportes": "Módulo gerencial",
}

export function SiteHeader() {
  const pathname = usePathname()
  const titulo = titulos[pathname] ?? "Cafetería KFE"

  return (
    <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-background">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 h-4 data-vertical:self-auto"
        />
        <h1 className="text-base font-medium">{titulo}</h1>
      </div>
    </header>
  )
}