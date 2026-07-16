import type { ExerciseSchema } from '../../types/exercises'
import SchemaTables from './SchemaTables'
import ExerciseCard from './ExerciseCard'
import styles from './SchemaSection.module.css'

interface SchemaSectionProps {
  schema: ExerciseSchema
}

export default function SchemaSection({ schema }: SchemaSectionProps) {
  return (
    <section className={styles.section} id={`schema-${schema.id}`}>
      <header className={styles.header}>
        <div className={styles.badges}>
          <span className={styles.schemaBadge}>{schema.shortName}</span>
          <span className={styles.purposeBadge}>{schema.badge}</span>
        </div>
        <h2 className={styles.title}>{schema.name}</h2>
        <p className={styles.description}>{schema.description}</p>
        <p className={styles.purpose}>{schema.purpose}</p>
      </header>

      <div className={styles.tablesSection}>
        <h3 className={styles.sectionTitle}>Estructura de tablas</h3>
        <p className={styles.sectionHint}>
          Selecciona <strong>{schema.name} ({schema.shortName})</strong> en el Navigator de FreeSQL
          para explorar estas tablas.
        </p>
        <SchemaTables tables={schema.tables} />
      </div>

      <div className={styles.exercisesSection}>
        <h3 className={styles.sectionTitle}>
          Ejercicios ({schema.exercises.length})
        </h3>
        <div className={styles.exercises}>
          {schema.exercises.map((exercise) => (
            <ExerciseCard key={exercise.id} exercise={exercise} />
          ))}
        </div>
      </div>
    </section>
  )
}
