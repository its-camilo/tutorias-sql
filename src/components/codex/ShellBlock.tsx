import styles from './ShellBlock.module.css'

interface ShellBlockProps {
  title?: string
  code: string
  caption?: string
}

export default function ShellBlock({ title, code, caption }: ShellBlockProps) {
  return (
    <figure className={styles.figure}>
      {title && <figcaption className={styles.title}>{title}</figcaption>}
      <pre className={styles.pre}>
        <code className={styles.code}>{code.trim()}</code>
      </pre>
      {caption && <p className={styles.caption}>{caption}</p>}
    </figure>
  )
}
