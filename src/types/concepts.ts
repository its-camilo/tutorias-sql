export type DiagramVariant =
  | 'query-flow'
  | 'join-inner'
  | 'join-left'
  | 'join-right'
  | 'star-schema'
  | 'snowflake-schema'
  | 'plsql-block'
  | 'transaction'
  | 'where-having'

export interface CodeExample {
  title?: string
  sql: string
  caption?: string
}

export interface ComparisonRow {
  aspect: string
  optionA: string
  optionB: string
}

export interface ConceptBlock {
  type: 'paragraph' | 'list' | 'code' | 'comparison' | 'diagram' | 'application' | 'note'
  content?: string
  items?: string[]
  code?: CodeExample
  comparison?: {
    title: string
    headerA: string
    headerB: string
    rows: ComparisonRow[]
  }
  diagram?: DiagramVariant
  application?: {
    title: string
    text: string
  }
}

export interface Concept {
  id: string
  title: string
  summary: string
  blocks: ConceptBlock[]
}

export interface ConceptLevel {
  id: string
  number: number
  title: string
  subtitle: string
  concepts: Concept[]
}
