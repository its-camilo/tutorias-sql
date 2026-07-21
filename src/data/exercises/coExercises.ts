import type { Exercise } from '../../types/exercises'
import { buildSteps } from './mergeSteps'

export const coExercises: Exercise[] = [
  {
    id: 'co-consulta-simple',
    number: 1,
    title: 'Clientes de alto valor',
    topic: 'JOIN · GROUP BY · HAVING',
    enunciado:
      'Identifica clientes cuyo total de compras supera 1.000. Necesitas el nombre legible y el monto acumulado — típico de una lista VIP para prospección o seguimiento comercial.',
    part: {
      title: 'Segmentar cuentas VIP',
      goal: 'Une pedidos, líneas y clientes; agrupa por nombre y filtra totales mayores a 1.000.',
    },
    context:
      'En GenO Comercial, este tipo de consulta alimenta priorización de cuentas: saber quién compra más ayuda a enfocar llamadas, propuestas y seguimiento AMO.',
    clientAsk:
      '¿Cómo le explicarías el resultado a un cliente en una frase, sin jerga técnica? Ejemplo: "Estas son las cuentas que ya superan mil en compras acumuladas; conviene priorizarlas en el plan de seguimiento."',
    tables: ['CO.ORDERS', 'CO.ORDER_ITEMS', 'CO.CUSTOMERS'],
    steps: buildSteps([
      {
        label: 'Unir pedido y líneas',
        description: 'Cruzas la cabecera del pedido con sus líneas para obtener precios y cantidades.',
        sql: 'SELECT o.CUSTOMER_ID,\n       oi.UNIT_PRICE * oi.QUANTITY AS line_total\nFROM CO.ORDERS o\nJOIN CO.ORDER_ITEMS oi ON oi.ORDER_ID = o.ORDER_ID',
      },
      {
        label: 'Total por cliente',
        description: 'Agrupas por cliente y sumas el monto acumulado de compras.',
        sql: 'SELECT o.CUSTOMER_ID,\n       SUM(oi.UNIT_PRICE * oi.QUANTITY) AS total_compras\nFROM CO.ORDERS o\nJOIN CO.ORDER_ITEMS oi ON oi.ORDER_ID = o.ORDER_ID\nGROUP BY o.CUSTOMER_ID',
      },
      {
        label: 'Filtro VIP + nombre',
        description: 'Agregas el nombre del cliente y dejas solo quienes superan 1.000 (HAVING, no WHERE).',
        sql: 'SELECT c.FULL_NAME,\n       SUM(oi.UNIT_PRICE * oi.QUANTITY) AS total_compras\nFROM CO.ORDERS o\nJOIN CO.ORDER_ITEMS oi ON oi.ORDER_ID = o.ORDER_ID\nJOIN CO.CUSTOMERS c ON c.CUSTOMER_ID = o.CUSTOMER_ID\nGROUP BY c.FULL_NAME\nHAVING SUM(oi.UNIT_PRICE * oi.QUANTITY) > 1000\nORDER BY total_compras DESC',
      },
    ]),
    diagram: 'co-having-vip',
    diagramCaption:
      'GROUP BY agrupa por cliente; HAVING filtra el total acumulado — la base de una lista VIP comercial.',
    tip: 'En FreeSQL selecciona el esquema Customer Orders (CO) antes de ejecutar.',
  },
  {
    id: 'co-join-filtro',
    number: 2,
    title: 'Alerta de inventario',
    topic: 'JOIN · WHERE · GROUP BY',
    enunciado:
      'Detecta productos con stock bajo (menos de 10 unidades) y demanda reciente. Útil para anticipar quiebres antes de una reunión con el cliente o el área de operaciones.',
    part: {
      title: 'Stock crítico con demanda',
      goal: 'Cruza inventario, productos y líneas de pedido; filtra stock bajo y suma unidades vendidas.',
    },
    context:
      'Un perfil comercial no administra el almacén, pero sí necesita entender por qué un producto no está disponible o por qué conviene priorizar reabastecimiento en una propuesta.',
    clientAsk:
      '¿Cómo le dirías a un cliente, en una frase, qué muestra este resultado? Ejemplo: "Estos productos se están vendiendo y ya tienen poco stock; conviene revisar reposición para no perder pedidos."',
    tables: ['CO.INVENTORY', 'CO.PRODUCTS', 'CO.ORDER_ITEMS'],
    steps: buildSteps([
      {
        label: 'Stock bajo',
        description: 'Listas productos con menos de 10 unidades en inventario.',
        sql: 'SELECT p.PRODUCT_NAME, i.PRODUCT_INVENTORY AS stock\nFROM CO.INVENTORY i\nJOIN CO.PRODUCTS p ON p.PRODUCT_ID = i.PRODUCT_ID\nWHERE i.PRODUCT_INVENTORY < 10',
      },
      {
        label: 'Cruzar con ventas',
        description: 'Sumas la demanda histórica por producto para priorizar lo que más se mueve.',
        sql: 'SELECT p.PRODUCT_NAME,\n       i.PRODUCT_INVENTORY AS stock,\n       SUM(oi.QUANTITY) AS demanda\nFROM CO.INVENTORY i\nJOIN CO.PRODUCTS p ON p.PRODUCT_ID = i.PRODUCT_ID\nJOIN CO.ORDER_ITEMS oi ON oi.PRODUCT_ID = i.PRODUCT_ID\nWHERE i.PRODUCT_INVENTORY < 10\nGROUP BY p.PRODUCT_NAME, i.PRODUCT_INVENTORY\nORDER BY demanda DESC',
      },
    ]),
    diagram: 'co-join-inventory',
    diagramCaption:
      'Inventario + producto + ventas: el cruce típico para una alerta operativa con impacto comercial.',
  },
  {
    id: 'co-subconsulta',
    number: 3,
    title: 'Producto top por tienda',
    topic: 'JOIN · GROUP BY · ORDER BY',
    enunciado:
      'Lista unidades vendidas por tienda y producto, ordenadas de mayor a menor. Con ese ranking ya puedes responder en una reunión: “¿qué se mueve más en cada sucursal?”',
    part: {
      title: 'Ranking comercial por sucursal',
      goal: 'Une pedidos, líneas y productos; agrupa por tienda y producto; ordena por cantidad descendente.',
    },
    context:
      'Para GenO Comercial basta entender el ranking: no hace falta window functions. El valor está en interpretar el resultado frente a un cliente o al equipo de preventa.',
    clientAsk:
      '¿Cómo resumirías el hallazgo en 30 segundos a un cliente? Ejemplo: "En cada tienda hay productos que lideran las ventas; eso ayuda a enfocar inventario y mensajes comerciales locales."',
    tables: ['CO.ORDERS', 'CO.ORDER_ITEMS', 'CO.PRODUCTS'],
    steps: buildSteps([
      {
        label: 'Cruzar tienda, producto y cantidad',
        description: 'Unes pedidos, líneas y catálogo para ver qué se vendió en cada sucursal.',
        sql: 'SELECT o.STORE_ID, p.PRODUCT_NAME, oi.QUANTITY\nFROM CO.ORDERS o\nJOIN CO.ORDER_ITEMS oi ON oi.ORDER_ID = o.ORDER_ID\nJOIN CO.PRODUCTS p ON p.PRODUCT_ID = oi.PRODUCT_ID',
      },
      {
        label: 'Ranking por tienda',
        description: 'Sumas unidades por tienda y producto, y ordenas para ver los líderes primero.',
        sql: 'SELECT o.STORE_ID,\n       p.PRODUCT_NAME,\n       SUM(oi.QUANTITY) AS qty\nFROM CO.ORDERS o\nJOIN CO.ORDER_ITEMS oi ON oi.ORDER_ID = o.ORDER_ID\nJOIN CO.PRODUCTS p ON p.PRODUCT_ID = oi.PRODUCT_ID\nGROUP BY o.STORE_ID, p.PRODUCT_NAME\nORDER BY o.STORE_ID, qty DESC',
      },
    ]),
    diagram: 'co-join-top-product',
    diagramCaption:
      'Agregación + orden: suficiente para una conversación comercial sobre surtido por sucursal.',
  },
  {
    id: 'co-plsql',
    number: 4,
    title: 'Reconocer PL/SQL',
    topic: 'Lectura · vocabulario técnico',
    enunciado:
      'No tienes que escribir PL/SQL desde cero. Lee el bloque ya armado: recorre los pedidos del CUSTOMER_ID = 5 e imprime el total. Tu tarea es entender qué hace y explicarlo en lenguaje de negocio.',
    part: {
      title: 'Leer un bloque, no inventarlo',
      goal: 'Identifica DECLARE / BEGIN / END, el recorrido de pedidos y el acumulado final.',
    },
    context:
      'En GenO Comercial, PL/SQL es vocabulario de colaboración con técnicos — no una habilidad que se evalúe como código en el assessment center. Basta reconocer qué hace el bloque.',
    clientAsk:
      '¿Cómo le explicarías a un compañero comercial (no técnico) qué hace este bloque? Ejemplo: "Recorre cada pedido del cliente 5, muestra el monto y al final suma el total — como un estado de cuenta automático."',
    tables: ['CO.ORDERS', 'CO.ORDER_ITEMS'],
    steps: buildSteps([
      {
        label: 'Bloque listo para leer',
        description:
          'Observa las partes: variables, cursor (consulta encapsulada), bucle e impresión del total. No lo reescribas: explicálo.',
        sql: `DECLARE
  v_total NUMBER := 0;
  CURSOR c_pedidos IS
    SELECT o.ORDER_ID,
           oi.UNIT_PRICE * oi.QUANTITY AS monto
    FROM CO.ORDERS o
    JOIN CO.ORDER_ITEMS oi ON oi.ORDER_ID = o.ORDER_ID
    WHERE o.CUSTOMER_ID = 5;
BEGIN
  FOR rec IN c_pedidos LOOP
    DBMS_OUTPUT.PUT_LINE('Pedido ' || rec.ORDER_ID || ': ' || rec.monto);
    v_total := v_total + rec.monto;
  END LOOP;
  DBMS_OUTPUT.PUT_LINE('Total: ' || v_total);
END;
/`,
      },
    ]),
    diagram: 'co-cursor',
    diagramCaption:
      'El bloque es ilustrativo: reconoce el patrón, no memorices la sintaxis completa.',
    tip: 'Si quieres ver la salida en FreeSQL: SET SERVEROUTPUT ON. Si no, basta con leer y explicar el bloque.',
  },
]
