import type { SchemaTable } from '../../types/exercises'

export const shTables: SchemaTable[] = [
  {
    name: 'SH.SALES',
    description: 'Tabla de hechos. Cada fila es una venta individual con monto y cantidad.',
    columns: [
      { name: 'PROD_ID', type: 'NUMBER(6)', key: 'FK' },
      { name: 'CUST_ID', type: 'NUMBER', key: 'FK' },
      { name: 'TIME_ID', type: 'DATE', key: 'FK' },
      { name: 'CHANNEL_ID', type: 'NUMBER(1)', key: 'FK' },
      { name: 'PROMO_ID', type: 'NUMBER(6)', key: 'FK' },
      { name: 'QUANTITY_SOLD', type: 'NUMBER(3)', key: undefined },
      { name: 'AMOUNT_SOLD', type: 'NUMBER(10,2)', key: undefined },
    ],
  },
  {
    name: 'SH.TIMES',
    description: 'Dimensión de tiempo con atributos de calendario y fiscal (día, mes, trimestre, año).',
    columns: [
      { name: 'TIME_ID', type: 'DATE', key: 'PK' },
      { name: 'DAY_NAME', type: 'VARCHAR2(9)', key: undefined },
      { name: 'CALENDAR_MONTH_DESC', type: 'VARCHAR2(8)', key: undefined },
      { name: 'CALENDAR_QUARTER_DESC', type: 'CHAR(7)', key: undefined },
      { name: 'CALENDAR_QUARTER_NUMBER', type: 'NUMBER(1)', key: undefined },
      { name: 'CALENDAR_YEAR', type: 'NUMBER(4)', key: undefined },
      { name: 'FISCAL_QUARTER_DESC', type: 'CHAR(7)', key: undefined },
      { name: 'FISCAL_YEAR', type: 'NUMBER(4)', key: undefined },
    ],
  },
  {
    name: 'SH.CUSTOMERS',
    description: 'Dimensión de clientes con datos demográficos y de ubicación.',
    columns: [
      { name: 'CUST_ID', type: 'NUMBER', key: 'PK' },
      { name: 'CUST_FIRST_NAME', type: 'VARCHAR2(20)', key: undefined },
      { name: 'CUST_LAST_NAME', type: 'VARCHAR2(40)', key: undefined },
      { name: 'CUST_CITY', type: 'VARCHAR2(30)', key: undefined },
      { name: 'CUST_STATE_PROVINCE', type: 'VARCHAR2(40)', key: undefined },
      { name: 'COUNTRY_ID', type: 'NUMBER', key: 'FK' },
      { name: 'CUST_INCOME_LEVEL', type: 'VARCHAR2(30)', key: undefined },
      { name: 'CUST_CREDIT_LIMIT', type: 'NUMBER', key: undefined },
    ],
  },
  {
    name: 'SH.PRODUCTS',
    description: 'Dimensión de productos con categoría, subcategoría y precios de lista.',
    columns: [
      { name: 'PROD_ID', type: 'NUMBER(6)', key: 'PK' },
      { name: 'PROD_NAME', type: 'VARCHAR2(50)', key: undefined },
      { name: 'PROD_DESC', type: 'VARCHAR2(2000)', key: undefined },
      { name: 'PROD_CATEGORY', type: 'VARCHAR2(50)', key: undefined },
      { name: 'PROD_SUBCATEGORY', type: 'VARCHAR2(50)', key: undefined },
      { name: 'PROD_LIST_PRICE', type: 'NUMBER(8,2)', key: undefined },
    ],
  },
  {
    name: 'SH.CHANNELS',
    description: 'Dimensión de canales de venta (directo, internet, catálogo, etc.).',
    columns: [
      { name: 'CHANNEL_ID', type: 'NUMBER(1)', key: 'PK' },
      { name: 'CHANNEL_DESC', type: 'VARCHAR2(20)', key: undefined },
      { name: 'CHANNEL_CLASS', type: 'VARCHAR2(20)', key: undefined },
      { name: 'CHANNEL_CLASS_ID', type: 'NUMBER(1)', key: undefined },
    ],
  },
  {
    name: 'SH.PROMOTIONS',
    description: 'Dimensión de promociones con fechas, costo y categoría de campaña.',
    columns: [
      { name: 'PROMO_ID', type: 'NUMBER(6)', key: 'PK' },
      { name: 'PROMO_NAME', type: 'VARCHAR2(30)', key: undefined },
      { name: 'PROMO_SUBCATEGORY', type: 'VARCHAR2(30)', key: undefined },
      { name: 'PROMO_CATEGORY', type: 'VARCHAR2(30)', key: undefined },
      { name: 'PROMO_COST', type: 'NUMBER(10,2)', key: undefined },
      { name: 'PROMO_BEGIN_DATE', type: 'DATE', key: undefined },
      { name: 'PROMO_END_DATE', type: 'DATE', key: undefined },
    ],
  },
  {
    name: 'SH.COUNTRIES',
    description: 'Dimensión geográfica de países, regiones y subregiones.',
    columns: [
      { name: 'COUNTRY_ID', type: 'NUMBER', key: 'PK' },
      { name: 'COUNTRY_ISO_CODE', type: 'CHAR(2)', key: undefined },
      { name: 'COUNTRY_NAME', type: 'VARCHAR2(40)', key: undefined },
      { name: 'COUNTRY_REGION', type: 'VARCHAR2(20)', key: undefined },
      { name: 'COUNTRY_SUBREGION', type: 'VARCHAR2(30)', key: undefined },
    ],
  },
]
