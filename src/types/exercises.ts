export interface SqlStep {
  step: number
  label: string
  description: string
  sql: string
}

export interface ExercisePart {
  title: string
  goal: string
}

export type ExerciseDiagramVariant =
  | 'co-filter-orders'
  | 'co-aggregate-customers'
  | 'co-having-vip'
  | 'co-join-order-detail'
  | 'co-join-top-product'
  | 'co-left-join-inactive'
  | 'co-subquery-avg'
  | 'co-subquery-correlated'
  | 'co-join-inventory'
  | 'co-procedure'
  | 'co-function'
  | 'co-cursor'
  | 'co-exception'
  | 'sh-fact-table'
  | 'sh-dimensions'
  | 'sh-star-schema'
  | 'sh-quarter-sales'
  | 'sh-channel-sales'
  | 'sh-promo-sales'

export interface Exercise {
  id: string
  number: number
  title: string
  topic: string
  enunciado: string
  part: ExercisePart
  context: string
  /** Pregunta comercial: explicar el resultado a un cliente en lenguaje de negocio */
  clientAsk?: string
  steps: SqlStep[]
  diagram: ExerciseDiagramVariant
  diagramCaption: string
  tables: string[]
  tip?: string
}

export interface SchemaColumn {
  name: string
  type: string
  key?: 'PK' | 'FK'
}

export interface SchemaTable {
  name: string
  description: string
  columns: SchemaColumn[]
}

export interface ExerciseSchema {
  id: 'co' | 'sh'
  name: string
  shortName: string
  badge: string
  description: string
  purpose: string
  tables: SchemaTable[]
  exercises: Exercise[]
}
