import type { ConceptLevel } from '../../types/concepts'
import styles from './LevelNav.module.css'

interface LevelNavProps {
  levels: ConceptLevel[]
  activeLevel: string
  onSelect: (levelId: string) => void
}

export default function LevelNav({ levels, activeLevel, onSelect }: LevelNavProps) {
  return (
    <nav className={styles.nav} aria-label="Niveles de conceptos">
      <ul className={styles.list}>
        {levels.map((level) => (
          <li key={level.id}>
            <button
              type="button"
              className={activeLevel === level.id ? `${styles.btn} ${styles.btnActive}` : styles.btn}
              onClick={() => onSelect(level.id)}
              aria-current={activeLevel === level.id ? 'true' : undefined}
            >
              <span className={styles.number}>
                {level.number === 0 ? 'S0' : level.number}
              </span>
              <span className={styles.label}>{level.title}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
