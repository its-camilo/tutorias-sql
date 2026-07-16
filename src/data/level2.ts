import type { ConceptLevel } from '../types/concepts'

export const level2: ConceptLevel = {
  id: 'nivel-2',
  number: 2,
  title: 'Relaciones entre tablas',
  subtitle: 'Conectar datos de varias tablas, modificar registros y entender la integridad referencial.',
  concepts: [
    {
      id: 'claves-primarias-foraneas',
      title: 'Claves primarias y foráneas',
      summary: 'La clave primaria identifica cada fila de forma única; la foránea conecta tablas y protege la integridad referencial.',
      blocks: [
        {
          type: 'paragraph',
          content:
            'En un modelo relacional, cada tabla representa una entidad (clientes, pedidos, productos). La clave primaria (PRIMARY KEY) garantiza que ninguna fila se repita: suele ser un ID numérico o un código de negocio único. La clave foránea (FOREIGN KEY) es una columna que referencia la clave primaria de otra tabla, estableciendo la relación lógica entre entidades.',
        },
        {
          type: 'list',
          items: [
            'Integridad referencial: no puedes insertar un pedido con cliente_id = 999 si ese cliente no existe.',
            'ON DELETE CASCADE: al borrar un cliente, sus pedidos se eliminan automáticamente (si está configurado).',
            'ON DELETE SET NULL: al borrar el registro padre, la FK queda en NULL en los hijos.',
            'Una tabla puede tener varias FKs: un pedido referencia cliente, vendedor y sucursal.',
          ],
        },
        {
          type: 'code',
          code: {
            title: 'Definición de tablas relacionadas',
            sql: `CREATE TABLE clientes (
  cliente_id   NUMBER PRIMARY KEY,
  nombre       VARCHAR2(100) NOT NULL,
  ciudad       VARCHAR2(50)
);

CREATE TABLE pedidos (
  pedido_id    NUMBER PRIMARY KEY,
  cliente_id   NUMBER NOT NULL,
  monto        NUMBER(12,2),
  fecha_pedido DATE DEFAULT SYSDATE,
  CONSTRAINT fk_pedido_cliente
    FOREIGN KEY (cliente_id)
    REFERENCES clientes(cliente_id)
);`,
          },
        },
        {
          type: 'application',
          application: {
            title: 'Modelo cliente-pedido en ERP',
            text: 'El módulo de ventas guarda pedidos en una tabla separada de clientes. La FK cliente_id evita "pedidos huérfanos" y permite JOINs para reportes como "todas las compras del cliente X".',
          },
        },
      ],
    },
    {
      id: 'joins',
      title: 'JOINs: INNER, LEFT y RIGHT',
      summary: 'Combinar filas de dos o más tablas según una condición de coincidencia en las claves.',
      blocks: [
        {
          type: 'paragraph',
          content:
            'Los JOINs resuelven el problema central de las bases relacionales: la información está dividida en tablas normalizadas. Un JOIN une filas de tablas distintas cuando un valor de la columna A coincide con un valor de la columna B (normalmente PK = FK).',
        },
        {
          type: 'list',
          items: [
            'INNER JOIN — solo filas con coincidencia en ambas tablas. Es el más usado en reportes de ventas completas.',
            'LEFT JOIN (LEFT OUTER JOIN) — todas las filas de la tabla izquierda; NULL en columnas derechas si no hay match.',
            'RIGHT JOIN — espejo del LEFT: preserva todas las filas de la derecha.',
            'FULL OUTER JOIN — ambas tablas completas; NULL donde falte coincidencia (menos frecuente en examen).',
          ],
        },
        { type: 'diagram', diagram: 'join-inner' },
        { type: 'diagram', diagram: 'join-left' },
        {
          type: 'code',
          code: {
            title: 'Reporte ventas: cliente → pedido → producto',
            sql: `-- INNER: solo pedidos que tienen cliente y líneas con producto
SELECT c.nombre        AS cliente,
       p.pedido_id,
       pr.nombre       AS producto,
       d.cantidad,
       d.precio_unitario
FROM   clientes c
INNER JOIN pedidos p       ON p.cliente_id = c.cliente_id
INNER JOIN detalle_pedido d ON d.pedido_id  = p.pedido_id
INNER JOIN productos pr     ON pr.producto_id = d.producto_id
WHERE  p.fecha_pedido >= DATE '2025-01-01';`,
          },
        },
        {
          type: 'code',
          code: {
            title: 'LEFT JOIN: clientes sin pedidos',
            sql: `-- Todos los clientes, incluso los que nunca compraron
SELECT c.cliente_id,
       c.nombre,
       COUNT(p.pedido_id) AS total_pedidos
FROM   clientes c
LEFT JOIN pedidos p ON p.cliente_id = c.cliente_id
GROUP BY c.cliente_id, c.nombre
ORDER BY total_pedidos;`,
            caption: 'Los clientes sin pedidos muestran total_pedidos = 0 gracias al LEFT JOIN.',
          },
        },
        {
          type: 'application',
          application: {
            title: 'Análisis de cartera',
            text: 'Con LEFT JOIN entre clientes y pedidos identificas clientes inactivos (COUNT = 0). Con INNER JOIN analizas solo quienes sí compraron. En ERP, el patrón cliente-pedido-producto es el reporte más repetido.',
          },
        },
      ],
    },
    {
      id: 'subconsultas',
      title: 'Subconsultas simples y correlacionadas',
      summary: 'Una consulta dentro de otra: filtra, calcula o alimenta comparaciones con resultados intermedios.',
      blocks: [
        {
          type: 'paragraph',
          content:
            'Una subconsulta (subquery) es un SELECT anidado dentro de otra consulta. Puede ir en WHERE, FROM, SELECT o HAVING. Las subconsultas simples se ejecutan una vez y devuelven un resultado independiente. Las correlacionadas referencian columnas de la consulta externa y se re-evalúan fila a fila.',
        },
        {
          type: 'list',
          items: [
            'Subconsulta escalar — devuelve un solo valor (ej. promedio para comparar).',
            'Subconsulta en IN — filtra donde el valor está en un conjunto de resultados.',
            'Subconsulta en FROM — actúa como tabla derivada (inline view).',
            'Subconsulta correlacionada — la inner query usa columnas de la outer query.',
          ],
        },
        {
          type: 'code',
          code: {
            title: 'Subconsulta simple en WHERE',
            sql: `-- Productos con precio superior al promedio
SELECT producto_id, nombre, precio
FROM   productos
WHERE  precio > (
  SELECT AVG(precio) FROM productos
);`,
          },
        },
        {
          type: 'code',
          code: {
            title: 'Subconsulta correlacionada',
            sql: `-- Clientes cuyo último pedido supera su promedio histórico
SELECT c.cliente_id, c.nombre, p.monto
FROM   clientes c
JOIN   pedidos p ON p.cliente_id = c.cliente_id
WHERE  p.monto > (
  SELECT AVG(p2.monto)
  FROM   pedidos p2
  WHERE  p2.cliente_id = c.cliente_id  -- referencia la fila externa
)
AND    p.fecha_pedido = (
  SELECT MAX(p3.fecha_pedido)
  FROM   pedidos p3
  WHERE  p3.cliente_id = c.cliente_id
);`,
            caption: 'La subconsulta correlacionada recalcula el promedio para cada cliente distinto.',
          },
        },
        {
          type: 'note',
          content:
            'En Oracle, EXISTS y NOT EXISTS suelen ser más eficientes que IN con subconsultas grandes. Para el examen, domina ambas formas.',
        },
        {
          type: 'application',
          application: {
            title: 'Detectar productos sin ventas',
            text: 'Usas NOT IN o NOT EXISTS con subconsulta sobre detalle_pedido para listar productos que nunca aparecieron en un pedido. Es un patrón clásico de auditoría de catálogo.',
          },
        },
      ],
    },
    {
      id: 'dml-delete-truncate-drop',
      title: 'DML básico y DELETE vs TRUNCATE vs DROP',
      summary: 'INSERT, UPDATE y DELETE modifican datos; TRUNCATE y DROP operan a nivel de estructura con consecuencias distintas.',
      blocks: [
        {
          type: 'paragraph',
          content:
            'El DML (Data Manipulation Language) cambia el contenido de las tablas: INSERT agrega filas, UPDATE modifica columnas existentes, DELETE elimina filas que cumplan una condición. TRUNCATE y DROP no son DML estricto — afectan la estructura o vacían la tabla de forma masiva.',
        },
        {
          type: 'code',
          code: {
            title: 'INSERT, UPDATE, DELETE',
            sql: `-- Insertar un nuevo cliente
INSERT INTO clientes (cliente_id, nombre, ciudad)
VALUES (101, 'Ana García', 'Medellín');

-- Actualizar precio con condición
UPDATE productos
SET    precio = precio * 1.10
WHERE  categoria = 'Electrónica';

-- Eliminar pedidos cancelados
DELETE FROM pedidos
WHERE  estado = 'CANCELADO';`,
          },
        },
        {
          type: 'comparison',
          comparison: {
            title: 'DELETE vs TRUNCATE vs DROP',
            headerA: 'DELETE',
            headerB: 'TRUNCATE / DROP',
            rows: [
              {
                aspect: 'Qué elimina',
                optionA: 'Filas que cumplan WHERE (o todas si no hay WHERE)',
                optionB: 'TRUNCATE: todas las filas. DROP: la tabla completa',
              },
              {
                aspect: 'Estructura de tabla',
                optionA: 'Se conserva (columnas, índices, constraints)',
                optionB: 'TRUNCATE conserva estructura. DROP la destruye',
              },
              {
                aspect: 'Rollback',
                optionA: 'Se puede deshacer con ROLLBACK (dentro de transacción)',
                optionB: 'TRUNCATE: DDL implícito, no siempre rollbackable. DROP: irreversible sin backup',
              },
              {
                aspect: 'Triggers',
                optionA: 'Dispara triggers DELETE',
                optionB: 'TRUNCATE no dispara DELETE triggers en Oracle',
              },
              {
                aspect: 'Velocidad',
                optionA: 'Fila por fila, más lento en tablas grandes',
                optionB: 'TRUNCATE libera extents, mucho más rápido',
              },
            ],
          },
        },
        {
          type: 'note',
          content:
            'TRUNCATE TABLE nombre_tabla es un DDL. Hace COMMIT implícito en Oracle. DROP TABLE elimina datos, índices, constraints y la definición. Usa DELETE cuando necesitas filtro granular o auditoría fila a fila.',
        },
        {
          type: 'application',
          application: {
            title: 'Limpieza de datos de prueba en ERP',
            text: 'Para borrar 3 registros de prueba usa DELETE con WHERE. Para vaciar una tabla staging antes de recargar un millón de filas usa TRUNCATE. Para eliminar un módulo obsoleto completo usa DROP (con precaución y backup).',
          },
        },
      ],
    },
  ],
}
