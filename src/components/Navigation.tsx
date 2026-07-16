import { NavLink } from 'react-router-dom'
import styles from './Navigation.module.css'

const sections = [
  {
    path: '/conceptos-basicos',
    label: 'Conceptos básicos',
    comment: '-- fundamentos',
  },
  {
    path: '/ejercicio',
    label: 'Ejercicio',
    comment: '-- práctica',
  },
  {
    path: '/integracion-codex',
    label: 'Integración con Codex',
    comment: '-- herramientas',
  },
] as const

export default function Navigation() {
  return (
    <nav className={styles.nav} aria-label="Secciones de la tutoría">
      <ul className={styles.list}>
        {sections.map(({ path, label, comment }) => (
          <li key={path}>
            <NavLink
              to={path}
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.linkActive}` : styles.link
              }
            >
              <span className={styles.comment} aria-hidden="true">
                {comment}
              </span>
              <span className={styles.label}>{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
