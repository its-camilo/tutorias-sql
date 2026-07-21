import type { ConceptLevel } from '../types/concepts'

export const level2: ConceptLevel = {
  id: 'nivel-2',
  number: 2,
  title: 'Relaciones entre tablas',
  subtitle:
    'Cómo se conectan clientes, pedidos y productos — y qué implica tocar datos en un ERP.',
  concepts: [
    {
      id: 'claves-primarias-foraneas',
      title: 'Claves primarias y foráneas',
      summary:
        'PK identifica la fila; FK conecta tablas y evita pedidos sin cliente.',
      blocks: [
        {
          type: 'paragraph',
          content:
            'En el módulo de ventas, pedidos y clientes viven en tablas distintas. La PK dice "este es el pedido 1001"; la FK dice "este pedido pertenece al cliente 42". Sin esa integridad, aparecen pedidos huérfanos y los reportes dejan de cuadrar — un riesgo que debes poder explicar en lenguaje de negocio.',
        },
        {
          type: 'list',
          items: [
            'Integridad referencial: no insertas un pedido con cliente_id inexistente.',
            'ON DELETE CASCADE: al borrar el padre, se borran los hijos (si está configurado).',
            'ON DELETE SET NULL: al borrar el padre, la FK del hijo queda NULL.',
            'Una tabla puede tener varias FKs: pedido → cliente, vendedor, sucursal.',
          ],
        },
        {
          type: 'code',
          code: {
            title: 'Tablas relacionadas (idea)',
            sql: `CREATE TABLE clientes (
  cliente_id NUMBER PRIMARY KEY,
  nombre     VARCHAR2(100) NOT NULL
);

CREATE TABLE pedidos (
  pedido_id  NUMBER PRIMARY KEY,
  cliente_id NUMBER NOT NULL,
  monto      NUMBER(12,2),
  CONSTRAINT fk_pedido_cliente
    FOREIGN KEY (cliente_id) REFERENCES clientes(cliente_id)
);`,
          },
        },
        {
          type: 'application',
          application: {
            title: 'Por qué un vendedor Oracle lo necesita',
            text: '"La FK es lo que evita pedidos fantasma. Cuando el cliente pide auditoría y trazabilidad, estás vendiendo integridad referencial — aunque no uses esa frase técnica en la primera slide."',
          },
        },
      ],
    },
    {
      id: 'joins',
      title: 'JOINs: INNER, LEFT y RIGHT',
      summary:
        'Cruzar tablas para armar el reporte completo: cliente + pedido + producto.',
      blocks: [
        {
          type: 'paragraph',
          content:
            'El reporte de ventas necesita nombre del cliente, número de pedido y producto — datos que viven en tablas distintas. Un JOIN une filas cuando la PK coincide con la FK. INNER muestra solo coincidencias; LEFT incluye también filas de la izquierda sin match (ej. clientes sin pedidos).',
        },
        {
          type: 'list',
          items: [
            'INNER JOIN — solo filas con coincidencia en ambas tablas (ventas completas).',
            'LEFT JOIN — todas las filas de la izquierda; NULL a la derecha si no hay match.',
            'RIGHT JOIN — espejo del LEFT: preserva todas las de la derecha.',
            'FULL OUTER JOIN — ambas tablas completas (menos frecuente en demos ERP).',
          ],
        },
        { type: 'diagram', diagram: 'join-inner' },
        { type: 'diagram', diagram: 'join-left' },
        {
          type: 'code',
          code: {
            title: 'INNER: ventas con cliente y producto',
            sql: `SELECT c.nombre AS cliente,
       p.pedido_id,
       pr.nombre AS producto,
       d.cantidad
FROM   clientes c
INNER JOIN pedidos p        ON p.cliente_id = c.cliente_id
INNER JOIN detalle_pedido d ON d.pedido_id  = p.pedido_id
INNER JOIN productos pr     ON pr.producto_id = d.producto_id
WHERE  p.fecha_pedido >= DATE '2025-01-01';`,
          },
        },
        {
          type: 'code',
          code: {
            title: 'LEFT: clientes sin pedidos',
            sql: `SELECT c.nombre, COUNT(p.pedido_id) AS total_pedidos
FROM   clientes c
LEFT JOIN pedidos p ON p.cliente_id = c.cliente_id
GROUP BY c.nombre
ORDER BY total_pedidos;`,
            caption: 'Clientes sin pedidos aparecen con total_pedidos = 0.',
          },
        },
        {
          type: 'application',
          application: {
            title: 'En una reunión comercial',
            text: '"Con INNER analizamos quién sí compró. Con LEFT encontramos cartera inactiva (cero pedidos). Ese es el patrón cliente–pedido–producto que verás en casi toda demo de Oracle Applications o Analytics."',
          },
        },
      ],
    },
    {
      id: 'subconsultas',
      title: 'Subconsultas simples y correlacionadas',
      summary:
        'Una pregunta dentro de otra: comparar contra un promedio o un conjunto intermedio.',
      blocks: [
        {
          type: 'paragraph',
          content:
            'El analista pide: "productos más caros que el promedio del catálogo." Eso se resuelve con una subconsulta: un SELECT anidado que calcula el promedio y otro que filtra. No necesitas dominar correlacionadas complejas — sí reconocer cuándo el técnico dice "lo resolvemos con una subquery".',
        },
        {
          type: 'list',
          items: [
            'Subconsulta escalar — un solo valor (ej. AVG para comparar).',
            'IN / NOT IN — el valor está (o no) en un conjunto de resultados.',
            'EXISTS / NOT EXISTS — "¿existe al menos una fila relacionada?"',
            'Correlacionada — la interna usa columnas de la externa (más avanzada).',
          ],
        },
        {
          type: 'code',
          code: {
            title: 'Subconsulta simple',
            sql: `-- Productos con precio superior al promedio
SELECT producto_id, nombre, precio
FROM   productos
WHERE  precio > (SELECT AVG(precio) FROM productos);`,
          },
        },
        {
          type: 'application',
          application: {
            title: 'Cómo se lo dices a un cliente',
            text: '"A veces el filtro no es un número fijo: es el resultado de otra pregunta — el promedio, el máximo del mes, la lista de clientes VIP. Eso es una subconsulta: una consulta que alimenta a otra."',
          },
        },
        {
          type: 'note',
          content:
            'En GenO Comercial basta reconocer el patrón. El equipo técnico elige entre subquery, JOIN o EXISTS según rendimiento.',
        },
      ],
    },
    {
      id: 'dml-delete-truncate-drop',
      title: 'DML básico y DELETE vs TRUNCATE vs DROP',
      summary:
        'Insertar, actualizar y borrar datos — y no confundir vaciar una tabla con destruirla.',
      blocks: [
        {
          type: 'paragraph',
          content:
            'En un proyecto hay datos de prueba, correcciones de precio y limpiezas de staging. INSERT agrega, UPDATE corrige, DELETE borra filas con filtro. TRUNCATE vacía toda la tabla de golpe; DROP elimina la tabla misma. Confundirlos en una conversación con el cliente o el DBA puede sonar a riesgo operativo — por eso el vocabulario importa.',
        },
        {
          type: 'code',
          code: {
            title: 'INSERT, UPDATE, DELETE',
            sql: `INSERT INTO clientes (cliente_id, nombre, ciudad)
VALUES (101, 'Ana García', 'Medellín');

UPDATE productos
SET    precio = precio * 1.10
WHERE  categoria = 'Electrónica';

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
                optionA: 'Filas que cumplan WHERE',
                optionB: 'TRUNCATE: todas las filas. DROP: la tabla completa',
              },
              {
                aspect: 'Estructura',
                optionA: 'Se conserva',
                optionB: 'TRUNCATE conserva estructura. DROP la destruye',
              },
              {
                aspect: 'Rollback',
                optionA: 'Se puede deshacer (en transacción)',
                optionB: 'TRUNCATE/DROP: DDL — mucho más riesgoso',
              },
              {
                aspect: 'Cuándo usarlo',
                optionA: 'Borrar 3 registros de prueba con filtro',
                optionB: 'TRUNCATE: vaciar staging. DROP: retirar un objeto obsoleto',
              },
            ],
          },
        },
        {
          type: 'application',
          application: {
            title: 'En una reunión con el equipo técnico',
            text: '"Si es limpieza selectiva, DELETE. Si es vaciar staging antes de recargar un millón de filas, TRUNCATE. Si es retirar un módulo, DROP — con backup. Así demuestras que entiendes el riesgo sin ejecutar nada."',
          },
        },
      ],
    },
  ],
}
