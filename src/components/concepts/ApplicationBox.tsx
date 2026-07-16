import styles from './ApplicationBox.module.css'

interface ApplicationBoxProps {
  title: string
  text: string
}

export default function ApplicationBox({ title, text }: ApplicationBoxProps) {
  return (
    <aside className={styles.box}>
      <span className={styles.label}>Aplicación práctica</span>
      <h4 className={styles.title}>{title}</h4>
      <p className={styles.text}>{text}</p>
    </aside>
  )
}
