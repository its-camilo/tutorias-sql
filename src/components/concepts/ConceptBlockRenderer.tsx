import type { ConceptBlock } from '../../types/concepts'
import CodeBlock from './CodeBlock'
import ComparisonTable from './ComparisonTable'
import ApplicationBox from './ApplicationBox'
import OracleNote from './OracleNote'
import Diagram from './Diagram'
import styles from './ConceptBlockRenderer.module.css'

interface ConceptBlockRendererProps {
  block: ConceptBlock
}

export default function ConceptBlockRenderer({ block }: ConceptBlockRendererProps) {
  switch (block.type) {
    case 'paragraph':
      return <p className={styles.paragraph}>{block.content}</p>

    case 'list':
      return (
        <ul className={styles.list}>
          {block.items?.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )

    case 'code':
      return block.code ? (
        <CodeBlock
          title={block.code.title}
          sql={block.code.sql}
          caption={block.code.caption}
        />
      ) : null

    case 'comparison':
      return block.comparison ? (
        <ComparisonTable
          title={block.comparison.title}
          headerA={block.comparison.headerA}
          headerB={block.comparison.headerB}
          rows={block.comparison.rows}
        />
      ) : null

    case 'diagram':
      return block.diagram ? <Diagram variant={block.diagram} /> : null

    case 'application':
      return block.application ? (
        <ApplicationBox title={block.application.title} text={block.application.text} />
      ) : null

    case 'note':
      return block.content ? <OracleNote text={block.content} /> : null

    default:
      return null
  }
}
