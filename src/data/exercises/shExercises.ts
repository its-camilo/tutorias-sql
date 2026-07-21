import type { Exercise } from '../../types/exercises'
import { buildSteps } from './mergeSteps'

export const shExercises: Exercise[] = [
  {
    id: 'sh-modelo-dimensional',
    number: 1,
    title: 'Reporte en esquema estrella',
    topic: 'Esquema estrella · JOIN · agregación',
    enunciado:
      'Construye un reporte analítico conectando ventas (hechos) con producto, tiempo y canal (dimensiones). Es el patrón que Oracle usa en Sales History para responder preguntas de negocio sin tecnicismos.',
    part: {
      title: 'De hechos a historia comercial',
      goal: 'Une SH.SALES con PRODUCTS, TIMES y CHANNELS; agrupa por trimestre, categoría y canal.',
    },
    context:
      'En una conversación comercial, hechos = lo que se midió (monto vendido); dimensiones = el contexto (qué, cuándo, por qué canal). Explicar esa diferencia es más valioso que memorizar la sintaxis del JOIN.',
    clientAsk:
      '¿Cómo le explicarías en 30 segundos a un cliente por qué el reporte separa “ventas” de “producto/tiempo/canal”? Ejemplo: "Las ventas son los números; producto, tiempo y canal son las preguntas que les damos sentido — qué se vendió, cuándo y por dónde."',
    tables: ['SH.SALES', 'SH.PRODUCTS', 'SH.TIMES', 'SH.CHANNELS'],
    steps: buildSteps([
      {
        label: 'Partir de los hechos',
        description: 'SH.SALES es el centro: cada fila es una venta medible.',
        sql: 'SELECT s.AMOUNT_SOLD\nFROM SH.SALES s',
      },
      {
        label: 'Agregar dimensiones',
        description: 'Conectas producto, trimestre y canal para dar contexto comercial a cada monto.',
        sql: 'SELECT t.CALENDAR_QUARTER_DESC,\n       p.PROD_CATEGORY,\n       ch.CHANNEL_DESC,\n       SUM(s.AMOUNT_SOLD) AS total\nFROM SH.SALES s\nJOIN SH.PRODUCTS p  ON p.PROD_ID     = s.PROD_ID\nJOIN SH.TIMES t     ON t.TIME_ID     = s.TIME_ID\nJOIN SH.CHANNELS ch ON ch.CHANNEL_ID = s.CHANNEL_ID\nGROUP BY t.CALENDAR_QUARTER_DESC,\n         p.PROD_CATEGORY,\n         ch.CHANNEL_DESC\nORDER BY total DESC\nFETCH FIRST 10 ROWS ONLY',
      },
    ]),
    diagram: 'sh-star-schema',
    diagramCaption:
      'Hechos en el centro, dimensiones alrededor: el esquema estrella que alimenta reportes de negocio.',
    tip: 'En el Navigator expande SH.SALES y revisa las claves foráneas hacia las dimensiones antes de ejecutar.',
  },
]
