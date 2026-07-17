import { useCallback, useState } from 'react'
import { conceptLevels } from '../data/conceptLevels'
import LevelNav from '../components/concepts/LevelNav'
import ConceptLevel from '../components/concepts/ConceptLevel'
import styles from './ConceptosBasicos.module.css'

export default function ConceptosBasicos() {
  const [activeLevel, setActiveLevel] = useState(conceptLevels[0].id)
  const activeLevelData =
    conceptLevels.find((level) => level.id === activeLevel) ?? conceptLevels[0]

  const handleLevelSelect = useCallback((levelId: string) => {
    setActiveLevel(levelId)
  }, [])

  return (
    <div className={styles.page}>
      <header className={styles.intro}>
        <p className={styles.eyebrow} aria-hidden="true">
          /* conceptos */
        </p>
        <h2 className={styles.heading}>De básico a avanzado</h2>
        <p className={styles.description}>
          Referencia estructurada para el examen Oracle: fundamentos teóricos,
          consultas SQL, modelado dimensional y PL/SQL.
        </p>
      </header>

      <LevelNav
        levels={conceptLevels}
        activeLevel={activeLevel}
        onSelect={handleLevelSelect}
      />

      <div className={styles.body}>
        <ConceptLevel key={activeLevelData.id} level={activeLevelData} />
      </div>
    </div>
  )
}
