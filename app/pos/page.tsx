import { prisma } from "@/lib/prisma"
import PosClient from "./pos-client"

export default async function PosPage() {
  const productos = await prisma.producto.findMany({
    where: { estado: true },
    include: { categoria: true },
  })

  return <PosClient productos={productos} />
}