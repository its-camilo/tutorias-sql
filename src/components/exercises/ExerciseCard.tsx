import type { Exercise } from '../../types/exercises'
import SqlCarousel from './SqlCarousel'
import ExerciseDiagram from './ExerciseDiagram'
import styles from './ExerciseCard.module.css'

interface ExerciseCardProps {
  exercise: Exercise
}

export default function ExerciseCard({ exercise }: ExerciseCardProps) {
  return (
    <article className={styles.card} id={exercise.id}>
      <header className={styles.header}>
        <div className={styles.meta}>
          <span className={styles.number}>Ejercicio {exercise.number}</span>
          <span className={styles.topic}>{exercise.topic}</span>
        </div>
        <h3 className={styles.title}>{exercise.title}</h3>
      </header>

      <div className={styles.body}>
        <section className={styles.enunciado}>
          <h4 className={styles.sectionLabel}>Enunciado</h4>
          <p className={styles.enunciadoText}>{exercise.enunciado}</p>
          <div className={styles.part}>
            <span className={styles.partTitle}>{exercise.part.title}</span>
            <span className={styles.partGoal}>{exercise.part.goal}</span>
          </div>
          <div className={styles.tables}>
            <span className={styles.tablesLabel}>Tablas:</span>
            {exercise.tables.map((t) => (
              <code key={t} className={styles.tableTag}>{t}</code>
            ))}
          </div>
        </section>

        <section className={styles.context}>
          <span className={styles.contextLabel}>Foco de negocio</span>
          <p className={styles.contextText}>{exercise.context}</p>
        </section>

        {exercise.clientAsk && (
          <aside className={styles.clientAsk}>
            <span className={styles.clientAskLabel}>Explícaselo a un cliente</span>
            <p className={styles.clientAskText}>{exercise.clientAsk}</p>
          </aside>
        )}

        <section>
          <h4 className={styles.sectionLabel}>Construye la consulta paso a paso</h4>
          <SqlCarousel steps={exercise.steps} />
        </section>

        <section>
          <h4 className={styles.sectionLabel}>Qué estás haciendo</h4>
          <ExerciseDiagram variant={exercise.diagram} caption={exercise.diagramCaption} />
        </section>

        {exercise.tip && (
          <aside className={styles.tip}>
            <span className={styles.tipLabel}>Tip FreeSQL</span>
            <p>{exercise.tip}</p>
          </aside>
        )}
      </div>
    </article>
  )
}
