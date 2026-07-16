import type { SchemaTable } from '../../types/exercises'

export const coTables: SchemaTable[] = [
  {
    name: 'CO.CUSTOMERS',
    description: 'Clientes del ERP. Cada fila es una cuenta con la que se pueden asociar pedidos.',
    columns: [
      { name: 'CUSTOMER_ID', type: 'INTEGER', key: 'PK' },
      { name: 'EMAIL_ADDRESS', type: 'VARCHAR2(255)', key: undefined },
      { name: 'FULL_NAME', type: 'VARCHAR2(255)', key: undefined },
    ],
  },
  {
    name: 'CO.STORES',
    description: 'Tiendas físicas u online donde se registran los pedidos.',
    columns: [
      { name: 'STORE_ID', type: 'INTEGER', key: 'PK' },
      { name: 'STORE_NAME', type: 'VARCHAR2(255)', key: undefined },
      { name: 'WEB_ADDRESS', type: 'VARCHAR2(100)', key: undefined },
      { name: 'PHYSICAL_ADDRESS', type: 'VARCHAR2(512)', key: undefined },
      { name: 'LATITUDE', type: 'NUMBER(9,6)', key: undefined },
      { name: 'LONGITUDE', type: 'NUMBER(9,6)', key: undefined },
    ],
  },
  {
    name: 'CO.PRODUCTS',
    description: 'Catálogo de productos vendibles con precio unitario.',
    columns: [
      { name: 'PRODUCT_ID', type: 'INTEGER', key: 'PK' },
      { name: 'PRODUCT_NAME', type: 'VARCHAR2(255)', key: undefined },
      { name: 'UNIT_PRICE', type: 'NUMBER(10,2)', key: undefined },
    ],
  },
  {
    name: 'CO.ORDERS',
    description: 'Pedidos realizados por clientes en una tienda. Cabecera de la venta.',
    columns: [
      { name: 'ORDER_ID', type: 'INTEGER', key: 'PK' },
      { name: 'ORDER_TMS', type: 'TIMESTAMP', key: undefined },
      { name: 'CUSTOMER_ID', type: 'INTEGER', key: 'FK' },
      { name: 'ORDER_STATUS', type: 'VARCHAR2(10)', key: undefined },
      { name: 'STORE_ID', type: 'INTEGER', key: 'FK' },
    ],
  },
  {
    name: 'CO.ORDER_ITEMS',
    description: 'Líneas de detalle de cada pedido: qué producto, cuántas unidades y a qué precio.',
    columns: [
      { name: 'ORDER_ID', type: 'INTEGER', key: 'FK' },
      { name: 'LINE_ITEM_ID', type: 'INTEGER', key: 'PK' },
      { name: 'PRODUCT_ID', type: 'INTEGER', key: 'FK' },
      { name: 'UNIT_PRICE', type: 'NUMBER(10,2)', key: undefined },
      { name: 'QUANTITY', type: 'INTEGER', key: undefined },
      { name: 'SHIPMENT_ID', type: 'INTEGER', key: 'FK' },
    ],
  },
  {
    name: 'CO.SHIPMENTS',
    description: 'Envíos asociados a líneas de pedido hacia un cliente.',
    columns: [
      { name: 'SHIPMENT_ID', type: 'INTEGER', key: 'PK' },
      { name: 'STORE_ID', type: 'INTEGER', key: 'FK' },
      { name: 'CUSTOMER_ID', type: 'INTEGER', key: 'FK' },
      { name: 'DELIVERY_ADDRESS', type: 'VARCHAR2(512)', key: undefined },
      { name: 'SHIPMENT_STATUS', type: 'VARCHAR2(100)', key: undefined },
    ],
  },
  {
    name: 'CO.INVENTORY',
    description: 'Stock disponible de cada producto por tienda.',
    columns: [
      { name: 'INVENTORY_ID', type: 'INTEGER', key: 'PK' },
      { name: 'STORE_ID', type: 'INTEGER', key: 'FK' },
      { name: 'PRODUCT_ID', type: 'INTEGER', key: 'FK' },
      { name: 'PRODUCT_INVENTORY', type: 'INTEGER', key: undefined },
    ],
  },
]
