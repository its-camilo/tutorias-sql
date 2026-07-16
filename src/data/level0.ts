import type { ConceptLevel } from '../types/concepts'

export const level0: ConceptLevel = {
  id: 'seccion-0',
  number: 0,
  title: 'Fundamentos antes del SQL',
  subtitle:
    'Vocabulario teórico que abre los exámenes Oracle: entidades, relaciones, modelos y normalización — antes de escribir la primera consulta.',
  concepts: [
    {
      id: 'que-es-base-datos',
      title: '¿Qué es una base de datos?',
      summary:
        'Colección organizada de datos relacionados, gestionada por un DBMS que permite guardar, consultar y modificar información de forma segura.',
      blocks: [
        {
          type: 'paragraph',
          content:
            'Una base de datos es un conjunto estructurado de información que representa hechos del negocio: clientes, productos, pedidos, inventario. No es solo un archivo Excel grande: está diseñada para que muchas personas y sistemas accedan al mismo tiempo, con reglas que garantizan consistencia y seguridad.',
        },
        {
          type: 'list',
          items: [
            'DBMS (Database Management System): el software que administra la base — en Oracle, Oracle Database.',
            'Persistencia: los datos sobreviven aunque apagues el servidor.',
            'Integridad: reglas que evitan datos inválidos (claves, tipos, restricciones).',
            'Concurrencia: varios usuarios pueden leer y escribir sin corromper la información.',
            'Seguridad: permisos por usuario o rol sobre tablas y operaciones.',
          ],
        },
        {
          type: 'application',
          application: {
            title: 'Por qué un ERP necesita una base de datos',
            text: 'Un ERP centraliza ventas, inventario y facturación en un solo lugar. Sin base de datos, cada área tendría su propia planilla y los totales no coincidirían. El DBMS garantiza que cuando un vendedor registra un pedido, el stock y la cuenta del cliente se actualicen de forma coherente.',
          },
        },
        {
          type: 'note',
          content:
            'En exámenes Oracle suelen preguntar verdadero/falso sobre si una base de datos es "solo un archivo" o si requiere un sistema gestor. La respuesta correcta siempre implica organización + gestión + reglas.',
        },
      ],
    },
    {
      id: 'que-es-tabla',
      title: '¿Qué es una tabla?',
      summary:
        'Estructura que organiza datos en filas (registros) y columnas (atributos): la unidad básica donde vive la información.',
      blocks: [
        {
          type: 'paragraph',
          content:
            'Una tabla es como una hoja de cálculo con reglas estrictas. Cada fila representa un registro individual — un cliente, un producto, un pedido. Cada columna representa un atributo — nombre, precio, fecha. En SQL, casi todo lo que consultas proviene de tablas.',
        },
        {
          type: 'list',
          items: [
            'Fila (registro, tupla): una instancia concreta del concepto — ej. el cliente "Ana García".',
            'Columna (campo, atributo): una característica — ej. EMAIL, CIUDAD, FECHA_ALTA.',
            'Tipo de dato: cada columna define qué valores admite — NUMBER, VARCHAR2, DATE.',
            'Tabla vacía vs tabla con datos: la estructura (columnas) existe aunque no haya filas.',
          ],
        },
        {
          type: 'code',
          code: {
            title: 'Ejemplo visual de una tabla CLIENTES',
            sql: `-- Cada FILA es un cliente; cada COLUMNA es un atributo
| CUSTOMER_ID | FULL_NAME    | EMAIL              | CITY    |
|-------------|--------------|--------------------|---------|
| 1           | Ana García   | ana@mail.com       | Bogotá  |
| 2           | Luis Pérez   | luis@mail.com      | Medellín|
| 3           | María López  | maria@mail.com     | Cali    |`,
            caption: 'En Oracle las tablas reales no se ven así en pantalla, pero conceptualmente funciona igual.',
          },
        },
        {
          type: 'application',
          application: {
            title: 'Tabla en un ERP de ventas',
            text: 'CO.ORDERS guarda pedidos: cada fila es un pedido con ORDER_ID, fecha, cliente y estado. CO.ORDER_ITEMS guarda las líneas de cada pedido. Separar en tablas evita repetir datos del cliente en cada línea.',
          },
        },
      ],
    },
    {
      id: 'que-es-esquema',
      title: '¿Qué es un esquema?',
      summary:
        'Conjunto de tablas, relaciones y reglas que definen la estructura completa de una base de datos — el plano de cómo se organiza todo.',
      blocks: [
        {
          type: 'paragraph',
          content:
            'Un esquema es el "plano arquitectónico" de la base de datos. Agrupa tablas relacionadas, sus claves, restricciones y permisos bajo un nombre lógico. En Oracle, un esquema suele corresponder al usuario propietario: el esquema CO contiene las tablas del ERP de pedidos; el esquema SH contiene el data warehouse de ventas históricas.',
        },
        {
          type: 'list',
          items: [
            'Define qué tablas existen y cómo se relacionan entre sí.',
            'Establece reglas de integridad: claves primarias, foráneas, valores permitidos.',
            'Separa contextos de negocio: ventas operativas (CO) vs analítica histórica (SH).',
            'Permite que distintos equipos trabajen sobre estructuras independientes pero en la misma instancia.',
          ],
        },
        {
          type: 'comparison',
          comparison: {
            title: 'Esquema vs base de datos vs instancia',
            headerA: 'Esquema',
            headerB: 'Base de datos / instancia',
            rows: [
              {
                aspect: 'Qué es',
                optionA: 'Colección lógica de objetos (tablas, vistas, procedimientos)',
                optionB: 'Instancia Oracle: servidor + archivos físicos donde viven los datos',
              },
              {
                aspect: 'Analogía',
                optionA: 'El plano de un departamento dentro del edificio',
                optionB: 'El edificio completo con todos sus departamentos',
              },
              {
                aspect: 'En FreeSQL',
                optionA: 'Customer Orders (CO), Sales History (SH)',
                optionB: 'La conexión entera a Oracle FreeSQL',
              },
            ],
          },
        },
        {
          type: 'note',
          content:
            'En exámenes Oracle, confundir "esquema" con "tabla" es un error común. El esquema contiene muchas tablas; una tabla es solo una pieza del esquema.',
        },
      ],
    },
    {
      id: 'que-es-atributo',
      title: '¿Qué es un atributo?',
      summary:
        'Cada columna representa una característica del dato — nombre, precio, fecha — y define qué se puede saber de cada registro.',
      blocks: [
        {
          type: 'paragraph',
          content:
            'Un atributo es una propiedad que describe a una entidad. En la tabla PRODUCTOS, los atributos pueden ser PRODUCT_NAME, UNIT_PRICE, CATEGORY. Cada atributo tiene un tipo de dato y reglas: el precio es numérico, el nombre es texto, la fecha de alta es DATE.',
        },
        {
          type: 'list',
          items: [
            'Atributo simple: un solo valor por celda — ej. PRECIO = 1500.',
            'Atributo compuesto (conceptual): se descompone en partes — ej. DIRECCIÓN → calle, ciudad, código postal.',
            'Atributo multivaluado (conceptual): varios valores — ej. teléfonos de un cliente; en tablas relacionales se normaliza en otra tabla.',
            'Atributo derivado: se calcula a partir de otros — ej. TOTAL = PRECIO × CANTIDAD.',
          ],
        },
        {
          type: 'code',
          code: {
            title: 'Atributos en CO.PRODUCTS',
            sql: `-- Cada columna es un atributo del producto
PRODUCT_ID       → identificador
PRODUCT_NAME     → nombre comercial
PRODUCT_DESCRIPTION → detalle
CATEGORY_ID      → clasificación
UNIT_PRICE       → precio de venta`,
          },
        },
        {
          type: 'application',
          application: {
            title: 'Explicárselo a un cliente',
            text: '"Cada columna de su catálogo es un atributo: usted decide qué características quiere rastrear — precio, categoría, proveedor. Eso define qué reportes podrá generar después."',
          },
        },
      ],
    },
    {
      id: 'que-es-entidad',
      title: '¿Qué es una entidad?',
      summary:
        'Objeto o concepto del mundo real que se representa como tabla — cliente, producto, pedido.',
      blocks: [
        {
          type: 'paragraph',
          content:
            'Una entidad es algo del negocio que necesitas registrar y distinguir de otros. "Cliente" es una entidad porque cada cliente es único y tiene propiedades propias. "Pedido" es otra entidad distinta. En el modelo lógico, cada entidad fuerte se convierte en una tabla.',
        },
        {
          type: 'list',
          items: [
            'Entidad fuerte: existe por sí sola — CLIENTE, PRODUCTO, TIENDA.',
            'Entidad débil (conceptual): depende de otra — LÍNEA_DE_PEDIDO depende de PEDIDO.',
            'Instancia de entidad: un registro concreto — el cliente con ID 5, no el concepto abstracto.',
            'Conjunto de entidades: todos los clientes del sistema = todas las filas de CO.CUSTOMERS.',
          ],
        },
        {
          type: 'comparison',
          comparison: {
            title: 'Entidad vs tabla vs registro',
            headerA: 'Nivel conceptual',
            headerB: 'Nivel lógico / físico',
            rows: [
              {
                aspect: 'Cliente',
                optionA: 'Entidad "Cliente" en el diagrama ER',
                optionB: 'Tabla CO.CUSTOMERS con filas de clientes reales',
              },
              {
                aspect: 'Ana García',
                optionA: 'Instancia de la entidad Cliente',
                optionB: 'Una fila (registro) en la tabla',
              },
              {
                aspect: 'Email',
                optionA: 'Atributo de la entidad Cliente',
                optionB: 'Columna EMAIL_ADDRESS en la tabla',
              },
            ],
          },
        },
        {
          type: 'note',
          content:
            'Pregunta típica de examen: "¿Una entidad es lo mismo que una fila?" No exactamente — la entidad es el concepto (Cliente); la fila es una instancia concreta (Ana García).',
        },
      ],
    },
    {
      id: 'clave-primaria',
      title: 'Clave primaria (PK)',
      summary:
        'Identificador único de cada fila en una tabla: no se repite, no queda vacío y distingue un registro de cualquier otro.',
      blocks: [
        {
          type: 'paragraph',
          content:
            'La clave primaria (Primary Key, PK) garantiza que cada fila sea identificable de forma unívoca. En CO.CUSTOMERS, CUSTOMER_ID es la PK: no puede haber dos clientes con el mismo ID, ni un cliente sin ID. Oracle crea un índice automático sobre la PK para búsquedas rápidas.',
        },
        {
          type: 'list',
          items: [
            'Unicidad: dos filas nunca comparten el mismo valor de PK.',
            'No nulidad: la PK no puede ser NULL — siempre debe tener valor.',
            'Inmutabilidad recomendada: conviene que no cambie (por eso se usan IDs numéricos, no nombres).',
            'Una sola PK por tabla (puede ser compuesta: varias columnas juntas).',
          ],
        },
        {
          type: 'code',
          code: {
            title: 'Definición de PK en Oracle',
            sql: `CREATE TABLE CO.CUSTOMERS (
  CUSTOMER_ID    NUMBER        PRIMARY KEY,
  EMAIL_ADDRESS  VARCHAR2(255) NOT NULL,
  FULL_NAME      VARCHAR2(255) NOT NULL
);

-- PK compuesta: la combinación es única
CREATE TABLE CO.ORDER_ITEMS (
  ORDER_ID    NUMBER,
  LINE_ITEM_ID NUMBER,
  QUANTITY    NUMBER,
  PRIMARY KEY (ORDER_ID, LINE_ITEM_ID)
);`,
          },
        },
        {
          type: 'application',
          application: {
            title: 'Por qué importa en un ERP',
            text: 'Sin PK, no podrías referenciar un pedido específico desde la factura ni desde el envío. La PK es el "DNI" de cada registro — sin ella, el sistema no sabe cuál fila actualizar.',
          },
        },
      ],
    },
    {
      id: 'clave-foranea',
      title: 'Clave foránea (FK)',
      summary:
        'Columna que enlaza una tabla con otra — la base de las relaciones entre entidades.',
      blocks: [
        {
          type: 'paragraph',
          content:
            'Una clave foránea (Foreign Key, FK) es una columna (o conjunto) que referencia la PK de otra tabla. En CO.ORDERS, CUSTOMER_ID es FK que apunta a CO.CUSTOMERS(CUSTOMER_ID). Esto permite vincular un pedido con su cliente sin duplicar nombre ni email en cada pedido.',
        },
        {
          type: 'list',
          items: [
            'Integridad referencial: Oracle impide insertar un FK que no exista en la tabla padre.',
            'Tabla padre (referenciada): donde está la PK — CO.CUSTOMERS.',
            'Tabla hija (referenciante): donde está la FK — CO.ORDERS.',
            'ON DELETE CASCADE (opcional): al borrar el padre, se borran hijos automáticamente.',
          ],
        },
        {
          type: 'code',
          code: {
            title: 'Relación ORDERS → CUSTOMERS',
            sql: `CREATE TABLE CO.ORDERS (
  ORDER_ID     NUMBER PRIMARY KEY,
  CUSTOMER_ID  NUMBER NOT NULL,
  ORDER_TMS    TIMESTAMP,
  CONSTRAINT fk_orders_customer
    FOREIGN KEY (CUSTOMER_ID)
    REFERENCES CO.CUSTOMERS (CUSTOMER_ID)
);

-- CUSTOMER_ID en ORDERS debe existir en CUSTOMERS`,
          },
        },
        {
          type: 'application',
          application: {
            title: 'JOINs nacen de las FK',
            text: 'Cuando en SQL escribes JOIN CO.ORDERS o ON CO.CUSTOMERS, estás usando las FK definidas en el esquema. El diseño relacional (FK) hace posible las consultas relacionales (JOIN).',
          },
        },
      ],
    },
    {
      id: 'relaciones',
      title: 'Relaciones (1:1, 1:N, N:M)',
      summary:
        'Cómo se conectan las entidades entre sí — un cliente puede tener muchos pedidos, pero un pedido pertenece a un solo cliente.',
      blocks: [
        {
          type: 'paragraph',
          content:
            'Las cardinalidades describen cuántas instancias de una entidad se relacionan con cuántas de otra. Son la base del diseño relacional y aparecen constantemente en preguntas de modelo conceptual y diagramas ER.',
        },
        {
          type: 'comparison',
          comparison: {
            title: 'Tipos de cardinalidad',
            headerA: 'Relación',
            headerB: 'Ejemplo ERP',
            rows: [
              {
                aspect: 'Uno a uno (1:1)',
                optionA: 'Cada A se asocia con exactamente un B y viceversa',
                optionB: 'EMPLEADO ↔ CREDENCIAL_ACCESO (un empleado, una credencial)',
              },
              {
                aspect: 'Uno a muchos (1:N)',
                optionA: 'Un A puede tener muchos B; cada B pertenece a un solo A',
                optionB: 'CLIENTE → PEDIDOS (un cliente, muchos pedidos)',
              },
              {
                aspect: 'Muchos a muchos (N:M)',
                optionA: 'Muchos A se relacionan con muchos B',
                optionB: 'PRODUCTO ↔ PROMOCIÓN (se resuelve con tabla intermedia)',
              },
            ],
          },
        },
        {
          type: 'list',
          items: [
            '1:N es la más común en ERP: se implementa con FK en la tabla "muchos" (PEDIDOS.CUSTOMER_ID).',
            'N:M requiere tabla puente (intermedia) con FK a ambas entidades.',
            '1:1 puede ser FK con restricción UNIQUE o tablas fusionadas si siempre van juntas.',
          ],
        },
        {
          type: 'code',
          code: {
            title: 'N:M con tabla intermedia',
            sql: `-- Un producto puede estar en muchas promociones;
-- una promoción incluye muchos productos
CREATE TABLE PRODUCT_PROMO (
  PRODUCT_ID  NUMBER REFERENCES PRODUCTS(PRODUCT_ID),
  PROMO_ID    NUMBER REFERENCES PROMOTIONS(PROMO_ID),
  PRIMARY KEY (PRODUCT_ID, PROMO_ID)
);`,
          },
        },
        {
          type: 'note',
          content:
            'Pregunta de examen frecuente: "Un cliente tiene muchos pedidos" → relación 1:N. La FK va en la tabla PEDIDOS, no en CLIENTES.',
        },
      ],
    },
    {
      id: 'modelo-conceptual-vs-logico',
      title: 'Modelo conceptual vs. modelo lógico',
      summary:
        'El conceptual describe entidades y relaciones del negocio; el lógico define tablas, tipos de datos y claves concretas.',
      blocks: [
        {
          type: 'paragraph',
          content:
            'El modelado de datos avanza en capas. Primero entiendes el negocio (conceptual); luego lo traduces a estructuras implementables (lógico). Saltarse el conceptual lleva a tablas mal diseñadas; quedarse solo en el conceptual no permite crear la base de datos.',
        },
        {
          type: 'comparison',
          comparison: {
            title: 'Conceptual vs lógico',
            headerA: 'Modelo conceptual',
            headerB: 'Modelo lógico',
            rows: [
              {
                aspect: 'Objetivo',
                optionA: 'Capturar qué existe en el negocio y cómo se relaciona',
                optionB: 'Definir cómo se almacena en tablas con tipos y claves',
              },
              {
                aspect: 'Vocabulario',
                optionA: 'Entidad, atributo, relación, cardinalidad',
                optionB: 'Tabla, columna, PK, FK, VARCHAR2, NUMBER',
              },
              {
                aspect: 'Audiencia',
                optionA: 'Analistas, clientes, equipo de negocio',
                optionB: 'Desarrolladores, DBAs, implementación Oracle',
              },
              {
                aspect: 'Herramienta',
                optionA: 'Diagrama ER en pizarra o herramienta de diseño',
                optionB: 'DDL (CREATE TABLE) o diseñador de esquemas',
              },
            ],
          },
        },
        {
          type: 'list',
          items: [
            'Conceptual: "Un cliente realiza pedidos" — sin decir si es NUMBER o VARCHAR2.',
            'Lógico: CO.CUSTOMERS(CUSTOMER_ID NUMBER PK) y CO.ORDERS(CUSTOMER_ID NUMBER FK).',
            'Físico (nivel extra): archivos, tablespaces, índices — lo maneja el DBA.',
          ],
        },
        {
          type: 'application',
          application: {
            title: 'En una reunión con el cliente',
            text: 'Primero validas el modelo conceptual ("¿un pedido puede tener varios envíos?"). Cuando todos están de acuerdo, pasas al lógico con nombres de tablas y columnas que Oracle entiende.',
          },
        },
      ],
    },
    {
      id: 'diagrama-er',
      title: 'Diagrama entidad-relación (ER)',
      summary:
        'Notación visual para representar entidades, atributos y relaciones antes de crear las tablas.',
      blocks: [
        {
          type: 'paragraph',
          content:
            'El diagrama ER es el lenguaje visual del modelado conceptual. Muestra entidades como rectángulos, atributos como óvalos o listas dentro del rectángulo, y relaciones como rombos o líneas con cardinalidad (1, N). Es la herramienta estándar para comunicar el diseño antes de escribir SQL.',
        },
        {
          type: 'list',
          items: [
            'Rectángulo: entidad (CLIENTE, PRODUCTO, PEDIDO).',
            'Óvalo / lista: atributos (nombre, precio, fecha).',
            'Rombo / línea etiquetada: relación ("realiza", "contiene").',
            'Cardinalidad en los extremos: 1, N, M — quién se relaciona con cuántos.',
            'PK subrayada o marcada con # en herramientas modernas.',
          ],
        },
        {
          type: 'code',
          code: {
            title: 'Ejemplo textual de un ER simplificado',
            sql: `┌─────────────┐         realiza          ┌─────────────┐
│   CLIENTE   │─────────── 1:N ───────────│   PEDIDO    │
│─────────────│                           │─────────────│
│ # customer_id│                           │ # order_id  │
│   full_name │                           │   order_date│
│   email     │                           │   status    │
└─────────────┘                           └──────┬──────┘
                                                 │ 1:N
                                                 ▼
                                          ┌─────────────┐
                                          │ LINEA_PEDIDO│
                                          │─────────────│
                                          │ # line_id   │
                                          │   quantity  │
                                          │   unit_price│
                                          └─────────────┘`,
            caption: 'Este diagrama se traduce después a tablas CO.CUSTOMERS, CO.ORDERS y CO.ORDER_ITEMS.',
          },
        },
        {
          type: 'note',
          content:
            'En exámenes Oracle pueden mostrar un ER y pedir identificar cardinalidades, entidades débiles o qué atributo es PK. Practica leer la notación antes de la parte práctica de SQL.',
        },
      ],
    },
    {
      id: 'relacional-vs-nosql',
      title: 'Bases de datos relacionales vs. no relacionales',
      summary:
        'Relacional organiza datos en tablas con relaciones fijas; NoSQL ofrece modelos flexibles para datos variables o no estructurados.',
      blocks: [
        {
          type: 'paragraph',
          content:
            'Las bases relacionales (como Oracle Database) son el estándar para ERPs y transacciones: estructura rígida, SQL, integridad referencial. Las no relacionales (NoSQL) priorizan flexibilidad y escala horizontal para casos como documentos JSON, grafos sociales o caché de alta velocidad.',
        },
        {
          type: 'comparison',
          comparison: {
            title: 'Relacional vs NoSQL',
            headerA: 'Relacional (Oracle, PostgreSQL)',
            headerB: 'No relacional (NoSQL)',
            rows: [
              {
                aspect: 'Estructura',
                optionA: 'Tablas con filas y columnas, esquema definido',
                optionB: 'Documentos, clave-valor, columnas, grafos — según el motor',
              },
              {
                aspect: 'Consultas',
                optionA: 'SQL estándar con JOINs',
                optionB: 'APIs propias, sin JOINs clásicos en muchos casos',
              },
              {
                aspect: 'Integridad',
                optionA: 'PK, FK, transacciones ACID',
                optionB: 'Eventual consistency en algunos sistemas distribuidos',
              },
              {
                aspect: 'Caso ideal',
                optionA: 'ERP, finanzas, inventario, reporting estructurado',
                optionB: 'Logs, catálogos variables, tiempo real, big data',
              },
            ],
          },
        },
        {
          type: 'list',
          items: [
            'Oracle es relacional — por eso el examen se centra en SQL y modelado relacional.',
            'NoSQL no reemplaza al ERP: complementa casos donde la estructura cambia mucho o el volumen exige otro enfoque.',
            'Tipos NoSQL: documento (MongoDB), clave-valor (Redis), columna (Cassandra), grafo (Neo4j).',
          ],
        },
        {
          type: 'application',
          application: {
            title: 'Qué decirle al cliente',
            text: '"Su ERP de pedidos, facturas e inventario vive en Oracle relacional porque necesita consistencia y reportes cruzados. Si después quiere analizar millones de eventos de click en web, ahí podría evaluar un complemento NoSQL."',
          },
        },
      ],
    },
    {
      id: 'normalizacion',
      title: 'Normalización (idea general)',
      summary:
        'Proceso para evitar redundancia y anomalías: cada dato debería vivir en un solo lugar. 1FN, 2FN y 3FN son los pasos básicos.',
      blocks: [
        {
          type: 'paragraph',
          content:
            'La normalización organiza las tablas para que no se repita la misma información en varias filas. Sin normalizar, actualizar el nombre de un cliente en un pedido antiguo podría dejar datos inconsistentes. Las formas normales (FN) son reglas progresivas para lograrlo.',
        },
        {
          type: 'comparison',
          comparison: {
            title: 'Primera, segunda y tercera forma normal',
            headerA: 'Forma normal',
            headerB: 'Regla en lenguaje simple',
            rows: [
              {
                aspect: '1FN',
                optionA: 'Primera forma normal',
                optionB: 'Cada celda tiene un solo valor atómico; no listas ni grupos repetidos en una columna',
              },
              {
                aspect: '2FN',
                optionA: 'Segunda forma normal',
                optionB: 'Cumple 1FN y todo atributo no-PK depende de toda la PK (no solo de parte de ella)',
              },
              {
                aspect: '3FN',
                optionA: 'Tercera forma normal',
                optionB: 'Cumple 2FN y ningún atributo no-PK depende de otro atributo no-PK (sin dependencias transitivas)',
              },
            ],
          },
        },
        {
          type: 'code',
          code: {
            title: 'Ejemplo: tabla NO normalizada vs normalizada',
            sql: `-- ❌ Sin normalizar: el nombre del cliente se repite en cada pedido
| order_id | customer_name | customer_city | product | qty |
|----------|---------------|---------------|---------|-----|
| 1        | Ana García    | Bogotá        | Laptop  | 2   |
| 2        | Ana García    | Bogotá        | Mouse   | 1   |

-- ✅ Normalizado (3FN): cliente en su tabla, pedido referencia por FK
CO.CUSTOMERS: customer_id, full_name, city
CO.ORDERS:    order_id, customer_id (FK), ...
CO.ORDER_ITEMS: order_id, product_id, quantity`,
          },
        },
        {
          type: 'list',
          items: [
            'Ventaja: menos redundancia, actualizaciones más seguras, menos espacio.',
            'Trade-off: más tablas implican más JOINs en consultas — en reporting se a veces desnormaliza a propósito (esquema estrella).',
            'Para el examen Oracle: conoce la idea y un ejemplo; no necesitas calcular FN formalmente.',
          ],
        },
        {
          type: 'note',
          content:
            'La desnormalización controlada en data warehouses (SH) es intencional: se sacrifica algo de redundancia por velocidad de consulta. Eso no contradice la normalización en el ERP transaccional (CO).',
        },
      ],
    },
  ],
}
