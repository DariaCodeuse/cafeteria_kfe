/*
  Warnings:

  - You are about to alter the column `estado` on the `Producto` table. The data in that column could be lost. The data in that column will be cast from `String` to `Boolean`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Producto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "precio" REAL NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    "id_categoria" INTEGER NOT NULL,
    CONSTRAINT "Producto_id_categoria_fkey" FOREIGN KEY ("id_categoria") REFERENCES "Categoria" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Producto" ("descripcion", "estado", "id", "id_categoria", "nombre", "precio") SELECT "descripcion", "estado", "id", "id_categoria", "nombre", "precio" FROM "Producto";
DROP TABLE "Producto";
ALTER TABLE "new_Producto" RENAME TO "Producto";
CREATE TABLE "new_Venta" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fecha" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "total" REAL NOT NULL,
    "metodo_pago" TEXT NOT NULL,
    "id_empleado" INTEGER NOT NULL,
    CONSTRAINT "Venta_id_empleado_fkey" FOREIGN KEY ("id_empleado") REFERENCES "Empleado" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Venta" ("fecha", "id", "id_empleado", "metodo_pago", "total") SELECT "fecha", "id", "id_empleado", "metodo_pago", "total" FROM "Venta";
DROP TABLE "Venta";
ALTER TABLE "new_Venta" RENAME TO "Venta";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
