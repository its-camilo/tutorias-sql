import type { Exercise } from '../../types/exercises'
import { buildSteps } from './mergeSteps'

export const shExercises: Exercise[] = [
  {
    id: 'sh-modelo-dimensional',
    number: 1,
    title: 'Modelo dimensional',
    topic: 'Esquema estrella · multi-JOIN · agregación',
    enunciado:
      'Construye un reporte analítico conectando SH.SALES con sus dimensiones de tiempo, producto y canal.',
    part: {
      title: 'Esquema estrella completo',
      goal: 'Une SH.SALES con SH.PRODUCTS, SH.TIMES y SH.CHANNELS; agrupa por trimestre, categoría y canal.',
    },
    context:
      'El patrón estrella concentra hechos en el centro y dimensiones alrededor para reportes analíticos rápidos.',
    tables: ['SH.SALES', 'SH.PRODUCTS', 'SH.TIMES', 'SH.CHANNELS'],
    steps: buildSteps([
      {
        label: 'FROM SH.SALES',
        description: 'Partes de la tabla de hechos, el centro del esquema estrella.',
        sql: 'SELECT s.AMOUNT_SOLD\nFROM SH.SALES s',
      },
      {
        label: 'JOIN SH.PRODUCTS',
        description: 'Agregas contexto de producto uniendo por PROD_ID.',
        sql: 'SELECT s.AMOUNT_SOLD, p.PROD_CATEGORY\nFROM SH.SALES s\nJOIN SH.PRODUCTS p ON p.PROD_ID = s.PROD_ID',
      },
      {
        label: 'JOIN SH.TIMES',
        description: 'Enriqueces cada venta con el trimestre calendario desde la dimensión de tiempo.',
        sql: 'SELECT s.AMOUNT_SOLD,\n       p.PROD_CATEGORY,\n       t.CALENDAR_QUARTER_DESC\nFROM SH.SALES s\nJOIN SH.PRODUCTS p ON p.PROD_ID = s.PROD_ID\nJOIN SH.TIMES t ON t.TIME_ID = s.TIME_ID',
      },
      {
        label: 'JOIN SH.CHANNELS',
        description: 'Conectas el canal de distribución para completar las tres dimensiones.',
        sql: 'SELECT s.AMOUNT_SOLD,\n       p.PROD_CATEGORY,\n       t.CALENDAR_QUARTER_DESC,\n       ch.CHANNEL_DESC\nFROM SH.SALES s\nJOIN SH.PRODUCTS p  ON p.PROD_ID     = s.PROD_ID\nJOIN SH.TIMES t     ON t.TIME_ID     = s.TIME_ID\nJOIN SH.CHANNELS ch ON ch.CHANNEL_ID = s.CHANNEL_ID',
      },
      {
        label: 'GROUP BY dimensiones',
        description: 'Agrupas por trimestre, categoría y canal para preparar la agregación.',
        sql: 'SELECT t.CALENDAR_QUARTER_DESC,\n       p.PROD_CATEGORY,\n       ch.CHANNEL_DESC,\n       SUM(s.AMOUNT_SOLD) AS total\nFROM SH.SALES s\nJOIN SH.PRODUCTS p  ON p.PROD_ID     = s.PROD_ID\nJOIN SH.TIMES t     ON t.TIME_ID     = s.TIME_ID\nJOIN SH.CHANNELS ch ON ch.CHANNEL_ID = s.CHANNEL_ID\nGROUP BY t.CALENDAR_QUARTER_DESC,\n         p.PROD_CATEGORY,\n         ch.CHANNEL_DESC',
      },
      {
        label: 'Consulta final',
        description: 'Ordenas por monto descendente y limitas a 10 filas para ver los tops del reporte.',
        sql: 'SELECT t.CALENDAR_QUARTER_DESC,\n       p.PROD_CATEGORY,\n       ch.CHANNEL_DESC,\n       SUM(s.AMOUNT_SOLD) AS total\nFROM SH.SALES s\nJOIN SH.PRODUCTS p  ON p.PROD_ID     = s.PROD_ID\nJOIN SH.TIMES t     ON t.TIME_ID     = s.TIME_ID\nJOIN SH.CHANNELS ch ON ch.CHANNEL_ID = s.CHANNEL_ID\nGROUP BY t.CALENDAR_QUARTER_DESC,\n         p.PROD_CATEGORY,\n         ch.CHANNEL_DESC\nORDER BY total DESC\nFETCH FIRST 10 ROWS ONLY',
      },
    ]),
    diagram: 'sh-star-schema',
    diagramCaption:
      'SH.SALES en el centro conecta directamente a dimensiones — el patrón estrella en una sola consulta.',
    tip: 'En el Navigator expande SH.SALES para ver medidas y claves foráneas antes de ejecutar.',
  },
]
