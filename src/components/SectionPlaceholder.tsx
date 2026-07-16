import styles from './SectionPlaceholder.module.css'

interface SectionPlaceholderProps {
  section: string
  description: string
}

export default function SectionPlaceholder({
  section,
  description,
}: SectionPlaceholderProps) {
  return (
    <section className={styles.section} aria-labelledby="section-heading">
      <header className={styles.header}>
        <p className={styles.eyebrow} aria-hidden="true">
          /* sección */
        </p>
        <h2 id="section-heading" className={styles.heading}>
          {section}
        </h2>
        <p className={styles.description}>{description}</p>
      </header>

      <div className={styles.empty} role="status">
        <span className={styles.emptyIcon} aria-hidden="true">
          ░
        </span>
        <p className={styles.emptyText}>
          El contenido de esta sección se agregará próximamente.
        </p>
      </div>
    </section>
  )
}
