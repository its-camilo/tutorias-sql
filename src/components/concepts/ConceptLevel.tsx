import type { ConceptLevel as ConceptLevelType } from '../../types/concepts'
import ConceptCard from './ConceptCard'
import styles from './ConceptLevel.module.css'

interface ConceptLevelProps {
  level: ConceptLevelType
}

export default function ConceptLevel({ level }: ConceptLevelProps) {
  return (
    <section className={styles.section} id={level.id} aria-labelledby={`${level.id}-heading`}>
      <header className={styles.header}>
        <span className={styles.badge}>
          {level.number === 0 ? 'Sección 0' : `Nivel ${level.number}`}
        </span>
        <h2 id={`${level.id}-heading`} className={styles.title}>
          {level.title}
        </h2>
        <p className={styles.subtitle}>{level.subtitle}</p>
      </header>

      <div className={styles.concepts}>
        {level.concepts.map((concept, index) => (
          <ConceptCard key={concept.id} concept={concept} index={index} />
        ))}
      </div>
    </section>
  )
}
