import { obtenerProductos, obtenerCategorias } from "./queries";
import { TablaProductos } from "./tabla-productos";
import { ProductoDialog } from "./producto-dialog";

export default async function ProductosPage() {
  const [productos, categorias] = await Promise.all([
    obtenerProductos(),
    obtenerCategorias(),
  ]);

  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-medium">Catálogo</h2>
          <p className="text-sm text-muted-foreground">
            {productos.length} productos registrados
          </p>
        </div>
        <ProductoDialog categorias={categorias} />
      </div>

      <TablaProductos productos={productos} categorias={categorias} />
    </div>
  );
}