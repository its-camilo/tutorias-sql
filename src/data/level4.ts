import type { ConceptLevel } from '../types/concepts'

export const level4: ConceptLevel = {
  id: 'nivel-4',
  number: 4,
  title: 'PL/SQL básico',
  subtitle: 'Lógica procedural en Oracle: bloques, procedimientos, funciones, cursores, excepciones y transacciones.',
  concepts: [
    {
      id: 'bloque-anonimo',
      title: 'Bloque anónimo PL/SQL',
      summary: 'La unidad mínima de PL/SQL con cuatro secciones: DECLARE, BEGIN, EXCEPTION y END.',
      blocks: [
        {
          type: 'paragraph',
          content:
            'PL/SQL extiende SQL con lógica procedural: variables, condicionales, bucles y manejo de errores. Un bloque anónimo es un script que no se guarda en la base de datos — se ejecuta directamente. Es la forma de aprender y probar lógica antes de crear procedimientos almacenados.',
        },
        { type: 'diagram', diagram: 'plsql-block' },
        {
          type: 'list',
          items: [
            'DECLARE — opcional. Declara variables, constantes, cursores y excepciones.',
            'BEGIN — obligatorio. Contiene la lógica: SQL, IF, loops, llamadas.',
            'EXCEPTION — opcional. Captura errores y define qué hacer cuando algo falla.',
            'END — cierra el bloque, siempre termina con punto y coma: END;',
          ],
        },
        {
          type: 'code',
          code: {
            title: 'Bloque anónimo completo',
            sql: `DECLARE
  v_monto    pedidos.monto%TYPE;
  v_cliente  clientes.nombre%TYPE;
BEGIN
  SELECT p.monto, c.nombre
  INTO   v_monto, v_cliente
  FROM   pedidos p
  JOIN   clientes c ON c.cliente_id = p.cliente_id
  WHERE  p.pedido_id = 1001;

  DBMS_OUTPUT.PUT_LINE('Cliente: ' || v_cliente);
  DBMS_OUTPUT.PUT_LINE('Monto: ' || v_monto);

EXCEPTION
  WHEN NO_DATA_FOUND THEN
    DBMS_OUTPUT.PUT_LINE('Pedido no encontrado');
  WHEN TOO_MANY_ROWS THEN
    DBMS_OUTPUT.PUT_LINE('Más de un resultado — revisa el filtro');
END;
/`,
            caption: 'El / al final ejecuta el bloque en SQL*Plus o SQL Developer.',
          },
        },
        {
          type: 'note',
          content:
            'Activa la salida con SET SERVEROUTPUT ON antes de usar DBMS_OUTPUT.PUT_LINE. El operador || concatena cadenas en PL/SQL.',
        },
        {
          type: 'application',
          application: {
            title: 'Validación rápida en ERP',
            text: 'Antes de desplegar un procedimiento de descuento, pruebas la lógica en un bloque anónimo: declaras variables, simulas el cálculo y verificas excepciones sin modificar objetos en el esquema.',
          },
        },
      ],
    },
    {
      id: 'procedure-vs-function',
      title: 'PROCEDURE vs FUNCTION',
      summary: 'El procedimiento ejecuta una acción; la función siempre retorna un valor usable dentro de SQL.',
      blocks: [
        {
          type: 'paragraph',
          content:
            'Los subprogramas almacenados viven en la base de datos y se reutilizan. Un PROCEDURE agrupa acciones — puede recibir parámetros IN, OUT e IN OUT, pero no se usa directamente en un SELECT. Una FUNCTION siempre devuelve un valor con RETURN y puede invocarse dentro de una consulta SQL como si fuera una expresión.',
        },
        {
          type: 'comparison',
          comparison: {
            title: 'PROCEDURE vs FUNCTION',
            headerA: 'PROCEDURE',
            headerB: 'FUNCTION',
            rows: [
              {
                aspect: 'Retorno',
                optionA: 'No retorna valor directamente (usa parámetros OUT)',
                optionB: 'Siempre retorna un valor con RETURN',
              },
              {
                aspect: 'Uso en SQL',
                optionA: 'Se invoca con CALL o EXEC, no en SELECT',
                optionB: 'Puede usarse en SELECT, WHERE, etc.',
              },
              {
                aspect: 'Propósito',
                optionA: 'Ejecutar acciones: insertar, actualizar, procesar lote',
                optionB: 'Calcular y devolver un resultado',
              },
              {
                aspect: 'Parámetros OUT',
                optionA: 'Común para devolver múltiples valores',
                optionB: 'No aplica — el retorno es uno solo',
              },
            ],
          },
        },
        {
          type: 'code',
          code: {
            title: 'FUNCTION: calcular descuento',
            sql: `CREATE OR REPLACE FUNCTION fn_descuento(
  p_monto    NUMBER,
  p_cliente  NUMBER
) RETURN NUMBER IS
  v_pct NUMBER := 0;
BEGIN
  SELECT CASE segmento
           WHEN 'Premium' THEN 0.15
           WHEN 'Gold'    THEN 0.10
           ELSE 0.05
         END
  INTO v_pct
  FROM dim_cliente
  WHERE cliente_key = p_cliente;

  RETURN p_monto * v_pct;
END fn_descuento;

-- Uso dentro de SQL:
SELECT pedido_id, monto, fn_descuento(monto, cliente_key) AS descuento
FROM   fact_ventas;`,
          },
        },
        {
          type: 'code',
          code: {
            title: 'PROCEDURE: registrar venta',
            sql: `CREATE OR REPLACE PROCEDURE sp_registrar_venta(
  p_cliente  IN  NUMBER,
  p_monto    IN  NUMBER,
  p_venta_id OUT NUMBER
) IS
BEGIN
  INSERT INTO fact_ventas (venta_id, cliente_key, monto)
  VALUES (seq_ventas.NEXTVAL, p_cliente, p_monto)
  RETURNING venta_id INTO p_venta_id;

  COMMIT;
END sp_registrar_venta;

-- Invocación:
DECLARE
  v_id NUMBER;
BEGIN
  sp_registrar_venta(p_cliente => 42, p_monto => 1500, p_venta_id => v_id);
  DBMS_OUTPUT.PUT_LINE('Venta creada: ' || v_id);
END;
/`,
          },
        },
        {
          type: 'application',
          application: {
            title: 'Reglas de negocio en ERP',
            text: 'Una FUNCTION calcula impuesto según región (reutilizable en reportes y formularios). Un PROCEDURE procesa un pedido completo: valida stock, inserta líneas, actualiza inventario y devuelve el número de pedido por parámetro OUT.',
          },
        },
      ],
    },
    {
      id: 'cursores',
      title: 'Cursores implícitos y explícitos',
      summary: 'El cursor es el mecanismo para recorrer filas: implícito para una fila, explícito para procesar conjuntos.',
      blocks: [
        {
          type: 'paragraph',
          content:
            'Oracle usa cursores internamente para procesar resultados de SELECT. Cuando haces SELECT INTO esperando una sola fila, usas un cursor implícito — Oracle lo abre y cierra automáticamente. Cuando necesitas procesar fila por fila (generar un archivo, aplicar lógica distinta por registro), declaras un cursor explícito con OPEN, FETCH y CLOSE, o más idiomaticamente un FOR loop.',
        },
        {
          type: 'comparison',
          comparison: {
            title: 'Cursor implícito vs explícito',
            headerA: 'Implícito',
            headerB: 'Explícito',
            rows: [
              {
                aspect: 'Cuándo usar',
                optionA: 'Una fila o agregación simple (SELECT INTO)',
                optionB: 'Múltiples filas procesadas una a una',
              },
              {
                aspect: 'Control',
                optionA: 'Automático — Oracle gestiona apertura/cierre',
                optionB: 'Manual: OPEN → FETCH → CLOSE (o FOR loop)',
              },
              {
                aspect: 'Atributos',
                optionA: 'SQL%FOUND, SQL%ROWCOUNT, SQL%NOTFOUND',
                optionB: 'Nombre%FOUND, %NOTFOUND, %ROWCOUNT',
              },
              {
                aspect: 'Rendimiento',
                optionA: 'Preferido siempre que sea posible',
                optionB: 'Más lento — evita procesar fila a fila si SQL puro basta',
              },
            ],
          },
        },
        {
          type: 'code',
          code: {
            title: 'Cursor implícito',
            sql: `DECLARE
  v_nombre clientes.nombre%TYPE;
BEGIN
  SELECT nombre INTO v_nombre
  FROM   clientes
  WHERE  cliente_id = 1;

  IF SQL%FOUND THEN
    DBMS_OUTPUT.PUT_LINE('Encontrado: ' || v_nombre);
  END IF;
END;
/`,
          },
        },
        {
          type: 'code',
          code: {
            title: 'Cursor explícito con FOR loop',
            sql: `DECLARE
  CURSOR c_pedidos IS
    SELECT pedido_id, monto
    FROM   pedidos
    WHERE  estado = 'PENDIENTE';
BEGIN
  FOR rec IN c_pedidos LOOP
    DBMS_OUTPUT.PUT_LINE(
      'Pedido ' || rec.pedido_id || ': $' || rec.monto
    );
    -- Aquí podrías aplicar lógica por cada fila
  END LOOP;

  DBMS_OUTPUT.PUT_LINE('Procesados: ' || c_pedidos%ROWCOUNT);
END;
/`,
            caption: 'El FOR loop abre, recorre y cierra el cursor automáticamente.',
          },
        },
        {
          type: 'application',
          application: {
            title: 'Facturación masiva',
            text: 'Un ERP genera facturas para todos los pedidos pendientes. El cursor explícito recorre cada pedido, calcula impuestos, inserta la factura y marca el pedido como facturado — fila por fila con control de errores individual.',
          },
        },
      ],
    },
    {
      id: 'manejo-excepciones',
      title: 'Manejo de excepciones',
      summary: 'El bloque EXCEPTION captura errores, WHEN OTHERS es el comodín, y RAISE_APPLICATION_ERROR comunica errores de negocio.',
      blocks: [
        {
          type: 'paragraph',
          content:
            'Cuando ocurre un error en PL/SQL, la ejecución salta al bloque EXCEPTION. Puedes capturar errores predefinidos de Oracle (NO_DATA_FOUND, DUP_VAL_ON_INDEX) o definir los tuyos. WHEN OTHERS captura cualquier error no listado — úsalo con precaución y siempre registra SQLERRM. RAISE_APPLICATION_ERROR lanza errores personalizados con código y mensaje legible.',
        },
        {
          type: 'list',
          items: [
            'NO_DATA_FOUND — SELECT INTO no devolvió filas.',
            'TOO_MANY_ROWS — SELECT INTO devolvió más de una fila.',
            'DUP_VAL_ON_INDEX — violación de unicidad al insertar.',
            'WHEN OTHERS — captura cualquier excepción restante.',
            'RAISE_APPLICATION_ERROR(código, mensaje) — errores de negocio (-20000 a -20999).',
          ],
        },
        {
          type: 'code',
          code: {
            title: 'Manejo completo de excepciones',
            sql: `CREATE OR REPLACE PROCEDURE sp_transferir_saldo(
  p_desde NUMBER,
  p_hasta NUMBER,
  p_monto NUMBER
) IS
  v_saldo NUMBER;
BEGIN
  SELECT saldo INTO v_saldo
  FROM   cuentas WHERE cuenta_id = p_desde
  FOR UPDATE;

  IF v_saldo < p_monto THEN
    RAISE_APPLICATION_ERROR(-20001, 'Saldo insuficiente');
  END IF;

  UPDATE cuentas SET saldo = saldo - p_monto WHERE cuenta_id = p_desde;
  UPDATE cuentas SET saldo = saldo + p_monto WHERE cuenta_id = p_hasta;

EXCEPTION
  WHEN NO_DATA_FOUND THEN
    RAISE_APPLICATION_ERROR(-20002, 'Cuenta no existe');
  WHEN OTHERS THEN
    ROLLBACK;
    RAISE_APPLICATION_ERROR(-20099, 'Error inesperado: ' || SQLERRM);
END;
/`,
          },
        },
        {
          type: 'note',
          content:
            'SQLERRM devuelve el mensaje de error. SQLCODE devuelve el código numérico. En WHEN OTHERS, hacer ROLLBACK antes de relanzar evita dejar transacciones inconsistentes.',
        },
        {
          type: 'application',
          application: {
            title: 'Validación de reglas ERP',
            text: 'Al crear un pedido, si el crédito del cliente es insuficiente, RAISE_APPLICATION_ERROR(-20010, \'Crédito excedido\') detiene la operación y devuelve un mensaje claro a la aplicación, en lugar del error genérico ORA-01403.',
          },
        },
      ],
    },
    {
      id: 'transacciones-commit-rollback',
      title: 'Transacciones: COMMIT y ROLLBACK',
      summary: 'Una transacción agrupa cambios relacionados: COMMIT los confirma, ROLLBACK los deshace.',
      blocks: [
        {
          type: 'paragraph',
          content:
            'Una transacción es una unidad lógica de trabajo: o todos los cambios se aplican, o ninguno. COMMIT confirma permanentemente las modificaciones. ROLLBACK revierte todo desde el último COMMIT. En un ERP, una venta que descuenta inventario y genera factura debe ser una sola transacción — si falla la factura, el inventario no debe haberse descontado.',
        },
        { type: 'diagram', diagram: 'transaction' },
        {
          type: 'list',
          items: [
            'Propiedad ACID: Atomicidad (todo o nada), Consistencia, Aislamiento, Durabilidad.',
            'SAVEPOINT crea puntos intermedios para ROLLBACK parcial.',
            'DDL (CREATE, DROP, TRUNCATE) hace COMMIT implícito en Oracle.',
            'Autocommit desactivado: los cambios no son permanentes hasta COMMIT explícito.',
          ],
        },
        {
          type: 'code',
          code: {
            title: 'Transacción ERP: venta completa',
            sql: `BEGIN
  -- Paso 1: crear pedido
  INSERT INTO pedidos (pedido_id, cliente_id, monto)
  VALUES (5001, 42, 3200);

  -- Paso 2: descontar inventario
  UPDATE inventario
  SET    stock = stock - 3
  WHERE  producto_id = 101;

  -- Paso 3: generar factura
  INSERT INTO facturas (factura_id, pedido_id, total)
  VALUES (9001, 5001, 3200);

  COMMIT;  -- los 3 pasos se confirman juntos
EXCEPTION
  WHEN OTHERS THEN
    ROLLBACK;  -- si cualquier paso falla, se revierte todo
    RAISE;
END;
/`,
          },
        },
        {
          type: 'code',
          code: {
            title: 'SAVEPOINT para rollback parcial',
            sql: `BEGIN
  UPDATE cuentas SET saldo = saldo - 100 WHERE cuenta_id = 1;
  SAVEPOINT sp1;

  UPDATE cuentas SET saldo = saldo + 100 WHERE cuenta_id = 2;
  -- Si algo falla aquí:
  ROLLBACK TO sp1;  -- deshace solo el segundo UPDATE

  COMMIT;  -- confirma el primer UPDATE
END;
/`,
          },
        },
        {
          type: 'application',
          application: {
            title: 'Integridad en operaciones ERP',
            text: 'Transferir stock entre almacenes implica dos UPDATEs. Sin transacción podrías descontar del almacén origen pero fallar al sumar en destino — perdiendo mercancía en el sistema. COMMIT/ROLLBACK garantizan que ambos movimientos ocurren juntos o ninguno.',
          },
        },
      ],
    },
  ],
}
