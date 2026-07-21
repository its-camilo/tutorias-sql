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
        <h2 className={styles.heading}>Hablar el idioma de los datos</h2>
        <p className={styles.description}>
          Preparación para el perfil Comercial de Generation Oracle (GenO):
          entiende conceptos SQL y de modelado lo suficiente para conversar con
          equipos técnicos y explicar valor de negocio a un cliente — sin ser
          especialista en código.
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
