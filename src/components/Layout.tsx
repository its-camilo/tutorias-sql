import { Outlet } from 'react-router-dom'
import Header from './Header'
import Navigation from './Navigation'
import AspectContainer from './AspectContainer'
import styles from './Layout.module.css'

export default function Layout() {
  return (
    <div className={styles.shell}>
      <div className={styles.gridOverlay} aria-hidden="true" />

      <Header />

      <main className={styles.main}>
        <AspectContainer>
          <Navigation />
          <div className={styles.content}>
            <Outlet />
          </div>
        </AspectContainer>
      </main>

      <footer className={styles.footer}>
        <span className={styles.footerPrompt}>SQL&gt;</span>
        <span className={styles.footerText}>Tutorías para examen Oracle</span>
      </footer>
    </div>
  )
}
