import { useCallback, useState } from 'react'
import type { SqlStep } from '../../types/exercises'
import CodeBlock from '../concepts/CodeBlock'
import styles from './SqlCarousel.module.css'

interface SqlCarouselProps {
  steps: SqlStep[]
}

function CopySqlButton({ sql }: { sql: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(sql.trim())
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }, [sql])

  return (
    <button
      type="button"
      className={copied ? `${styles.copyBtn} ${styles.copyBtnDone}` : styles.copyBtn}
      onClick={handleCopy}
      aria-label={copied ? 'Consulta copiada' : 'Copiar consulta SQL'}
    >
      {copied ? 'Copiado ✓' : 'Copiar'}
    </button>
  )
}

export default function SqlCarousel({ steps }: SqlCarouselProps) {
  const [active, setActive] = useState(0)
  const total = steps.length

  const goTo = useCallback(
    (index: number) => {
      if (index >= 0 && index < total) setActive(index)
    },
    [total],
  )

  const current = steps[active]

  return (
    <div className={styles.carousel}>
      <div className={styles.header}>
        <span className={styles.counter}>
          Paso {current.step} de {total}
        </span>
        <span className={styles.label}>{current.label}</span>
      </div>

      <div className={styles.viewport}>
        <div key={current.step} className={styles.card}>
          <span className={styles.cardStep}>{String(current.step).padStart(2, '0')}</span>
          <div className={styles.codeWrap}>
            <CodeBlock sql={current.sql} />
            <CopySqlButton sql={current.sql} />
          </div>
          <p className={styles.description}>{current.description}</p>
        </div>
      </div>

      <div className={styles.controls}>
        <button
          type="button"
          className={styles.navBtn}
          onClick={() => goTo(active - 1)}
          disabled={active === 0}
          aria-label="Paso anterior"
        >
          ← Anterior
        </button>

        <div className={styles.dots} role="tablist" aria-label="Pasos del ejercicio">
          {steps.map((step, index) => (
            <button
              key={step.step}
              type="button"
              role="tab"
              className={index === active ? `${styles.dot} ${styles.dotActive}` : styles.dot}
              onClick={() => goTo(index)}
              aria-selected={index === active}
              aria-label={`Paso ${step.step}: ${step.label}`}
            />
          ))}
        </div>

        <button
          type="button"
          className={styles.navBtn}
          onClick={() => goTo(active + 1)}
          disabled={active === total - 1}
          aria-label="Paso siguiente"
        >
          Siguiente →
        </button>
      </div>
    </div>
  )
}
