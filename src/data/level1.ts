import type { ConceptLevel } from '../types/concepts'

export const level1: ConceptLevel = {
  id: 'nivel-1',
  number: 1,
  title: 'Fundamentos de consulta',
  subtitle: 'La base de todo reporte: leer datos, filtrarlos, ordenarlos y resumirlos.',
  concepts: [
    {
      id: 'select-from-where',
      title: 'SELECT, FROM y WHERE',
      summary: 'Las tres cláusulas que definen qué columnas quieres, de qué tabla vienen y qué filas conservar.',
      blocks: [
        {
          type: 'paragraph',
          content:
            'Toda consulta SQL empieza respondiendo tres preguntas: ¿qué columnas necesito? (SELECT), ¿de qué tabla? (FROM), ¿qué filas me interesan? (WHERE). El motor lee la tabla indicada en FROM, aplica los filtros de WHERE fila por fila, y finalmente proyecta solo las columnas listadas en SELECT.',
        },
        { type: 'diagram', diagram: 'query-flow' },
        {
          type: 'list',
          items: [
            'Operadores de comparación: =, <>, !=, <, >, <=, >=',
            'LIKE — busca patrones con comodines: % (cualquier secuencia) y _ (un solo carácter)',
            'IN — la columna debe estar dentro de una lista de valores',
            'BETWEEN — rango inclusivo entre dos valores (fecha, número, texto)',
            'IS NULL / IS NOT NULL — compara ausencia de valor (NULL no se compara con =)',
          ],
        },
        {
          type: 'code',
          code: {
            title: 'Consulta básica con filtros',
            sql: `-- Productos activos cuya categoría es Electrónica o Hogar
-- y cuyo precio está entre 100 y 500
SELECT producto_id, nombre, precio, categoria
FROM   productos
WHERE  categoria IN ('Electrónica', 'Hogar')
  AND  precio BETWEEN 100 AND 500
  AND  nombre LIKE 'Smart%'
  AND  fecha_baja IS NULL;`,
            caption: 'Los filtros se combinan con AND (todas deben cumplirse) u OR (al menos una).',
          },
        },
        {
          type: 'note',
          content:
            'En Oracle, las cadenas son sensibles a mayúsculas/minúsculas según la configuración NLS. Para comparaciones sin distinguir caso usa UPPER(columna) = UPPER(\'valor\') o REGEXP_LIKE.',
        },
        {
          type: 'application',
          application: {
            title: 'Reporte de clientes activos en Bogotá',
            text: 'Un analista de ventas necesita la lista de clientes activos en Bogotá con crédito mayor a cero. Con SELECT elige nombre y email; con FROM apunta a la tabla clientes; con WHERE filtra ciudad, estado activo y límite de crédito.',
          },
        },
      ],
    },
    {
      id: 'order-by-rownum',
      title: 'ORDER BY y limitación de filas',
      summary: 'Ordenar resultados y recuperar solo las primeras N filas — en Oracle se usa ROWNUM, no LIMIT.',
      blocks: [
        {
          type: 'paragraph',
          content:
            'ORDER BY ordena el resultado final por una o más columnas, ascendente (ASC, por defecto) o descendente (DESC). Se evalúa después de SELECT y WHERE. Cuando solo necesitas las primeras filas — por ejemplo, el top 10 de ventas — Oracle no tiene LIMIT como MySQL o PostgreSQL; usa ROWNUM o, en versiones 12c+, FETCH FIRST.',
        },
        {
          type: 'code',
          code: {
            title: 'Ordenamiento simple',
            sql: `-- Top 10 productos más caros
SELECT producto_id, nombre, precio
FROM   productos
ORDER BY precio DESC;`,
          },
        },
        {
          type: 'code',
          code: {
            title: 'Limitar filas con ROWNUM (Oracle clásico)',
            sql: `-- Primeros 5 clientes ordenados por nombre
SELECT *
FROM (
  SELECT cliente_id, nombre, ciudad
  FROM   clientes
  ORDER BY nombre
)
WHERE ROWNUM <= 5;`,
            caption: 'ROWNUM se asigna antes del ORDER BY si no usas subconsulta. Por eso se envuelve en un SELECT interno.',
          },
        },
        {
          type: 'code',
          code: {
            title: 'Alternativa moderna: FETCH FIRST (Oracle 12c+)',
            sql: `SELECT cliente_id, nombre, ciudad
FROM   clientes
ORDER BY nombre
FETCH FIRST 5 ROWS ONLY;`,
          },
        },
        {
          type: 'comparison',
          comparison: {
            title: 'ROWNUM vs LIMIT (MySQL/PostgreSQL)',
            headerA: 'Oracle (ROWNUM)',
            headerB: 'MySQL / PostgreSQL (LIMIT)',
            rows: [
              {
                aspect: 'Sintaxis',
                optionA: 'WHERE ROWNUM <= N (a menudo con subconsulta)',
                optionB: 'LIMIT N al final de la consulta',
              },
              {
                aspect: 'Momento de asignación',
                optionA: 'ROWNUM se asigna durante la lectura, antes de ORDER BY',
                optionB: 'LIMIT se aplica después de ORDER BY',
              },
              {
                aspect: 'Paginación',
                optionA: 'Requiere subconsulta o OFFSET/FETCH (12c+)',
                optionB: 'LIMIT N OFFSET M de forma directa',
              },
            ],
          },
        },
        {
          type: 'application',
          application: {
            title: 'Dashboard de ventas del mes',
            text: 'Para mostrar las 5 sucursales con mayor facturación del mes, ordenas por SUM(monto) DESC y limitas a 5 filas. En el examen Oracle es común que pidan la versión con ROWNUM en subconsulta.',
          },
        },
      ],
    },
    {
      id: 'funciones-agregacion',
      title: 'Funciones de agregación',
      summary: 'COUNT, SUM, AVG, MAX y MIN condensan muchas filas en un solo valor resumen.',
      blocks: [
        {
          type: 'paragraph',
          content:
            'Las funciones de agregación operan sobre un conjunto de filas y devuelven un único valor. Son la base de todo KPI: total de ventas, promedio de ticket, cantidad de pedidos, producto más vendido.',
        },
        {
          type: 'list',
          items: [
            'COUNT(*) — cuenta filas (incluye NULLs)',
            'COUNT(columna) — cuenta filas donde la columna no es NULL',
            'SUM(columna) — suma valores numéricos',
            'AVG(columna) — promedio aritmético',
            'MAX / MIN — valor máximo o mínimo (funciona también con fechas y texto)',
          ],
        },
        {
          type: 'code',
          code: {
            title: 'Resumen de ventas',
            sql: `SELECT COUNT(*)           AS total_pedidos,
       SUM(monto)           AS facturacion_total,
       AVG(monto)           AS ticket_promedio,
       MAX(fecha_pedido)    AS ultimo_pedido,
       MIN(monto)           AS pedido_minimo
FROM   pedidos
WHERE  fecha_pedido >= DATE '2025-01-01';`,
          },
        },
        {
          type: 'note',
          content:
            'COUNT(DISTINCT columna) cuenta valores únicos. Es útil para saber cuántos clientes distintos compraron, no cuántas compras hubo.',
        },
        {
          type: 'application',
          application: {
            title: 'Indicadores en un ERP',
            text: 'El módulo de finanzas muestra facturación del trimestre (SUM), número de facturas emitidas (COUNT) y ticket promedio (AVG). Sin agregaciones tendrías que calcular manualmente miles de filas.',
          },
        },
      ],
    },
    {
      id: 'group-by-having',
      title: 'GROUP BY y WHERE vs HAVING',
      summary: 'Agrupa filas para calcular totales por categoría; WHERE filtra antes de agrupar, HAVING después.',
      blocks: [
        {
          type: 'paragraph',
          content:
            'Cuando necesitas un resumen por grupo — ventas por región, pedidos por cliente, stock por almacén — usas GROUP BY junto con funciones de agregación. La cláusula indica qué columnas definen cada grupo; Oracle calcula las agregaciones por separado para cada combinación única.',
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
                aspect: 'Puede usar agregaciones',
                optionA: 'No (solo columnas normales)',
                optionB: 'Sí (COUNT, SUM, AVG, etc.)',
              },
              {
                aspect: 'Orden en la consulta',
                optionA: 'Antes de GROUP BY',
                optionB: 'Después de GROUP BY',
              },
              {
                aspect: 'Ejemplo',
                optionA: 'WHERE fecha >= \'2025-01-01\'',
                optionB: 'HAVING SUM(monto) > 10000',
              },
            ],
          },
        },
        {
          type: 'code',
          code: {
            title: 'Ventas por cliente con filtro de grupo',
            sql: `-- Clientes con facturación total mayor a 50.000 en 2025
SELECT c.cliente_id,
       c.nombre,
       COUNT(p.pedido_id) AS num_pedidos,
       SUM(p.monto)       AS total_comprado
FROM   clientes c
JOIN   pedidos p ON p.cliente_id = c.cliente_id
WHERE  p.fecha_pedido >= DATE '2025-01-01'   -- filtra FILAS (pedidos)
GROUP BY c.cliente_id, c.nombre
HAVING SUM(p.monto) > 50000                   -- filtra GRUPOS (clientes)
ORDER BY total_comprado DESC;`,
            caption: 'WHERE elimina pedidos viejos antes de agrupar. HAVING elimina clientes cuyo total no supera 50.000.',
          },
        },
        {
          type: 'list',
          items: [
            'Toda columna en SELECT que no esté dentro de una agregación debe aparecer en GROUP BY.',
            'Puedes agrupar por varias columnas: GROUP BY region, mes crea un grupo por cada combinación.',
            'HAVING sin GROUP BY trata toda la tabla como un solo grupo (poco común pero válido).',
          ],
        },
        {
          type: 'application',
          application: {
            title: 'Ranking de vendedores',
            text: 'Para listar vendedores con más de 20 ventas y facturación superior al promedio del equipo, filtras filas con WHERE (solo ventas cerradas), agrupas por vendedor con GROUP BY, y descartas grupos con HAVING COUNT(*) > 20 AND SUM(monto) > AVG(...).',
          },
        },
      ],
    },
  ],
}
