# Cafetería KFE

Sistema de punto de venta y administración para la cafetería KFE.

Prueba técnica para el Departamento de Sistemas de Grupo Prosur.

## Qué hace

**Punto de venta.** El cajero arma el ticket seleccionando productos del catálogo, ajusta cantidades, elige método de pago y cobra. Cada venta se guarda con su desglose.

**Administración.** Alta y edición de productos, categorías y personal. Control de qué productos se ofrecen al público.

**Módulo gerencial.** Productos vendidos en un rango de fechas, los tres más vendidos y una gráfica de ingresos por producto.

## Decisiones de diseño

**Los productos no se eliminan, se desactivan.** Un producto retirado del menú sigue apareciendo en las ventas históricas. Borrarlo rompería los reportes de meses anteriores.

**Cada venta guarda el precio con el que se cobró.** El precio vive en el detalle de la venta, no se lee del catálogo al generar reportes. Si sube el precio del café, las ventas anteriores conservan lo que realmente se cobró.

**La venta y su detalle se guardan en una transacción.** O queda el ticket completo o no queda nada.

**El precio se toma de la base de datos, no del navegador.** Al cobrar, el servidor consulta el precio real de cada producto.

**Categorías y empleados con registros asociados no se pueden borrar.** Una categoría con productos o un empleado con ventas quedan protegidos.

## Tecnologías

Next.js (App Router), TypeScript, Prisma 7 con SQLite, Tailwind CSS, shadcn/ui y Recharts.

Se eligió SQLite para que el proyecto se levante sin configurar un servidor de base de datos ni crear cuentas externas. Con Prisma, migrar a PostgreSQL requiere cambiar el proveedor en el esquema.

## Instalación

Requiere Node.js 20 o superior.

**Windows (PowerShell)**

```powershell
npm install
Copy-Item .env.example .env
npx prisma migrate dev
npx prisma db seed
npm run dev
```

**Linux y macOS**

```bash
npm install
cp .env.example .env
npx prisma migrate dev
npx prisma db seed
npm run dev
```

Abrir http://localhost:3000

## Datos de prueba

El seed carga 6 categorías, 33 productos, 5 empleados y 50 ventas repartidas en los últimos 60 días, dentro del horario de la cafetería y asignadas al turno correspondiente.

Las fechas son relativas al día en que se ejecuta, así que el módulo gerencial siempre muestra información reciente. El seed limpia la base antes de cargar, por lo que puede ejecutarse las veces que sea necesario.

## Rutas

| Ruta | Módulo |
|---|---|
| `/pos` | Punto de venta |
| `/admin/productos` | Productos |
| `/admin/categorias` | Categorías |
| `/admin/empleados` | Personal |
| `/reportes` | Módulo gerencial |

La raíz redirige al punto de venta.

## Estructura

```
app/
  pos/                  Punto de venta
    page.tsx            Consulta los productos activos
    actions.ts          Registra la venta
    use-carrito.ts      Lógica del carrito
    producto-grid.tsx   Catálogo por categorías
    ticket-venta.tsx    Ticket en curso
  admin/                Productos, categorías y personal
  reportes/             Consultas en queries.ts, resto presentación
components/ui/          Componentes de shadcn/ui
lib/prisma.ts           Cliente de Prisma
prisma/                 Esquema, migraciones y seed
```

Cada módulo separa las consultas y la lógica de los componentes que las muestran.

## Modelo de datos

**Categoría.** Agrupa los productos del menú.

**Producto.** Nombre, descripción, precio actual, disponibilidad y categoría.

**Empleado.** Nombre completo y rol (cajero o gerente).

**Venta.** Encabezado del ticket: fecha, total, método de pago y empleado.

**Detalle de venta.** Un renglón por producto, con cantidad y precio unitario del momento de la compra.

## Pendientes

- Autenticación y control de acceso por rol. El modelo ya contempla el rol del empleado y cada venta registra quién la hizo; falta la pantalla de acceso y el filtro de rutas.
- Carga de imágenes de productos. El formulario acepta una URL; falta el almacenamiento de archivos.
- Historial de tickets individuales.
- Impresión de ticket.