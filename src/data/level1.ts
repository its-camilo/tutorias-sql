import type { ConceptLevel } from '../types/concepts'

export const level1: ConceptLevel = {
  id: 'nivel-1',
  number: 1,
  title: 'Fundamentos de consulta',
  subtitle:
    'Leer y filtrar datos: lo que necesitas para entender un reporte o una demo.',
  concepts: [
    {
      id: 'select-from-where',
      title: 'SELECT, FROM y WHERE',
      summary:
        'Tres preguntas de negocio: qué columnas, de qué tabla y qué filas me interesan.',
      blocks: [
        {
          type: 'paragraph',
          content:
            'En una demo el cliente pide: "Muéstrame los productos activos de Electrónica entre 100 y 500." Eso es exactamente SELECT (qué columnas), FROM (de qué tabla) y WHERE (qué filas). Entender estas tres cláusulas te deja leer cualquier reporte o query que el equipo técnico proyecte en pantalla.',
        },
        { type: 'diagram', diagram: 'query-flow' },
        {
          type: 'list',
          items: [
            'Comparación: =, <>, <, >, <=, >=',
            'LIKE — patrones con % (cualquier secuencia) y _ (un carácter)',
            'IN — la columna está en una lista de valores',
            'BETWEEN — rango inclusivo (precio, fecha)',
            'IS NULL / IS NOT NULL — ausencia de valor (NULL no se compara con =)',
          ],
        },
        {
          type: 'code',
          code: {
            title: 'Consulta básica con filtros',
            sql: `SELECT producto_id, nombre, precio, categoria
FROM   productos
WHERE  categoria IN ('Electrónica', 'Hogar')
  AND  precio BETWEEN 100 AND 500
  AND  nombre LIKE 'Smart%'
  AND  fecha_baja IS NULL;`,
            caption: 'AND = todas las condiciones; OR = al menos una.',
          },
        },
        {
          type: 'application',
          application: {
            title: 'Cómo se lo dices a un cliente',
            text: '"El reporte no inventa datos: elige columnas (SELECT), la fuente (FROM) y el filtro de negocio (WHERE). Si el filtro está mal — por ejemplo, incluye clientes dados de baja — el número del dashboard estará mal aunque la gráfica se vea bonita."',
          },
        },
      ],
    },
    {
      id: 'order-by-rownum',
      title: 'ORDER BY y limitación de filas',
      summary:
        'Ordenar resultados y quedarse con el top N — el patrón de rankings y dashboards.',
      blocks: [
        {
          type: 'paragraph',
          content:
            'El gerente quiere "las 5 sucursales con mayor facturación del mes". Primero ordenas (ORDER BY … DESC) y luego limitas a las primeras filas. En Oracle moderno se usa FETCH FIRST; no necesitas memorizar trucos avanzados de ROWNUM para una conversación comercial.',
        },
        {
          type: 'code',
          code: {
            title: 'Top N con FETCH FIRST',
            sql: `-- Las 5 sucursales con mayor facturación
SELECT sucursal_id, nombre, facturacion
FROM   v_facturacion_mes
ORDER BY facturacion DESC
FETCH FIRST 5 ROWS ONLY;`,
            caption: 'FETCH FIRST (Oracle 12c+) es la forma clara de pedir un top N.',
          },
        },
        {
          type: 'list',
          items: [
            'ORDER BY columna ASC (por defecto) u ORDER BY columna DESC.',
            'Puedes ordenar por varias columnas: ORDER BY region, monto DESC.',
            'FETCH FIRST N ROWS ONLY limita tras ordenar — ideal para rankings.',
          ],
        },
        {
          type: 'application',
          application: {
            title: 'En una reunión comercial',
            text: '"Ese widget de top 5 no es magia: es un ORDER BY por el KPI y un límite de filas. Si el cliente pregunta por qué no ve la sucursal 6, la respuesta es que el dashboard solo pide las primeras cinco."',
          },
        },
      ],
    },
    {
      id: 'funciones-agregacion',
      title: 'Funciones de agregación',
      summary:
        'Convertir miles de filas en un KPI: total, promedio, máximo, conteo.',
      blocks: [
        {
          type: 'paragraph',
          content:
            'Finanzas pide "facturación del trimestre, número de facturas y ticket promedio". Esas tres frases son SUM, COUNT y AVG. Las agregaciones condensan muchas filas en un solo número — la base de casi todo indicador que ves en un ERP.',
        },
        {
          type: 'list',
          items: [
            'COUNT(*) — cuenta filas',
            'SUM(columna) — suma valores numéricos',
            'AVG(columna) — promedio',
            'MAX / MIN — máximo o mínimo (también fechas)',
            'COUNT(DISTINCT columna) — valores únicos (clientes distintos, no compras)',
          ],
        },
        {
          type: 'code',
          code: {
            title: 'Resumen de ventas',
            sql: `SELECT COUNT(*)        AS total_pedidos,
       SUM(monto)        AS facturacion_total,
       AVG(monto)        AS ticket_promedio,
       MAX(fecha_pedido) AS ultimo_pedido
FROM   pedidos
WHERE  fecha_pedido >= DATE '2025-01-01';`,
          },
        },
        {
          type: 'application',
          application: {
            title: 'Por qué un vendedor Oracle lo necesita',
            text: 'Cuando el cliente señala un KPI en la demo, puedes nombrarlo: "eso es un SUM filtrado por trimestre". Hablar el idioma del indicador te acerca al equipo de BI y al sponsor de negocio.',
          },
        },
      ],
    },
    {
      id: 'group-by-having',
      title: 'GROUP BY y WHERE vs HAVING',
      summary:
        'Totales por grupo (por cliente, región, mes) y filtrar grupos, no solo filas sueltas.',
      blocks: [
        {
          type: 'paragraph',
          content:
            'El cliente no quiere un solo total: quiere "ventas por región" o "clientes con más de 50.000 en compras". GROUP BY parte el resultado en grupos; HAVING filtra esos grupos (ej. solo quienes superan el umbral). WHERE filtra filas antes de agrupar — fechas, estados, productos activos.',
        },
        { type: 'diagram', diagram: 'where-having' },
        {
          type: 'comparison',
          comparison: {
            title: 'WHERE vs HAVING',
            headerA: 'WHERE',
            headerB: 'HAVING',
            rows: [
              {
                aspect: 'Qué filtra',
                optionA: 'Filas individuales antes de agrupar',
                optionB: 'Grupos ya formados después de GROUP BY',
              },
              {
                aspect: 'Puede usar SUM/COUNT',
                optionA: 'No',
                optionB: 'Sí',
              },
              {
                aspect: 'Ejemplo de negocio',
                optionA: 'Solo pedidos de 2025',
                optionB: 'Solo clientes con total > 50.000',
              },
            ],
          },
        },
        {
          type: 'code',
          code: {
            title: 'Ventas por cliente con umbral',
            sql: `SELECT c.nombre,
       COUNT(p.pedido_id) AS num_pedidos,
       SUM(p.monto)       AS total_comprado
FROM   clientes c
JOIN   pedidos p ON p.cliente_id = c.cliente_id
WHERE  p.fecha_pedido >= DATE '2025-01-01'  -- filtra FILAS
GROUP BY c.nombre
HAVING SUM(p.monto) > 50000                 -- filtra GRUPOS
ORDER BY total_comprado DESC;`,
          },
        },
        {
          type: 'application',
          application: {
            title: 'Cómo se lo dices a un cliente',
            text: '"WHERE recorta el universo (solo este año). GROUP BY parte el resultado (por cliente). HAVING deja solo los grupos que cumplen la regla de negocio (VIP por facturación). Así se construye un ranking, no una lista cruda."',
          },
        },
      ],
    },
  ],
}
