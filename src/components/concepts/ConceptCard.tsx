import type { Concept } from '../../types/concepts'
import ConceptBlockRenderer from './ConceptBlockRenderer'
import styles from './ConceptCard.module.css'

interface ConceptCardProps {
  concept: Concept
  index: number
}

export default function ConceptCard({ concept, index }: ConceptCardProps) {
  return (
    <article className={styles.card} id={concept.id}>
      <header className={styles.header}>
        <span className={styles.index} aria-hidden="true">
          {String(index + 1).padStart(2, '0')}
        </span>
        <div>
          <h3 className={styles.title}>{concept.title}</h3>
          <p className={styles.summary}>{concept.summary}</p>
        </div>
      </header>
      <div className={styles.body}>
        {concept.blocks.map((block, i) => (
          <ConceptBlockRenderer key={`${concept.id}-block-${i}`} block={block} />
        ))}
      </div>
    </article>
  )
}
