import { useCallback, useState } from 'react'
import { exerciseSchemas } from '../data/exercises'
import FreeSqlIntro from '../components/exercises/FreeSqlIntro'
import SchemaSection from '../components/exercises/SchemaSection'
import styles from './Ejercicio.module.css'

export default function Ejercicio() {
  const [activeSchema, setActiveSchema] = useState(exerciseSchemas[0].id)
  const activeSchemaData =
    exerciseSchemas.find((schema) => schema.id === activeSchema) ?? exerciseSchemas[0]

  const handleSchemaSelect = useCallback((schemaId: 'co' | 'sh') => {
    setActiveSchema(schemaId)
  }, [])

  return (
    <div className={styles.page}>
      <FreeSqlIntro />

      <nav className={styles.schemaNav} aria-label="Esquemas de ejercicios">
        <ul className={styles.schemaList}>
          {exerciseSchemas.map((schema) => (
            <li key={schema.id}>
              <button
                type="button"
                className={
                  activeSchema === schema.id
                    ? `${styles.schemaBtn} ${styles.schemaBtnActive}`
                    : styles.schemaBtn
                }
                onClick={() => handleSchemaSelect(schema.id)}
                aria-current={activeSchema === schema.id ? 'true' : undefined}
              >
                <span className={styles.schemaCode}>{schema.shortName}</span>
                <span className={styles.schemaName}>{schema.name}</span>
                <span className={styles.schemaCount}>
                  {schema.exercises.length} ejercicios
                </span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.schemas}>
        <SchemaSection key={activeSchemaData.id} schema={activeSchemaData} />
      </div>
    </div>
  )
}
