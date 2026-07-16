import type { ReactNode } from 'react'
import styles from './AspectContainer.module.css'

interface AspectContainerProps {
  children: ReactNode
}

export default function AspectContainer({ children }: AspectContainerProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.frame}>
        <div className={styles.viewport}>{children}</div>
      </div>
    </div>
  )
}
