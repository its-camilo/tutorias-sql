import styles from './PlatformTabs.module.css'

export type Platform = 'mac' | 'windows'

interface PlatformSelectorProps {
  value: Platform
  onChange: (platform: Platform) => void
}

export default function PlatformSelector({ value, onChange }: PlatformSelectorProps) {
  return (
    <div className={styles.selectorBar} role="tablist" aria-label="Sistema operativo">
      <span className={styles.selectorLabel}>Instrucciones para</span>
      <button
        type="button"
        role="tab"
        className={value === 'mac' ? `${styles.tab} ${styles.tabActive}` : styles.tab}
        onClick={() => onChange('mac')}
        aria-selected={value === 'mac'}
      >
        macOS
      </button>
      <button
        type="button"
        role="tab"
        className={value === 'windows' ? `${styles.tab} ${styles.tabActive}` : styles.tab}
        onClick={() => onChange('windows')}
        aria-selected={value === 'windows'}
      >
        Windows
      </button>
    </div>
  )
}
