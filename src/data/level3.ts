import type { ConceptLevel } from '../types/concepts'

export const level3: ConceptLevel = {
  id: 'nivel-3',
  number: 3,
  title: 'Modelado para reporting',
  subtitle:
    'Hechos, dimensiones y esquema estrella: el idioma de los reportes gerenciales en Oracle.',
  concepts: [
    {
      id: 'fact-vs-dimension',
      title: 'Tabla de hechos vs tabla de dimensión',
      summary:
        'Los hechos miden lo que pasó (montos, cantidades); las dimensiones explican quién, qué, cuándo y dónde.',
      blocks: [
        {
          type: 'paragraph',
          content:
            'El CFO pide: "ventas por región y trimestre." El número (cuánto se vendió) vive en la tabla de hechos; la región y el trimestre viven en dimensiones. Separar "qué pasó" de "en qué contexto" es el truco del reporting dimensional — y lo que verás en data warehouses Oracle (incluido el esquema SH de demos).',
        },
        {
          type: 'comparison',
          comparison: {
            title: 'Hechos vs dimensiones',
            headerA: 'Tabla de hechos',
            headerB: 'Tabla de dimensión',
            rows: [
              {
                aspect: 'Contenido',
                optionA: 'Transacciones: ventas, pedidos, movimientos de inventario',
                optionB: 'Descriptores: nombre cliente, categoría, mes, región',
              },
              {
                aspect: 'Columnas típicas',
                optionA: 'Claves foráneas + medidas numéricas (monto, cantidad, margen)',
                optionB: 'Clave surrogate + atributos textuales y jerárquicos',
              },
              {
                aspect: 'Volumen',
                optionA: 'Muy grande — crece con cada transacción',
                optionB: 'Relativamente pequeña frente a los hechos',
              },
              {
                aspect: 'Ejemplo ERP / DW',
                optionA: 'fact_ventas: monto, cantidad, costo',
                optionB: 'dim_cliente: nombre, segmento, ciudad',
              },
            ],
          },
        },
        {
          type: 'code',
          code: {
            title: 'Ejemplo simplificado',
            sql: `-- HECHOS: cada fila = una línea de venta
CREATE TABLE fact_ventas (
  venta_id      NUMBER PRIMARY KEY,
  cliente_key   NUMBER,    -- FK → dim_cliente
  producto_key  NUMBER,    -- FK → dim_producto
  tiempo_key    NUMBER,    -- FK → dim_tiempo
  cantidad      NUMBER,
  monto         NUMBER(12,2),
  costo         NUMBER(12,2)
);

-- DIMENSIÓN: describe al cliente
CREATE TABLE dim_cliente (
  cliente_key   NUMBER PRIMARY KEY,
  cliente_id    NUMBER,
  nombre        VARCHAR2(100),
  segmento      VARCHAR2(50),
  ciudad        VARCHAR2(50)
);`,
          },
        },
        {
          type: 'list',
          items: [
            'Las medidas en hechos son sumables: SUM(monto), SUM(cantidad), AVG(margen).',
            'Las dimensiones se usan para filtrar y agrupar: GROUP BY segmento, mes.',
            'La clave en dimensiones suele ser surrogate (cliente_key) distinta del ID operacional (cliente_id) para manejar historial.',
            'Un mismo hecho puede unirse a varias dimensiones a la vez (cliente + producto + tiempo + tienda).',
          ],
        },
        {
          type: 'application',
          application: {
            title: 'Cómo se lo dices a un cliente',
            text: '"El hecho es el número de la venta. Las dimensiones son las etiquetas con las que usted corta el reporte: por cliente, por producto, por mes. Si mezclamos todo en una sola tabla operativa, cada dashboard tarda y se vuelve frágil."',
          },
        },
        {
          type: 'note',
          content:
            'En GenO Comercial este vocabulario abre conversaciones de Analytics / BI: no necesitas diseñar el DW, sí distinguir hecho de dimensión en una demo SH.',
        },
      ],
    },
    {
      id: 'estrella-vs-copo',
      title: 'Esquema estrella vs copo de nieve',
      summary:
        'Estrella: hechos en el centro y dimensiones planas. Copo: dimensiones normalizadas en subtablas.',
      blocks: [
        {
          type: 'paragraph',
          content:
            'Cuando el equipo de BI propone "iremos a un star schema", están eligiendo velocidad y simplicidad de consulta: la tabla de hechos en el centro, dimensiones desnormalizadas alrededor. El copo de nieve (snowflake) normaliza esas dimensiones (producto → categoría → familia) a costa de más JOINs. En demos y la mayoría de warehouses ERP, la estrella gana por claridad comercial.',
        },
        { type: 'diagram', diagram: 'star-schema' },
        { type: 'diagram', diagram: 'snowflake-schema' },
        {
          type: 'comparison',
          comparison: {
            title: 'Estrella vs copo de nieve',
            headerA: 'Esquema estrella',
            headerB: 'Esquema copo de nieve',
            rows: [
              {
                aspect: 'Estructura',
                optionA: 'Hechos → dimensiones planas (1 nivel)',
                optionB: 'Hechos → dimensiones → sub-dimensiones',
              },
              {
                aspect: 'Redundancia',
                optionA: 'Mayor — categoría repetida en dim_producto',
                optionB: 'Menor — categoría en tabla aparte',
              },
              {
                aspect: 'Rendimiento de consultas',
                optionA: 'Mejor — menos JOINs',
                optionB: 'Más JOINs, puede ser más lento',
              },
              {
                aspect: 'Mantenimiento',
                optionA: 'Actualizar categoría toca muchas filas',
                optionB: 'Actualizar categoría en un solo lugar',
              },
              {
                aspect: 'Uso típico',
                optionA: 'Data warehouses, BI, reportes analíticos',
                optionB: 'Jerarquías profundas que cambian poco',
              },
            ],
          },
        },
        {
          type: 'code',
          code: {
            title: 'Consulta sobre esquema estrella',
            sql: `-- Ventas por categoría (estrella: pocos JOINs)
SELECT dp.categoria,
       SUM(fv.monto) AS total_ventas
FROM   fact_ventas fv
JOIN   dim_producto dp ON dp.producto_key = fv.producto_key
JOIN   dim_tiempo dt   ON dt.tiempo_key   = fv.tiempo_key
WHERE  dt.anio = 2025
GROUP BY dp.categoria;`,
          },
        },
        {
          type: 'application',
          application: {
            title: 'En una reunión comercial',
            text: '"La mayoría de ERPs analíticos usan estrella porque el reporte gerencial queda con 3–4 JOINs, no con 12. Copo de nieve aparece cuando el catálogo tiene jerarquías muy profundas y el cliente prioriza mantener una sola definición de categoría."',
          },
        },
      ],
    },
    {
      id: 'erp-modelo-dimensional',
      title: 'Por qué un ERP usa este modelo',
      summary:
        'OLTP registra la venta ahora; el modelo dimensional responde "¿cuánto vendimos por región en Q1?" sin castigar el operativo.',
      blocks: [
        {
          type: 'paragraph',
          content:
            'El ERP del día a día (OLTP) está optimizado para insertar pedidos y actualizar stock: muchas tablas normalizadas, operaciones pequeñas y frecuentes. El reporte gerencial necesita lo contrario: leer historia, sumar y cortar por varios ejes. El modelo dimensional resuelve esa tensión: se extraen datos del ERP (ETL), se cargan en hechos + dimensiones, y los dashboards dejan de pelearse con el sistema operativo.',
        },
        {
          type: 'list',
          items: [
            'OLTP responde: "registrar esta venta ahora" — pocas filas, alta concurrencia.',
            'OLAP/BI responde: "¿cuánto vendimos por región en Q1?" — millones de filas, agregaciones.',
            'El data warehouse alimenta dashboards sin bloquear cajas ni facturación.',
            'Las dimensiones desnormalizadas evitan 10 JOINs en cada reporte gerencial.',
            'Esquemas como SH en demos Oracle ilustran exactamente este patrón estrella.',
          ],
        },
        {
          type: 'paragraph',
          content:
            'Metáfora útil en cliente: el recibo del supermercado. Cada línea del ticket es un hecho (producto, cantidad, precio). Las dimensiones son las etiquetas de contexto — fecha, tienda, cliente fidelizado, categoría. Sin esa separación, cada informe tendría que reconstruir el contexto desde docenas de tablas operacionales.',
        },
        {
          type: 'comparison',
          comparison: {
            title: 'Operativo vs analítico',
            headerA: 'ERP operativo (OLTP / CO)',
            headerB: 'Reporting dimensional (OLAP / SH)',
            rows: [
              {
                aspect: 'Pregunta típica',
                optionA: '¿Puedo facturar este pedido ahora?',
                optionB: '¿Cómo van las ventas por región y trimestre?',
              },
              {
                aspect: 'Diseño',
                optionA: 'Normalizado, muchas FKs',
                optionB: 'Estrella / desnormalizado a propósito',
              },
              {
                aspect: 'Prioridad',
                optionA: 'Integridad y concurrencia',
                optionB: 'Velocidad de agregación y claridad de ejes',
              },
              {
                aspect: 'Riesgo si se mezclan',
                optionA: 'Reportes pesados frenan el operativo',
                optionB: 'Sin DW, el cliente improvisa Excels paralelos',
              },
            ],
          },
        },
        {
          type: 'application',
          application: {
            title: 'Por qué un vendedor Oracle lo necesita',
            text: 'En cierre de mes, Finanzas pide ventas netas por sucursal, categoría y vendedor. En OLTP recorrerías pedidos → detalle → producto → categoría → sucursal → empleado. En estrella, un SELECT sobre fact_ventas con 3–4 JOINs a dimensiones responde sobre historia. Esa historia es la justificación comercial de Analytics / Autonomous Data Warehouse junto al ERP.',
          },
        },
        {
          type: 'note',
          content:
            'Frase útil con técnicos: "no vamos a reportar directo sobre el OLTP; vamos a un modelo dimensional." Demuestra que entiendes el porqué del DW sin diseñar el ETL.',
        },
      ],
    },
  ],
}
