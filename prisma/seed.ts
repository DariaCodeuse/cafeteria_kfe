import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../lib/generated/prisma/client";

const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  // Delete all existing records from the tables
  await prisma.detalleVenta.deleteMany();
  await prisma.venta.deleteMany();
  await prisma.producto.deleteMany();
  await prisma.categoria.deleteMany();
  await prisma.empleado.deleteMany();

  const bebidasFrias = await prisma.categoria.create({ data: { nombre: "Bebidas Frías" } })
  const bebidasCalientes = await prisma.categoria.create({ data: { nombre: "Bebidas Calientes" } })
  const desayunos = await prisma.categoria.create({ data: { nombre: "Desayunos" } })
  const snacks = await prisma.categoria.create({ data: { nombre: "Snacks" } })
  const panaderia = await prisma.categoria.create({ data: { nombre: "Panaderia" } })
  const postres = await prisma.categoria.create({ data: { nombre: "Postres" } })

  await prisma.empleado.createMany({
    data: [
      { nombre: "Gabriel", ap_paterno: "Torres", ap_materno: "Molina", rol: "Gerente" },
      { nombre: "Roberto", ap_paterno: "Herrera", ap_materno: "Díaz", rol: "Cajero" },
      { nombre: "José", ap_paterno: "Castro", ap_materno: "Mendoza", rol: "Cajero" },
      { nombre: "Lucía", ap_paterno: "Martínez", ap_materno: "Sánchez", rol: "Cajero" },
      { nombre: "Laura", ap_paterno: "Vega", ap_materno: "Ramírez", rol: "Cajero" },
    ]
  })

  await prisma.producto.createMany({
    data: [
      // Bebidas Frías
      { nombre: "Frappé Moca", descripcion: "Frappé de café y chocolate con una textura cremosa y refrescante", precio: 72, id_categoria: bebidasFrias.id },
      { nombre: "Frappé Chocomenta", descripcion: "Frappé de chocolate con un toque refrescante de menta", precio: 72, id_categoria: bebidasFrias.id },
      { nombre: "Frappé Cookies and Cream", descripcion: "Frappé cremoso preparado con galletas de chocolate", precio: 77, id_categoria: bebidasFrias.id },
      { nombre: "Frappé Kahlúa", descripcion: "Frappé de café con licor Kahlúa y hielo", precio: 77, id_categoria: bebidasFrias.id },
      { nombre: "Smoothie de Zarzamora y Frambuesa", descripcion: "Bebida fría de zarzamora y frambuesa preparada con fruta", precio: 73, id_categoria: bebidasFrias.id },
      { nombre: "Limonada", descripcion: "Bebida refrescante preparada con jugo de limón y agua", precio: 42, id_categoria: bebidasFrias.id },
      // Bebidas Calientes
      { nombre: "Café Americano", descripcion: "Café negro preparado con espresso y agua caliente", precio: 35, id_categoria: bebidasCalientes.id },
      { nombre: "Café Descafeinado", descripcion: "Café caliente preparado con café descafeinado", precio: 40, id_categoria: bebidasCalientes.id },
      { nombre: "Espresso", descripcion: "Café concentrado de sabor intenso servido en una taza pequeña", precio: 40, id_categoria: bebidasCalientes.id },
      { nombre: "Capuchino", descripcion: "Espresso combinado con leche vaporizada y espuma de leche", precio: 42, id_categoria: bebidasCalientes.id },
      { nombre: "Café Lechero", descripcion: "Café caliente preparado con leche y una mezcla de café intenso", precio: 53, id_categoria: bebidasCalientes.id },
      { nombre: "Chocolate", descripcion: "Bebida caliente de chocolate preparada con leche", precio: 48, id_categoria: bebidasCalientes.id },
      // Desayunos
      { nombre: "Huevos Motuleños", descripcion: "Huevos montados sobre tortillas de maíz con frijoles, bañados en salsa roja, acompañados de jamón, queso amarillo, plátanos, chícharos y crema", precio: 108, id_categoria: desayunos.id },
      { nombre: "Huevos Costeños", descripcion: "Huevos acompañados de camarón seco, plátanos fritos y frijoles con queso Chiapas y papa a la mexicana", precio: 89, id_categoria: desayunos.id },
      { nombre: "Huevos al Gusto", descripcion: "Huevos preparados con jamón, tocino, chorizo o a la mexicana, acompañados de plátanos fritos y frijoles con queso", precio: 80, id_categoria: desayunos.id },
      { nombre: "Omelette", descripcion: "Omelette relleno de queso y jamón, chorizo, tocino o a la mexicana, acompañado de frijoles, plátanos fritos y queso", precio: 99, id_categoria: desayunos.id },
      // Snacks
      { nombre: "Molletes", descripcion: "Pan baguette cubierto de frijoles refritos y queso gouda gratinado, acompañado de pico de gallo", precio: 80, id_categoria: snacks.id },
      { nombre: "Club Sandwich", descripcion: "Pan de caja relleno de jamón de pavo, queso gouda gratinado, tocino, pollo y vegetales, acompañado de papas", precio: 125, id_categoria: snacks.id },
      { nombre: "Sincronizada", descripcion: "Tortilla de harina rellena de queso gouda y jamón de pavo, acompañada de lechuga, aguacate y pico de gallo", precio: 75, id_categoria: snacks.id },
      { nombre: "Tamal de Mole con Pollo", descripcion: "Tamal tradicional chiapaneco de mole acompañado de pollo", precio: 32, id_categoria: snacks.id },
      // Panadería
      { nombre: "Galleta Integral", descripcion: "Galleta horneada preparada con ingredientes integrales", precio: 18, id_categoria: panaderia.id },
      { nombre: "Turrón", descripcion: "Dulce horneado de textura suave y sabor tradicional", precio: 26, id_categoria: panaderia.id },
      { nombre: "Panqué de Naranja", descripcion: "Panqué suave de naranja con aroma cítrico", precio: 20, id_categoria: panaderia.id },
      { nombre: "Empanada de Piña", descripcion: "Empanada horneada rellena de dulce de piña", precio: 16, id_categoria: panaderia.id },
      { nombre: "Concha", descripcion: "Pan dulce tradicional mexicano con cubierta de azúcar", precio: 20, id_categoria: panaderia.id },
      { nombre: "Pay de Queso", descripcion: "Pay cremoso preparado con queso sobre una base de galleta", precio: 60, id_categoria: panaderia.id },
      // Postres
      { nombre: "Flan Napolitano", descripcion: "Flan cremoso tradicional con caramelo", precio: 45, id_categoria: postres.id },
      { nombre: "Tarta de Elote", descripcion: "Tarta suave de elote con un ligero toque de rompope", precio: 65, id_categoria: postres.id },
      { nombre: "Pastel de Zanahoria", descripcion: "Pastel de zanahoria con una textura suave y especias", precio: 65, id_categoria: postres.id },
      { nombre: "Pastel de Mil Hojas", descripcion: "Pastel elaborado con capas de hojaldre y relleno cremoso", precio: 65, id_categoria: postres.id },
      { nombre: "Pastel de Chocolate", descripcion: "Pastel de chocolate de textura suave y sabor intenso", precio: 65, id_categoria: postres.id },
      { nombre: "Pastel de Cheesecake", descripcion: "Pastel cremoso de queso con base de galleta", precio: 65, id_categoria: postres.id },
    ]
  })

  // Ventaas prueba
  const productosCreados = await prisma.producto.findMany();
  const empleados = await prisma.empleado.findMany();
  const cajeros = empleados.filter((e) => e.rol === "Cajero");
  const matutino = cajeros.slice(0, 2);
  const vespertino = cajeros.slice(2);

  function fechaAleatoria() {
    const fecha = new Date();
    fecha.setDate(fecha.getDate() - Math.floor(Math.random() * 60));

    const esDomingo = fecha.getDay() === 0;
    const cierre = esDomingo ? 18 : 21;
    const hora = 8 + Math.floor(Math.random() * (cierre - 8));

    fecha.setHours(hora, Math.floor(Math.random() * 60), 0, 0);
    return fecha;
  }

  for (let i = 0; i < 50; i++) {
    const fecha = fechaAleatoria();
    const turno = fecha.getHours() < 14 ? matutino : vespertino;
    const empleado = turno[Math.floor(Math.random() * turno.length)];
    const cuantos = 1 + Math.floor(Math.random() * 4);
    const detalles = [];

    for (let j = 0; j < cuantos; j++) {
      const producto =
        productosCreados[Math.floor(Math.random() * productosCreados.length)];
      detalles.push({
        id_producto: producto.id,
        cantidad: 1 + Math.floor(Math.random() * 3),
        precio_unitario: producto.precio,
      });
    }

    const total = detalles.reduce(
      (s, d) => s + d.precio_unitario * d.cantidad,
      0,
    );

    await prisma.venta.create({
      data: {
        fecha,
        total,
        metodo_pago: Math.random() > 0.5 ? "efectivo" : "tarjeta",
        id_empleado: empleado.id,
        detalle_venta: { create: detalles },
      },
    });
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
