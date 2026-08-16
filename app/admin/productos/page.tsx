import { prisma } from "@/lib/prisma"
import { crearProducto, desactivarProducto } from "./actions"

export default async function ProductosPage() {
  const productos = await prisma.producto.findMany({
    include: { categoria: true },
  })

  const categorias = await prisma.categoria.findMany()
  

  return (
    <div>
      <h1>Productos</h1>
      <div className="mb-4 border-b pb-4">
        <h2>Crear Producto</h2>
        <form action={crearProducto}>
          <input name="nombre" placeholder="Nombre" required />
          <input name="descripcion" placeholder="Descripción" />
          <input name="precio" type="number" required />
          <select name="id_categoria">
            {categorias.map((c) => (
              <option key={c.id} value={c.id}>{c.nombre}</option>
            ))}
          </select>
          <button type="submit">Guardar</button>
        </form>
      </div>

      <div>
        <h2>Desactivar Producto</h2>
        {productos.map((p) => (
          <li key={p.id}>
            {p.nombre} — ${p.precio}
            <form action={desactivarProducto}>
              <input type="hidden" name="id" value={p.id} />
              <button type="submit">Desactivar</button>
            </form>
          </li>
        ))}
      </div>
      
      <div>
        <h2>Lista de Productos</h2>
        <ul>
          {productos.map((p) => (
            <li key={p.id}>
              {p.nombre} — ${p.precio} — {p.categoria.nombre} - {p.estado ? "Activo" : "Inactivo"}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}