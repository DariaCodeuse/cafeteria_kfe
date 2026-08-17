import { obtenerCategorias } from "./queries";
import { GridCategorias } from "./grid-categorias";
import { CategoriaDialog } from "./categoria-dialog";

export default async function CategoriasPage() {
  const categorias = await obtenerCategorias();

  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-medium">Categorías</h2>
          <p className="text-sm text-muted-foreground">
            {categorias.length} categorías registradas
          </p>
        </div>
        <CategoriaDialog />
      </div>

      <GridCategorias categorias={categorias} />
    </div>
  );
}