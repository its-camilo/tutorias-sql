import type { ConceptLevel } from '../types/concepts'

export const level3: ConceptLevel = {
  id: 'nivel-3',
  number: 3,
  title: 'Modelado para reporting',
  subtitle: 'Diseño dimensional para reportes rápidos en ERP — la clave para entender data warehouses.',
  concepts: [
    {
      id: 'fact-vs-dimension',
      title: 'Tabla de hechos vs tabla de dimensión',
      summary: 'Los hechos registran transacciones medibles; las dimensiones describen el contexto de quién, qué, cuándo y dónde.',
      blocks: [
        {
          type: 'paragraph',
          content:
            'En el modelado dimensional, separas dos tipos de tablas. La tabla de hechos (fact table) almacena eventos de negocio medibles: ventas, cantidades, montos, costos. Cada fila es una transacción o un evento. Las tablas de dimensión (dimension tables) guardan atributos descriptivos que responden preguntas de contexto: ¿quién compró? (cliente), ¿qué producto? (producto), ¿cuándo? (fecha), ¿dónde? (región, tienda).',
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
                optionB: 'Descriptores: nombre cliente, categoría producto, mes, región',
              },
              {
                aspect: 'Columnas típicas',
                optionA: 'Claves foráneas + medidas numéricas (monto, cantidad, margen)',
                optionB: 'Clave surrogate + atributos textuales y jerárquicos',
              },
              {
                aspect: 'Volumen',
                optionA: 'Muy grande — crece con cada transacción',
                optionB: 'Relativamente pequeña — miles o millones, no miles de millones',
              },
              {
                aspect: 'Ejemplo ERP',
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
            sql: `-- Tabla de HECHOS: cada fila = una línea de venta
CREATE TABLE fact_ventas (
  venta_id      NUMBER PRIMARY KEY,
  cliente_key   NUMBER,    -- FK → dim_cliente
  producto_key  NUMBER,    -- FK → dim_producto
  tiempo_key    NUMBER,    -- FK → dim_tiempo
  cantidad      NUMBER,
  monto         NUMBER(12,2),
  costo         NUMBER(12,2)
);

-- Tabla de DIMENSIÓN: describe al cliente
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
          ],
        },
        {
          type: 'application',
          application: {
            title: 'Reporte "ventas por región y trimestre"',
            text: 'Consultas fact_ventas (SUM de monto) y hace JOIN a dim_cliente (región) y dim_tiempo (trimestre). Los hechos aportan el número; las dimensiones aportan el contexto para cortar el reporte.',
          },
        },
      ],
    },
    {
      id: 'estrella-vs-copo',
      title: 'Esquema estrella vs copo de nieve',
      summary: 'Estrella conecta hechos directo a dimensiones planas; copo de nieve normaliza dimensiones en subtablas.',
      blocks: [
        {
          type: 'paragraph',
          content:
            'El esquema estrella (star schema) coloca la tabla de hechos en el centro conectada directamente a dimensiones desnormalizadas — cada dimensión es una sola tabla con todos sus atributos. El esquema copo de nieve (snowflake schema) normaliza las dimensiones: si producto pertenece a categoría y categoría a familia, creas subtablas separadas unidas por FKs, formando una estructura ramificada.',
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
                optionA: 'Mayor — categoría repetida en cada fila de dim_producto',
                optionB: 'Menor — categoría en tabla aparte',
              },
              {
                aspect: 'Rendimiento de consultas',
                optionA: 'Mejor — menos JOINs',
                optionB: 'Más JOINs, puede ser más lento',
              },
              {
                aspect: 'Mantenimiento',
                optionA: 'Actualizar categoría implica tocar muchas filas',
                optionB: 'Actualizar categoría en un solo lugar',
              },
              {
                aspect: 'Uso típico',
                optionA: 'Data warehouses, BI, reportes analíticos',
                optionB: 'Cuando dimensiones son muy jerárquicas y cambian poco',
              },
            ],
          },
        },
        {
          type: 'code',
          code: {
            title: 'Consulta sobre esquema estrella',
            sql: `-- Ventas por categoría de producto (estrella: 2 JOINs)
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
            title: 'Elegir diseño en un ERP',
            text: 'La mayoría de ERPs analíticos usan estrella porque los reportes son más simples y rápidos. Copo de nieve aparece cuando el catálogo de productos tiene jerarquías profundas (familia → línea → categoría → SKU) y se quiere evitar redundancia.',
          },
        },
      ],
    },
    {
      id: 'erp-modelo-dimensional',
      title: 'Por qué un ERP usa este modelo',
      summary: 'Separar "qué pasó" de "quién/qué/cuándo" permite reportes analíticos rápidos sin recalcular todo el OLTP.',
      blocks: [
        {
          type: 'paragraph',
          content:
            'Un ERP transaccional (OLTP) está optimizado para insertar pedidos, actualizar inventario y facturar en tiempo real — muchas tablas normalizadas, muchas FKs, operaciones pequeñas y frecuentes. Los reportes gerenciales necesitan lo contrario: leer millones de filas históricas, sumar, agrupar y filtrar por múltiples ejes. El modelo dimensional resuelve esa tensión separando claramente la transacción (hecho) de su contexto (dimensiones).',
        },
        {
          type: 'list',
          items: [
            'OLTP responde: "registrar esta venta ahora" — pocas filas, alta concurrencia.',
            'OLAP/BI responde: "¿cuánto vendimos por región en Q1?" — millones de filas, agregaciones.',
            'El data warehouse extrae datos del ERP (ETL), los transforma al modelo estrella y alimenta dashboards.',
            'Las dimensiones desnormalizadas evitan 10 JOINs en cada reporte gerencial.',
          ],
        },
        {
          type: 'paragraph',
          content:
            'Piensa en la metáfora del recibo de supermercado: el hecho es cada línea del ticket (producto, cantidad, precio). Las dimensiones son las etiquetas que explican el contexto — fecha de compra, tienda, cliente fidelizado, categoría del producto. Sin esa separación, cada reporte tendría que reconstruir el contexto desde docenas de tablas operacionales.',
        },
        {
          type: 'code',
          code: {
            title: 'Pregunta típica de examen',
            sql: `-- ¿Cuál es la ventaja del esquema estrella en reporting?
-- Respuesta conceptual (no es SQL ejecutable):
--
-- 1. Consultas más simples (menos JOINs)
-- 2. Agregaciones predecibles sobre tabla de hechos
-- 3. Dimensiones reutilizables para múltiples reportes
-- 4. Separación clara entre medidas y atributos descriptivos`,
          },
        },
        {
          type: 'application',
          application: {
            title: 'Cierre de mes en ERP',
            text: 'Finanzas necesita ventas netas por sucursal, categoría y vendedor. En OLTP recorrerías pedidos → detalle → producto → categoría → sucursal → empleado. En el esquema estrella, un SELECT sobre fact_ventas con 3-4 JOINs a dimensiones responde en segundos sobre datos históricos.',
          },
        },
      ],
    },
  ],
}
