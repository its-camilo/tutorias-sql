import styles from './FreeSqlIntro.module.css'

export default function FreeSqlIntro() {
  return (
    <section className={styles.intro}>
      <p className={styles.eyebrow} aria-hidden="true">
        /* herramienta */
      </p>
      <h2 className={styles.heading}>Practica con Oracle FreeSQL</h2>
      <p className={styles.lead}>
        Ejercicios pensados para el perfil <strong>Comercial GenO</strong>: ejecuta
        consultas en{' '}
        <a
          href="https://freesql.com"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          freesql.com
        </a>{' '}
        y, al final de cada uno, explica el resultado como se lo dirías a un cliente —
        en una frase, sin jerga. No necesitas instalar nada.
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
            <h3 className={styles.stepTitle}>Ejecuta y explica</h3>
            <p className={styles.stepText}>
              Copia cada paso al Worksheet, ejecuta con <strong>Run Script</strong>{' '}
              (F5) y responde la pregunta <strong>Explícaselo a un cliente</strong> de
              cada ejercicio.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
