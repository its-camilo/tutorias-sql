import styles from './FreeSqlIntro.module.css'

export default function FreeSqlIntro() {
  return (
    <section className={styles.intro}>
      <p className={styles.eyebrow} aria-hidden="true">
        /* herramienta */
      </p>
      <h2 className={styles.heading}>Practica con Oracle FreeSQL</h2>
      <p className={styles.lead}>
        Los ejercicios se realizan en{' '}
        <a
          href="https://freesql.com"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          freesql.com
        </a>
        , el entorno gratuito de Oracle para escribir y ejecutar SQL desde el navegador,
        sin instalar nada.
      </p>

      <div className={styles.steps}>
        <div className={styles.step}>
          <span className={styles.stepNum}>1</span>
          <div>
            <h3 className={styles.stepTitle}>Crea tu cuenta</h3>
            <p className={styles.stepText}>
              Regístrate gratis en freesql.com con tu correo o cuenta Oracle Cloud.
            </p>
          </div>
        </div>
        <div className={styles.step}>
          <span className={styles.stepNum}>2</span>
          <div>
            <h3 className={styles.stepTitle}>Abre un Worksheet</h3>
            <p className={styles.stepText}>
              Haz clic en <strong>&gt;_ Worksheet</strong> para abrir el editor SQL.
            </p>
          </div>
        </div>
        <div className={styles.step}>
          <span className={styles.stepNum}>3</span>
          <div>
            <h3 className={styles.stepTitle}>Selecciona el esquema</h3>
            <p className={styles.stepText}>
              En el Navigator, elige <strong>Customer Orders (CO)</strong> o{' '}
              <strong>Sales History (SH)</strong> según el bloque de ejercicios.
            </p>
          </div>
        </div>
        <div className={styles.step}>
          <span className={styles.stepNum}>4</span>
          <div>
            <h3 className={styles.stepTitle}>Ejecuta paso a paso</h3>
            <p className={styles.stepText}>
              Copia cada paso del carrusel al Worksheet y presiona{' '}
              <strong>Run Script</strong> (F5) para ver el resultado antes de avanzar.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
