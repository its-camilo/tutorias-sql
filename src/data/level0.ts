import type { ConceptLevel } from '../types/concepts'

export const level0: ConceptLevel = {
  id: 'seccion-0',
  number: 0,
  title: 'Fundamentos antes del SQL',
  subtitle:
    'Vocabulario para entender cómo Oracle organiza el negocio — sin ser especialista técnico.',
  concepts: [
    {
      id: 'que-es-base-datos',
      title: '¿Qué es una base de datos?',
      summary:
        'El lugar donde el negocio guarda clientes, pedidos e inventario de forma segura, compartida y consistente.',
      blocks: [
        {
          type: 'paragraph',
          content:
            'Un cliente pregunta: "¿Dónde vive mi información de ventas?" La respuesta no es un Excel en el escritorio de alguien. Una base de datos es la colección organizada de datos del negocio — clientes, productos, pedidos — gestionada por un DBMS (en Oracle, Oracle Database) que permite consultar, modificar y proteger esa información al mismo tiempo para muchas personas y sistemas.',
        },
        {
          type: 'list',
          items: [
            'DBMS: el software que administra la base (Oracle Database).',
            'Persistencia: los datos siguen ahí aunque apagues el servidor.',
            'Integridad: reglas que evitan datos inválidos (claves, tipos, restricciones).',
            'Concurrencia: varios usuarios leen y escriben sin corromper la información.',
            'Seguridad: permisos por usuario o rol sobre tablas y operaciones.',
          ],
        },
        {
          type: 'application',
          application: {
            title: 'Cómo se lo dices a un cliente',
            text: '"Su ERP no es un archivo suelto: es una base de datos Oracle donde ventas, inventario y facturación comparten la misma verdad. Cuando un vendedor registra un pedido, el stock y la cuenta del cliente se actualizan de forma coherente — eso es lo que compra con Oracle."',
          },
        },
        {
          type: 'note',
          content:
            'En GenO Comercial no te piden instalar Oracle: te piden explicar por qué un ERP necesita un DBMS y no un archivo compartido.',
        },
      ],
    },
    {
      id: 'que-es-tabla',
      title: '¿Qué es una tabla?',
      summary:
        'Filas y columnas: la forma en que el negocio organiza cada tipo de información (clientes, pedidos, productos).',
      blocks: [
        {
          type: 'paragraph',
          content:
            'En una demo, el cliente ve "lista de clientes" o "catálogo de productos". Por detrás, eso es una tabla: filas (cada cliente o producto) y columnas (nombre, precio, fecha). Es como una hoja de cálculo con reglas estrictas — y en SQL casi todo lo que consultas proviene de tablas.',
        },
        {
          type: 'list',
          items: [
            'Fila (registro): una instancia concreta — el cliente "Ana García".',
            'Columna (atributo): una característica — EMAIL, CIUDAD, FECHA_ALTA.',
            'Tipo de dato: qué valores admite la columna — NUMBER, VARCHAR2, DATE.',
            'La estructura (columnas) existe aunque la tabla esté vacía.',
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
            caption: 'En Oracle las tablas no se ven así en pantalla, pero conceptualmente funciona igual.',
          },
        },
        {
          type: 'application',
          application: {
            title: 'Por qué un vendedor Oracle lo necesita',
            text: 'Cuando hablas del esquema CO, CO.ORDERS es "la tabla de pedidos" y CO.ORDER_ITEMS "las líneas de cada pedido". Separar en tablas evita repetir datos del cliente en cada línea — y te permite explicar por qué el reporte cruza varias tablas.',
          },
        },
      ],
    },
    {
      id: 'que-es-esquema',
      title: '¿Qué es un esquema?',
      summary:
        'El "departamento" lógico dentro de Oracle: un conjunto de tablas del mismo contexto de negocio (CO, SH).',
      blocks: [
        {
          type: 'paragraph',
          content:
            'El cliente tiene un ERP operativo y también reportes históricos. En Oracle eso suele vivir en esquemas distintos: el esquema es el plano que agrupa tablas, claves y permisos bajo un nombre. CO concentra pedidos del día a día; SH concentra el data warehouse de ventas históricas — misma instancia, contextos separados.',
        },
        {
          type: 'list',
          items: [
            'Define qué tablas existen y cómo se relacionan.',
            'Establece reglas de integridad: PK, FK, valores permitidos.',
            'Separa contextos: ventas operativas (CO) vs analítica histórica (SH).',
            'Permite que equipos distintos trabajen sin mezclar objetos.',
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
                aspect: 'En FreeSQL / demos',
                optionA: 'Customer Orders (CO), Sales History (SH)',
                optionB: 'La conexión entera a Oracle',
              },
            ],
          },
        },
        {
          type: 'application',
          application: {
            title: 'En una reunión comercial',
            text: '"CO es el esquema operativo de pedidos; SH es el de reporting histórico. No son bases distintas en el sentido de otro servidor: son namespaces de negocio dentro de la misma Oracle. Así el equipo técnico sabe de qué módulo hablamos."',
          },
        },
        {
          type: 'note',
          content:
            'Confundir esquema con tabla es un error frecuente en conversaciones con clientes: el esquema contiene muchas tablas.',
        },
      ],
    },
    {
      id: 'que-es-atributo',
      title: '¿Qué es un atributo?',
      summary:
        'Cada característica que el negocio quiere rastrear de un cliente, producto o pedido — en la tabla, una columna.',
      blocks: [
        {
          type: 'paragraph',
          content:
            'El cliente dice: "Necesito saber precio, categoría y proveedor de cada producto." Esas características son atributos. En la tabla se convierten en columnas con tipo y reglas: el precio es numérico, el nombre es texto, la fecha de alta es DATE. Lo que el negocio decide rastrear define qué reportes podrá pedir después.',
        },
        {
          type: 'list',
          items: [
            'Atributo simple: un valor por celda — PRECIO = 1500.',
            'Atributo compuesto (conceptual): se parte — DIRECCIÓN → calle, ciudad, CP.',
            'Atributo multivaluado (conceptual): varios valores — teléfonos; en relacional se normaliza en otra tabla.',
            'Atributo derivado: se calcula — TOTAL = PRECIO × CANTIDAD.',
          ],
        },
        {
          type: 'code',
          code: {
            title: 'Atributos en CO.PRODUCTS',
            sql: `-- Cada columna es un atributo del producto
PRODUCT_ID            → identificador
PRODUCT_NAME          → nombre comercial
PRODUCT_DESCRIPTION   → detalle
CATEGORY_ID           → clasificación
UNIT_PRICE            → precio de venta`,
          },
        },
        {
          type: 'application',
          application: {
            title: 'Cómo se lo dices a un cliente',
            text: '"Cada columna de su catálogo es un atributo: usted decide qué características quiere rastrear. Eso define qué filtros y reportes podrá generar. Si no guardamos el segmento del cliente hoy, no podremos segmentar campañas mañana."',
          },
        },
      ],
    },
    {
      id: 'que-es-entidad',
      title: '¿Qué es una entidad?',
      summary:
        'Un concepto del negocio que hay que registrar y distinguir: Cliente, Producto, Pedido — luego se vuelve tabla.',
      blocks: [
        {
          type: 'paragraph',
          content:
            'En el discovery con el cliente preguntas: "¿Qué cosas del negocio necesitamos registrar?" Cada respuesta — Cliente, Pedido, Tienda — es una entidad: algo que se distingue de otros y tiene propiedades propias. En el modelo lógico, cada entidad fuerte se convierte en una tabla.',
        },
        {
          type: 'list',
          items: [
            'Entidad fuerte: existe por sí sola — CLIENTE, PRODUCTO, TIENDA.',
            'Entidad débil (conceptual): depende de otra — LÍNEA_DE_PEDIDO depende de PEDIDO.',
            'Instancia: un registro concreto — el cliente con ID 5.',
            'Conjunto: todos los clientes = todas las filas de CO.CUSTOMERS.',
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
                optionB: 'Tabla CO.CUSTOMERS con filas reales',
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
          type: 'application',
          application: {
            title: 'En una reunión con el equipo técnico',
            text: 'Puedes decir: "La entidad es el concepto de negocio; la tabla es cómo Oracle lo guarda; la fila es un caso concreto." Así alineas al analista de negocio con el DBA sin escribir DDL.',
          },
        },
      ],
    },
    {
      id: 'clave-primaria',
      title: 'Clave primaria (PK)',
      summary:
        'El "DNI" de cada fila: identifica unívocamente un cliente, un pedido o un producto.',
      blocks: [
        {
          type: 'paragraph',
          content:
            'Sin un identificador único, el sistema no sabe qué pedido actualizar o facturar. La clave primaria (PK) garantiza que cada fila sea identificable: en CO.CUSTOMERS, CUSTOMER_ID no se repite y no puede quedar vacío. Es el ancla de facturas, envíos y reportes.',
        },
        {
          type: 'list',
          items: [
            'Unicidad: dos filas nunca comparten el mismo valor de PK.',
            'No nulidad: la PK no puede ser NULL.',
            'Inmutabilidad recomendada: conviene IDs numéricos, no nombres.',
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
  ORDER_ID     NUMBER,
  LINE_ITEM_ID NUMBER,
  QUANTITY     NUMBER,
  PRIMARY KEY (ORDER_ID, LINE_ITEM_ID)
);`,
          },
        },
        {
          type: 'application',
          application: {
            title: 'Por qué un vendedor Oracle lo necesita',
            text: '"La PK es el DNI de cada registro. Sin ella no puedes referenciar un pedido desde la factura ni desde el envío. Cuando el cliente pide trazabilidad extremo a extremo, estás hablando de claves primarias bien definidas."',
          },
        },
      ],
    },
    {
      id: 'clave-foranea',
      title: 'Clave foránea (FK)',
      summary:
        'El enlace entre tablas: el pedido apunta al cliente sin copiar nombre ni email en cada fila.',
      blocks: [
        {
          type: 'paragraph',
          content:
            'El negocio necesita "ver el pedido con su cliente". La clave foránea (FK) es la columna que referencia la PK de otra tabla: en CO.ORDERS, CUSTOMER_ID apunta a CO.CUSTOMERS. Así vinculas sin duplicar datos — y Oracle impide pedidos con un cliente que no existe.',
        },
        {
          type: 'list',
          items: [
            'Integridad referencial: no insertas un FK que no exista en el padre.',
            'Tabla padre: donde está la PK — CO.CUSTOMERS.',
            'Tabla hija: donde está la FK — CO.ORDERS.',
            'ON DELETE CASCADE (opcional): al borrar el padre, se borran los hijos.',
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
);`,
          },
        },
        {
          type: 'application',
          application: {
            title: 'En una reunión comercial',
            text: '"Los JOINs de los reportes nacen de las FK del diseño. Si el modelo de datos conecta cliente → pedido → producto, el dashboard puede cruzarlos. Si no hay FK claras, el reporte se vuelve frágil o manual."',
          },
        },
      ],
    },
    {
      id: 'relaciones',
      title: 'Relaciones (1:1, 1:N, N:M)',
      summary:
        'Cuántos de A se conectan con cuántos de B: un cliente muchos pedidos; un pedido un cliente.',
      blocks: [
        {
          type: 'paragraph',
          content:
            'En el taller de requisitos el cliente dice: "Un cliente tiene muchos pedidos, pero un pedido es de un solo cliente." Eso es cardinalidad — y define cómo se diseñan las tablas y las FK. Malentenderla genera pantallas y reportes incorrectos.',
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
                optionB: 'EMPLEADO ↔ CREDENCIAL_ACCESO',
              },
              {
                aspect: 'Uno a muchos (1:N)',
                optionA: 'Un A puede tener muchos B; cada B pertenece a un solo A',
                optionB: 'CLIENTE → PEDIDOS',
              },
              {
                aspect: 'Muchos a muchos (N:M)',
                optionA: 'Muchos A se relacionan con muchos B',
                optionB: 'PRODUCTO ↔ PROMOCIÓN (tabla intermedia)',
              },
            ],
          },
        },
        {
          type: 'list',
          items: [
            '1:N es la más común en ERP: FK en la tabla "muchos" (PEDIDOS.CUSTOMER_ID).',
            'N:M requiere tabla puente con FK a ambas entidades.',
            '1:1 puede ser FK con UNIQUE o tablas fusionadas si siempre van juntas.',
          ],
        },
        {
          type: 'code',
          code: {
            title: 'N:M con tabla intermedia',
            sql: `-- Un producto en muchas promociones; una promoción con muchos productos
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
            'Regla práctica para GenO: "un cliente tiene muchos pedidos" → 1:N; la FK va en PEDIDOS, no en CLIENTES.',
        },
      ],
    },
    {
      id: 'modelo-conceptual-vs-logico',
      title: 'Modelo conceptual vs. modelo lógico',
      summary:
        'Primero el lenguaje del negocio (entidades); después el lenguaje de Oracle (tablas, tipos, claves).',
      blocks: [
        {
          type: 'paragraph',
          content:
            'En una reunión con el cliente validas: "¿un pedido puede tener varios envíos?" Eso es modelo conceptual. Cuando el equipo técnico traduce eso a CREATE TABLE con NUMBER y VARCHAR2, es modelo lógico. Saltarse el conceptual lleva a tablas mal alineadas con el negocio; quedarse solo en el conceptual no permite implementar.',
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
                optionA: 'Analistas, clientes, equipo comercial',
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
            'Conceptual: "Un cliente realiza pedidos" — sin decir NUMBER o VARCHAR2.',
            'Lógico: CO.CUSTOMERS(CUSTOMER_ID NUMBER PK) y CO.ORDERS(CUSTOMER_ID FK).',
            'Físico (nivel extra): tablespaces, índices — lo maneja el DBA.',
          ],
        },
        {
          type: 'application',
          application: {
            title: 'En una reunión con el cliente',
            text: 'Primero validas el conceptual ("¿un pedido puede tener varios envíos?"). Cuando el negocio está de acuerdo, el equipo técnico baja al lógico. Tu rol GenO es facilitar esa traducción, no escribir el DDL.',
          },
        },
      ],
    },
    {
      id: 'diagrama-er',
      title: 'Diagrama entidad-relación (ER)',
      summary:
        'El dibujo que alinea negocio y técnica antes de crear tablas: entidades, atributos y cardinalidades.',
      blocks: [
        {
          type: 'paragraph',
          content:
            'Antes de invertir en desarrollo, el cliente necesita ver el mapa: quién se relaciona con quién. El diagrama ER es ese lenguaje visual — entidades, atributos y relaciones con cardinalidad. Te permite discutir el diseño en la pizarra sin abrir SQL Developer.',
        },
        {
          type: 'list',
          items: [
            'Rectángulo: entidad (CLIENTE, PRODUCTO, PEDIDO).',
            'Óvalo / lista: atributos (nombre, precio, fecha).',
            'Rombo / línea: relación ("realiza", "contiene").',
            'Cardinalidad en los extremos: 1, N, M.',
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
            caption: 'Se traduce después a CO.CUSTOMERS, CO.ORDERS y CO.ORDER_ITEMS.',
          },
        },
        {
          type: 'application',
          application: {
            title: 'Cómo se lo dices a un cliente',
            text: '"Este diagrama es el contrato visual del modelo: si aquí falta una relación, el reporte que usted pide no saldrá limpio. Lo validamos juntos antes de que el equipo técnico cree las tablas."',
          },
        },
      ],
    },
    {
      id: 'relacional-vs-nosql',
      title: 'Bases de datos relacionales vs. no relacionales',
      summary:
        'Oracle relacional para ERP y transacciones; NoSQL como complemento cuando la estructura es muy flexible o el volumen es extremo.',
      blocks: [
        {
          type: 'paragraph',
          content:
            'El cliente pregunta: "¿Por qué no MongoDB para todo?" En un ERP de pedidos, facturas e inventario necesitas estructura fija, JOINs e integridad: ahí gana el modelo relacional (Oracle). NoSQL brilla en documentos variables, logs masivos o caché de alta velocidad — suele complementar, no reemplazar, el núcleo transaccional.',
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
                optionA: 'Tablas con esquema definido',
                optionB: 'Documentos, clave-valor, columnas, grafos',
              },
              {
                aspect: 'Consultas',
                optionA: 'SQL con JOINs',
                optionB: 'APIs propias; JOINs clásicos poco frecuentes',
              },
              {
                aspect: 'Integridad',
                optionA: 'PK, FK, transacciones ACID',
                optionB: 'A menudo consistencia eventual en sistemas distribuidos',
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
            'Oracle es relacional: por eso el stack GenO habla SQL y modelado.',
            'NoSQL no sustituye al ERP: complementa casos de estructura cambiante o volumen extremo.',
            'Tipos NoSQL: documento (MongoDB), clave-valor (Redis), columna (Cassandra), grafo (Neo4j).',
          ],
        },
        {
          type: 'application',
          application: {
            title: 'Qué decirle al cliente',
            text: '"Su ERP de pedidos y facturas vive en Oracle relacional porque necesita consistencia y reportes cruzados. Si después quiere analizar millones de eventos de click en la web, ahí evaluamos un complemento NoSQL — sin tocar el núcleo financiero."',
          },
        },
      ],
    },
    {
      id: 'normalizacion',
      title: 'Normalización (idea general)',
      summary:
        'Evitar que el mismo dato se repita en mil filas: cada hecho del negocio vive en un solo lugar (1FN, 2FN, 3FN).',
      blocks: [
        {
          type: 'paragraph',
          content:
            'Sin normalizar, el nombre del cliente se repite en cada pedido: si Ana cambia de ciudad, hay que actualizar docenas de filas o quedas inconsistente. La normalización organiza tablas para que cada dato viva en un lugar. En reporting (SH) a veces se desnormaliza a propósito por velocidad — eso no contradice normalizar el ERP operativo (CO).',
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
                optionB: 'Cada celda tiene un solo valor; no listas en una columna',
              },
              {
                aspect: '2FN',
                optionA: 'Segunda forma normal',
                optionB: 'Cumple 1FN y todo atributo no-PK depende de toda la PK',
              },
              {
                aspect: '3FN',
                optionA: 'Tercera forma normal',
                optionB: 'Cumple 2FN y sin dependencias entre atributos no-PK',
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
CO.CUSTOMERS:   customer_id, full_name, city
CO.ORDERS:      order_id, customer_id (FK), ...
CO.ORDER_ITEMS: order_id, product_id, quantity`,
          },
        },
        {
          type: 'list',
          items: [
            'Ventaja: menos redundancia, actualizaciones más seguras.',
            'Trade-off: más tablas → más JOINs; en reporting a veces se desnormaliza (estrella).',
            'Para GenO: entiende la idea y un ejemplo; no calcules FN formalmente en una llamada.',
          ],
        },
        {
          type: 'note',
          content:
            'La desnormalización en data warehouses (SH) es intencional: se acepta algo de redundancia por velocidad de consulta. El OLTP (CO) sigue normalizado.',
        },
      ],
    },
  ],
}
