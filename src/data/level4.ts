import type { ConceptLevel } from '../types/concepts'

export const level4: ConceptLevel = {
  id: 'nivel-4',
  number: 4,
  title: 'PL/SQL: vocabulario para conversar',
  subtitle:
    'PL/SQL: vocabulario para conversar con técnicos — reconocer términos, no programar desde cero.',
  concepts: [
    {
      id: 'plsql-reconocer',
      title: 'Qué es PL/SQL (reconocerlo cuando lo mencionan)',
      summary:
        'La extensión procedural de Oracle: lógica de negocio que vive cerca de los datos, no solo consultas SELECT.',
      blocks: [
        {
          type: 'paragraph',
          content:
            'En una reunión el DBA dice: "eso lo resolvemos con un bloque PL/SQL." No te están pidiendo que lo escribas: te están diciendo que la regla de negocio (validar crédito, calcular impuesto, procesar un lote) vive en la base, no solo en la app. PL/SQL añade variables, IF, bucles y manejo de errores encima de SQL.',
        },
        { type: 'diagram', diagram: 'plsql-block' },
        {
          type: 'list',
          items: [
            'DECLARE — variables (opcional).',
            'BEGIN … END — la lógica (obligatorio).',
            'EXCEPTION — qué hacer si falla (opcional).',
            'Se usa en procedimientos, funciones, triggers y scripts de mantenimiento.',
          ],
        },
        {
          type: 'code',
          code: {
            title: 'Aspecto típico (solo para reconocerlo)',
            sql: `BEGIN
  -- lógica de negocio aquí
  UPDATE pedidos SET estado = 'VALIDADO'
  WHERE  pedido_id = 1001;
END;
/`,
            caption: 'Si ves BEGIN/END y / al final, es PL/SQL — no un SELECT suelto.',
          },
        },
        {
          type: 'application',
          application: {
            title: 'Cómo se lo dices a un cliente',
            text: '"Parte de las reglas de su ERP pueden vivir en la base Oracle como PL/SQL: se ejecutan cerca de los datos, de forma consistente para todas las pantallas. El equipo técnico las mantiene; usted compra confiabilidad de proceso, no un script suelto en Excel."',
          },
        },
        {
          type: 'note',
          content:
            'Meta GenO Comercial: reconocer la palabra y el bloque. No escribir cursores ni excepciones avanzadas.',
        },
      ],
    },
    {
      id: 'procedure-function-idea',
      title: 'PROCEDURE vs FUNCTION (idea en una frase)',
      summary:
        'PROCEDURE hace una acción; FUNCTION calcula y devuelve un valor.',
      blocks: [
        {
          type: 'paragraph',
          content:
            'El técnico propone: "una function para el descuento y un procedure para registrar la venta." En una frase: la FUNCTION responde "¿cuánto es?" y se puede usar en un SELECT; el PROCEDURE responde "haz esto" (insertar, actualizar, procesar) y se invoca aparte. Con eso ya puedes seguir la conversación.',
        },
        {
          type: 'comparison',
          comparison: {
            title: 'PROCEDURE vs FUNCTION',
            headerA: 'PROCEDURE',
            headerB: 'FUNCTION',
            rows: [
              {
                aspect: 'En una frase',
                optionA: 'Ejecuta una acción',
                optionB: 'Calcula y retorna un valor',
              },
              {
                aspect: 'Uso típico',
                optionA: 'Registrar pedido, transferir stock',
                optionB: 'Calcular impuesto, descuento, score',
              },
              {
                aspect: 'En un SELECT',
                optionA: 'No se usa directamente',
                optionB: 'Sí, como una expresión',
              },
            ],
          },
        },
        {
          type: 'code',
          code: {
            title: 'Ejemplo mínimo',
            sql: `-- FUNCTION: devuelve un valor
CREATE OR REPLACE FUNCTION fn_iva(p_monto NUMBER)
RETURN NUMBER IS
BEGIN
  RETURN p_monto * 0.19;
END;
/

-- PROCEDURE: ejecuta una acción
CREATE OR REPLACE PROCEDURE sp_cerrar_pedido(p_id NUMBER) IS
BEGIN
  UPDATE pedidos SET estado = 'CERRADO' WHERE pedido_id = p_id;
  COMMIT;
END;
/`,
          },
        },
        {
          type: 'application',
          application: {
            title: 'En una reunión con el equipo técnico',
            text: '"Si es un cálculo reutilizable en reportes, function. Si es un flujo que cambia datos — validar, insertar, actualizar inventario — procedure. Así demuestras que entiendes el diseño sin pedir el código fuente."',
          },
        },
      ],
    },
    {
      id: 'transacciones-idea',
      title: 'COMMIT / ROLLBACK y por qué importa en un ERP',
      summary:
        'Todo o nada: confirmar un conjunto de cambios o deshacerlos si algo falla a mitad de camino.',
      blocks: [
        {
          type: 'paragraph',
          content:
            'Una venta típica hace tres cosas: crea el pedido, descuenta inventario y genera factura. Si la factura falla pero el stock ya bajó, el ERP miente. COMMIT confirma el paquete completo; ROLLBACK lo deshace. En lenguaje de cliente: integridad de la operación de punta a punta.',
        },
        { type: 'diagram', diagram: 'transaction' },
        {
          type: 'list',
          items: [
            'Transacción = unidad lógica: o todos los pasos, o ninguno.',
            'COMMIT — confirma de forma permanente.',
            'ROLLBACK — revierte desde el último COMMIT.',
            'ACID en corto: Atomicidad (todo o nada) es lo que más importa en la conversación comercial.',
          ],
        },
        {
          type: 'code',
          code: {
            title: 'Idea de transacción ERP',
            sql: `BEGIN
  INSERT INTO pedidos (...) VALUES (...);
  UPDATE inventario SET stock = stock - 3 WHERE producto_id = 101;
  INSERT INTO facturas (...) VALUES (...);
  COMMIT;   -- los 3 pasos juntos
EXCEPTION
  WHEN OTHERS THEN
    ROLLBACK;  -- si falla uno, ninguno queda a medias
    RAISE;
END;
/`,
          },
        },
        {
          type: 'application',
          application: {
            title: 'Cómo se lo dices a un cliente',
            text: '"Oracle no deja la venta a medias: o se confirma el pedido con su stock y su factura, o se revierte todo. Eso es COMMIT/ROLLBACK — la garantía de que el sistema no inventa mercancía perdida por un error a mitad de proceso."',
          },
        },
      ],
    },
  ],
}
