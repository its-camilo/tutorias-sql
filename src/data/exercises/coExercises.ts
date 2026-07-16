import type { Exercise } from '../../types/exercises'
import { buildSteps } from './mergeSteps'

export const coExercises: Exercise[] = [
  {
    id: 'co-consulta-simple',
    number: 1,
    title: 'Consulta simple',
    topic: 'JOIN · GROUP BY · HAVING',
    enunciado:
      'Identifica clientes VIP cuyo total de compras supera 1.000, mostrando nombre legible y monto acumulado.',
    part: {
      title: 'Clientes VIP',
      goal: 'Une CO.ORDERS, CO.ORDER_ITEMS y CO.CUSTOMERS; agrupa por cliente y filtra con HAVING > 1000.',
    },
    context:
      'Segmentación comercial: combinar JOIN, agregación y HAVING para encontrar cuentas de alto valor.',
    tables: ['CO.ORDERS', 'CO.ORDER_ITEMS', 'CO.CUSTOMERS'],
    steps: buildSteps([
      {
        label: 'SELECT',
        description: 'Inicias la consulta indicando que quieres recuperar datos del ERP.',
        sql: 'SELECT',
      },
      {
        label: 'JOIN pedidos y líneas',
        description: 'Unes la cabecera del pedido con sus líneas para acceder a precios y cantidades.',
        sql: 'SELECT o.CUSTOMER_ID, oi.UNIT_PRICE, oi.QUANTITY\nFROM CO.ORDERS o\nJOIN CO.ORDER_ITEMS oi ON oi.ORDER_ID = o.ORDER_ID',
      },
      {
        label: 'Monto por línea',
        description: 'Calculas el valor de cada línea multiplicando precio unitario por cantidad.',
        sql: 'SELECT o.CUSTOMER_ID,\n       oi.UNIT_PRICE * oi.QUANTITY AS line_total\nFROM CO.ORDERS o\nJOIN CO.ORDER_ITEMS oi ON oi.ORDER_ID = o.ORDER_ID',
      },
      {
        label: 'GROUP BY cliente',
        description: 'Agrupas por cliente para obtener el total acumulado de compras por cuenta.',
        sql: 'SELECT o.CUSTOMER_ID,\n       SUM(oi.UNIT_PRICE * oi.QUANTITY) AS total_compras\nFROM CO.ORDERS o\nJOIN CO.ORDER_ITEMS oi ON oi.ORDER_ID = o.ORDER_ID\nGROUP BY o.CUSTOMER_ID',
      },
      {
        label: 'HAVING > 1000',
        description: 'Filtras solo los grupos cuyo total supera 1.000 — aquí entra HAVING, no WHERE.',
        sql: 'SELECT o.CUSTOMER_ID,\n       SUM(oi.UNIT_PRICE * oi.QUANTITY) AS total_compras\nFROM CO.ORDERS o\nJOIN CO.ORDER_ITEMS oi ON oi.ORDER_ID = o.ORDER_ID\nGROUP BY o.CUSTOMER_ID\nHAVING SUM(oi.UNIT_PRICE * oi.QUANTITY) > 1000',
      },
      {
        label: 'JOIN CO.CUSTOMERS',
        description: 'Agregas la tabla de clientes para mostrar el nombre legible en lugar del ID.',
        sql: 'SELECT c.FULL_NAME,\n       SUM(oi.UNIT_PRICE * oi.QUANTITY) AS total_compras\nFROM CO.ORDERS o\nJOIN CO.ORDER_ITEMS oi ON oi.ORDER_ID = o.ORDER_ID\nJOIN CO.CUSTOMERS c ON c.CUSTOMER_ID = o.CUSTOMER_ID\nGROUP BY c.FULL_NAME\nHAVING SUM(oi.UNIT_PRICE * oi.QUANTITY) > 1000',
      },
      {
        label: 'Consulta final',
        description: 'Ordenas por monto descendente para priorizar las cuentas VIP más valiosas.',
        sql: 'SELECT c.FULL_NAME,\n       SUM(oi.UNIT_PRICE * oi.QUANTITY) AS total_compras\nFROM CO.ORDERS o\nJOIN CO.ORDER_ITEMS oi ON oi.ORDER_ID = o.ORDER_ID\nJOIN CO.CUSTOMERS c ON c.CUSTOMER_ID = o.CUSTOMER_ID\nGROUP BY c.FULL_NAME\nHAVING SUM(oi.UNIT_PRICE * oi.QUANTITY) > 1000\nORDER BY total_compras DESC',
      },
    ]),
    diagram: 'co-having-vip',
    diagramCaption:
      'GROUP BY agrupa por cliente; HAVING filtra grupos según el total acumulado, no filas individuales.',
    tip: 'En FreeSQL selecciona el esquema Customer Orders (CO) y expande CO.ORDERS en el Navigator.',
  },
  {
    id: 'co-join-filtro',
    number: 2,
    title: 'JOIN + filtro',
    topic: 'Multi-JOIN · WHERE · GROUP BY · HAVING',
    enunciado:
      'Prioriza productos con stock crítico (menos de 10 unidades) y alta demanda histórica (más de 50 unidades vendidas).',
    part: {
      title: 'Alerta de inventario',
      goal: 'Cruza CO.INVENTORY, CO.PRODUCTS y CO.ORDER_ITEMS para detectar quiebres de stock con alta rotación.',
    },
    context:
      'Operaciones y compras: cruzar inventario actual con demanda histórica antes de que falte mercancía.',
    tables: ['CO.INVENTORY', 'CO.PRODUCTS', 'CO.ORDER_ITEMS'],
    steps: buildSteps([
      {
        label: 'Stock bajo',
        description: 'Listas productos con PRODUCT_INVENTORY menor a 10 unidades en CO.INVENTORY.',
        sql: 'SELECT i.PRODUCT_ID, p.PRODUCT_NAME, i.PRODUCT_INVENTORY\nFROM CO.INVENTORY i\nJOIN CO.PRODUCTS p ON p.PRODUCT_ID = i.PRODUCT_ID\nWHERE i.PRODUCT_INVENTORY < 10',
      },
      {
        label: 'JOIN con ventas',
        description: 'Agregas CO.ORDER_ITEMS para cruzar el stock actual con el historial de ventas.',
        sql: 'SELECT p.PRODUCT_NAME, i.PRODUCT_INVENTORY, oi.QUANTITY\nFROM CO.INVENTORY i\nJOIN CO.PRODUCTS p ON p.PRODUCT_ID = i.PRODUCT_ID\nJOIN CO.ORDER_ITEMS oi ON oi.PRODUCT_ID = i.PRODUCT_ID\nWHERE i.PRODUCT_INVENTORY < 10',
      },
      {
        label: 'GROUP BY producto',
        description: 'Agrupas por producto para sumar la demanda histórica de cada artículo.',
        sql: 'SELECT p.PRODUCT_NAME,\n       i.PRODUCT_INVENTORY AS stock,\n       SUM(oi.QUANTITY)    AS demanda\nFROM CO.INVENTORY i\nJOIN CO.PRODUCTS p ON p.PRODUCT_ID = i.PRODUCT_ID\nJOIN CO.ORDER_ITEMS oi ON oi.PRODUCT_ID = i.PRODUCT_ID\nWHERE i.PRODUCT_INVENTORY < 10\nGROUP BY p.PRODUCT_NAME, i.PRODUCT_INVENTORY',
      },
      {
        label: 'HAVING demanda alta',
        description: 'Filtras solo productos con más de 50 unidades vendidas históricamente.',
        sql: 'SELECT p.PRODUCT_NAME,\n       i.PRODUCT_INVENTORY AS stock,\n       SUM(oi.QUANTITY)    AS demanda\nFROM CO.INVENTORY i\nJOIN CO.PRODUCTS p ON p.PRODUCT_ID = i.PRODUCT_ID\nJOIN CO.ORDER_ITEMS oi ON oi.PRODUCT_ID = i.PRODUCT_ID\nWHERE i.PRODUCT_INVENTORY < 10\nGROUP BY p.PRODUCT_NAME, i.PRODUCT_INVENTORY\nHAVING SUM(oi.QUANTITY) > 50',
      },
      {
        label: 'Consulta final',
        description: 'Ordenas por demanda descendente para priorizar el reabastecimiento urgente.',
        sql: 'SELECT p.PRODUCT_NAME,\n       i.PRODUCT_INVENTORY AS stock,\n       SUM(oi.QUANTITY)    AS demanda\nFROM CO.INVENTORY i\nJOIN CO.PRODUCTS p ON p.PRODUCT_ID = i.PRODUCT_ID\nJOIN CO.ORDER_ITEMS oi ON oi.PRODUCT_ID = i.PRODUCT_ID\nWHERE i.PRODUCT_INVENTORY < 10\nGROUP BY p.PRODUCT_NAME, i.PRODUCT_INVENTORY\nHAVING SUM(oi.QUANTITY) > 50\nORDER BY demanda DESC',
      },
    ]),
    diagram: 'co-join-inventory',
    diagramCaption:
      'Tres tablas se unen por PRODUCT_ID; WHERE acota el stock y HAVING valida la rotación histórica.',
  },
  {
    id: 'co-subconsulta',
    number: 3,
    title: 'Subconsulta',
    topic: 'Window function · RANK · vista inline',
    enunciado:
      'Encuentra el producto más vendido en cada tienda usando RANK() particionado por STORE_ID.',
    part: {
      title: 'Top por tienda',
      goal: 'Agrupa ventas por STORE_ID y producto, rankea con RANK() OVER y filtra rnk = 1.',
    },
    context:
      'Análisis por sucursal: la función analítica evita calcular manualmente el top de cada tienda.',
    tables: ['CO.ORDERS', 'CO.ORDER_ITEMS', 'CO.PRODUCTS'],
    steps: buildSteps([
      {
        label: 'JOIN base',
        description: 'Unes pedidos, líneas y productos para acceder a tienda, nombre y cantidad.',
        sql: 'SELECT o.STORE_ID, p.PRODUCT_NAME, oi.QUANTITY\nFROM CO.ORDERS o\nJOIN CO.ORDER_ITEMS oi ON oi.ORDER_ID = o.ORDER_ID\nJOIN CO.PRODUCTS p ON p.PRODUCT_ID = oi.PRODUCT_ID',
      },
      {
        label: 'GROUP BY tienda y producto',
        description: 'Agrupas cantidades vendidas por STORE_ID y producto como base del ranking.',
        sql: 'SELECT o.STORE_ID,\n       p.PRODUCT_NAME,\n       SUM(oi.QUANTITY) AS qty\nFROM CO.ORDERS o\nJOIN CO.ORDER_ITEMS oi ON oi.ORDER_ID = o.ORDER_ID\nJOIN CO.PRODUCTS p ON p.PRODUCT_ID = oi.PRODUCT_ID\nGROUP BY o.STORE_ID, p.PRODUCT_NAME',
      },
      {
        label: 'Subconsulta con RANK',
        description: 'Envuelves la agregación y aplicas RANK() particionado por tienda.',
        sql: 'SELECT STORE_ID, PRODUCT_NAME, qty,\n       RANK() OVER (\n         PARTITION BY STORE_ID\n         ORDER BY qty DESC\n       ) AS rnk\nFROM (\n  SELECT o.STORE_ID,\n         p.PRODUCT_NAME,\n         SUM(oi.QUANTITY) AS qty\n  FROM CO.ORDERS o\n  JOIN CO.ORDER_ITEMS oi ON oi.ORDER_ID = o.ORDER_ID\n  JOIN CO.PRODUCTS p ON p.PRODUCT_ID = oi.PRODUCT_ID\n  GROUP BY o.STORE_ID, p.PRODUCT_NAME\n)',
      },
      {
        label: 'RANK inline',
        description: 'Integras RANK() directamente en la subconsulta para simplificar la estructura.',
        sql: 'SELECT o.STORE_ID,\n       p.PRODUCT_NAME,\n       SUM(oi.QUANTITY) AS qty,\n       RANK() OVER (\n         PARTITION BY o.STORE_ID\n         ORDER BY SUM(oi.QUANTITY) DESC\n       ) AS rnk\nFROM CO.ORDERS o\nJOIN CO.ORDER_ITEMS oi ON oi.ORDER_ID = o.ORDER_ID\nJOIN CO.PRODUCTS p ON p.PRODUCT_ID = oi.PRODUCT_ID\nGROUP BY o.STORE_ID, p.PRODUCT_NAME',
      },
      {
        label: 'Consulta final',
        description: 'Filtras rnk = 1 para quedarte solo con el producto líder de cada sucursal.',
        sql: 'SELECT STORE_ID, PRODUCT_NAME, qty\nFROM (\n  SELECT o.STORE_ID,\n         p.PRODUCT_NAME,\n         SUM(oi.QUANTITY) AS qty,\n         RANK() OVER (\n           PARTITION BY o.STORE_ID\n           ORDER BY SUM(oi.QUANTITY) DESC\n         ) AS rnk\n  FROM CO.ORDERS o\n  JOIN CO.ORDER_ITEMS oi ON oi.ORDER_ID = o.ORDER_ID\n  JOIN CO.PRODUCTS p ON p.PRODUCT_ID = oi.PRODUCT_ID\n  GROUP BY o.STORE_ID, p.PRODUCT_NAME\n)\nWHERE rnk = 1',
      },
    ]),
    diagram: 'co-join-top-product',
    diagramCaption:
      'RANK() particionado por tienda identifica el producto líder en cada sucursal sin repetir lógica.',
  },
  {
    id: 'co-plsql',
    number: 4,
    title: 'PL/SQL',
    topic: 'CURSOR · FOR loop · acumulación',
    enunciado:
      'Genera un estado de cuenta del CUSTOMER_ID = 5: recorre cada pedido, imprime el monto y acumula el total.',
    part: {
      title: 'Cursor explícito',
      goal: 'Declara un cursor sobre pedidos del cliente, recórrelo con FOR loop y acumula montos con DBMS_OUTPUT.',
    },
    context:
      'PL/SQL procesa fila a fila cuando necesitas lógica secuencial que SQL declarativo no expresa con claridad.',
    tables: ['CO.ORDERS', 'CO.ORDER_ITEMS'],
    steps: buildSteps([
      {
        label: 'Bloque anónimo',
        description: 'Verificas la estructura básica DECLARE / BEGIN / END antes de agregar lógica.',
        sql: 'DECLARE\n  v_total NUMBER := 0;\nBEGIN\n  NULL;\nEND;\n/',
      },
      {
        label: 'Declarar cursor',
        description: 'Defines el cursor que recorrerá los pedidos y montos del CUSTOMER_ID = 5.',
        sql: 'DECLARE\n  v_total NUMBER := 0;\n  CURSOR c_pedidos IS\n    SELECT o.ORDER_ID,\n           oi.UNIT_PRICE * oi.QUANTITY AS monto\n    FROM CO.ORDERS o\n    JOIN CO.ORDER_ITEMS oi ON oi.ORDER_ID = o.ORDER_ID\n    WHERE o.CUSTOMER_ID = 5;\nBEGIN\n  NULL;\nEND;\n/',
      },
      {
        label: 'FOR loop',
        description: 'Recorres fila por fila e imprimes el detalle de cada pedido con DBMS_OUTPUT.',
        sql: 'DECLARE\n  v_total NUMBER := 0;\n  CURSOR c_pedidos IS\n    SELECT o.ORDER_ID,\n           oi.UNIT_PRICE * oi.QUANTITY AS monto\n    FROM CO.ORDERS o\n    JOIN CO.ORDER_ITEMS oi ON oi.ORDER_ID = o.ORDER_ID\n    WHERE o.CUSTOMER_ID = 5;\nBEGIN\n  FOR rec IN c_pedidos LOOP\n    DBMS_OUTPUT.PUT_LINE(\'Pedido \' || rec.ORDER_ID || \': \' || rec.monto);\n  END LOOP;\nEND;\n/',
      },
      {
        label: 'Consulta final',
        description: 'Acumulas el total en v_total e imprimes el monto global al terminar el recorrido.',
        sql: 'DECLARE\n  v_total NUMBER := 0;\n  CURSOR c_pedidos IS\n    SELECT o.ORDER_ID,\n           oi.UNIT_PRICE * oi.QUANTITY AS monto\n    FROM CO.ORDERS o\n    JOIN CO.ORDER_ITEMS oi ON oi.ORDER_ID = o.ORDER_ID\n    WHERE o.CUSTOMER_ID = 5;\nBEGIN\n  FOR rec IN c_pedidos LOOP\n    DBMS_OUTPUT.PUT_LINE(\'Pedido \' || rec.ORDER_ID || \': \' || rec.monto);\n    v_total := v_total + rec.monto;\n  END LOOP;\n  DBMS_OUTPUT.PUT_LINE(\'Total: \' || v_total);\nEND;\n/',
      },
    ]),
    diagram: 'co-cursor',
    diagramCaption:
      'El cursor encapsula la consulta; el bloque PL/SQL recorre filas y ejecuta lógica por cada pedido.',
    tip: 'Activa SET SERVEROUTPUT ON en FreeSQL antes de ejecutar bloques con DBMS_OUTPUT.',
  },
]
