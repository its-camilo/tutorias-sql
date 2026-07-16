import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.badge} aria-hidden="true">
          <span className={styles.badgeKeyword}>SELECT</span>
          <span className={styles.badgeStar}>*</span>
          <span className={styles.badgeKeyword}>FROM</span>
        </div>

        <h1 className={styles.title}>
          Tutorías <em>SQL</em>
        </h1>

        <p className={styles.subtitle}>
          Preparación para examen Oracle
        </p>
      </div>
    </header>
  )
}
