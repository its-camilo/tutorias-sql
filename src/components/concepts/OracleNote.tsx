import styles from './OracleNote.module.css'

interface OracleNoteProps {
  text: string
}

export default function OracleNote({ text }: OracleNoteProps) {
  return (
    <aside className={styles.note}>
      <span className={styles.badge}>Oracle</span>
      <p className={styles.text}>{text}</p>
    </aside>
  )
}
