import { useState } from 'react'
import type { ReactNode } from 'react'
import CodeBlock from '../components/concepts/CodeBlock'
import PlatformSelector, { type Platform } from '../components/codex/PlatformSelector'
import ShellBlock from '../components/codex/ShellBlock'
import styles from './IntegracionCodex.module.css'

function GuideSection({
  step,
  title,
  children,
}: {
  step: number
  title: string
  children: ReactNode
}) {
  return (
    <section className={styles.section} id={`paso-${step}`}>
      <header className={styles.sectionHeader}>
        <span className={styles.stepNum}>Paso {step}</span>
        <h2 className={styles.sectionTitle}>{title}</h2>
      </header>
      {children}
    </section>
  )
}

const DOCKER_RUN_MAC = `docker run -d \\
  --name oracle-free \\
  -p 1521:1521 \\
  -e ORACLE_PASSWORD=TuPasswordSeguro123 \\
  gvenzl/oracle-free:23-slim`

const DOCKER_RUN_WIN = `docker run -d ^
  --name oracle-free ^
  -p 1521:1521 ^
  -e ORACLE_PASSWORD=TuPasswordSeguro123 ^
  gvenzl/oracle-free`

const MCP_JSON_MAC = `{
  "mcpServers": {
    "sqlcl": {
      "command": "/Users/TU_USUARIO/oracle/sqlcl/bin/sql",
      "args": ["-mcp"],
      "env": {
        "JAVA_HOME": "/Library/Java/JavaVirtualMachines/temurin-21.jdk/Contents/Home"
      }
    }
  }
}`

const MCP_JSON_WINDOWS = `{
  "mcpServers": {
    "sqlcl": {
      "command": "C:\\\\oracle\\\\sqlcl\\\\bin\\\\sql.exe",
      "args": ["-mcp"],
      "env": {
        "JAVA_HOME": "C:\\\\Program Files\\\\Eclipse Adoptium\\\\jdk-21.0.x.x-hotspot"
      }
    }
  }
}`

const CODEX_CONFIG_MAC = `[mcp_servers.sqlcl]
command = "/Users/TU_USUARIO/oracle/sqlcl/bin/sql"
args = ["-mcp"]
startup_timeout_ms = 60000

[mcp_servers.sqlcl.env]
JAVA_HOME = "/Library/Java/JavaVirtualMachines/temurin-21.jdk/Contents/Home"`

const CODEX_CONFIG_WINDOWS = `[mcp_servers.sqlcl]
command = "C:\\\\oracle\\\\sqlcl\\\\bin\\\\sql.exe"
args = ["-mcp"]
startup_timeout_ms = 60000

[mcp_servers.sqlcl.env]
JAVA_HOME = "C:\\\\Program Files\\\\Eclipse Adoptium\\\\jdk-21.0.x.x-hotspot"`

const OPENCODE_CONFIG_MAC = `{
  "mcp": {
    "sqlcl": {
      "type": "local",
      "command": ["/Users/TU_USUARIO/oracle/sqlcl/bin/sql", "-mcp"],
      "enabled": true,
      "environment": {
        "JAVA_HOME": "/Library/Java/JavaVirtualMachines/temurin-21.jdk/Contents/Home"
      }
    }
  }
}`

const OPENCODE_CONFIG_WINDOWS = `{
  "mcp": {
    "sqlcl": {
      "type": "local",
      "command": ["C:\\\\oracle\\\\sqlcl\\\\bin\\\\sql.exe", "-mcp"],
      "enabled": true,
      "environment": {
        "JAVA_HOME": "C:\\\\Program Files\\\\Eclipse Adoptium\\\\jdk-21.0.x.x-hotspot"
      }
    }
  }
}`

export default function IntegracionCodex() {
  const [platform, setPlatform] = useState<Platform>('mac')
  const isMac = platform === 'mac'

  return (
    <div className={styles.page}>
      <header className={styles.intro}>
        <p className={styles.eyebrow} aria-hidden="true">
          /* integración */
        </p>
        <h1 className={styles.heading}>Integración con Codex</h1>
        <p className={styles.lead}>
          Conecta <strong>Codex</strong>, <strong>Cursor</strong> u <strong>OpenCode</strong> a
          Oracle local con los esquemas <strong>CO</strong> y <strong>SH</strong>. Descargas los
          esquemas oficiales de{' '}
          <a
            href="https://github.com/oracle-samples/db-sample-schemas"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            db-sample-schemas
          </a>
          , levantas Oracle en Docker y usas el <strong>MCP de SQLcl</strong> para que la IA
          ejecute los ejercicios de la tutoría.
        </p>
        <div className={`${styles.note} ${styles.introNote}`}>
          <span className={styles.noteLabel}>Plus de diferenciación (GenO Comercial)</span>
          <p>
            GenO insiste en que la IA es para todos los perfiles, no solo técnicos. Dominar este
            flujo (IA + datos Oracle) es un <strong>plus</strong> para un pitch o assessment
            center — no una habilidad exigida en la selección. Úsalo para demostrar soltura, no
            para memorizar MCP.
          </p>
        </div>
        <div className={styles.flow} aria-label="Flujo de integración local">
          <span className={styles.flowItem}>Codex / Cursor / OpenCode</span>
          <span className={styles.flowArrow} aria-hidden="true">→</span>
          <span className={styles.flowItem}>SQLcl MCP</span>
          <span className={styles.flowArrow} aria-hidden="true">→</span>
          <span className={styles.flowItem}>localhost:1521</span>
          <span className={styles.flowArrow} aria-hidden="true">→</span>
          <span className={styles.flowItem}>CO / SH</span>
        </div>
        <div className={styles.resourcesBox}>
          <span className={styles.resourcesLabel}>Recursos y tiempo</span>
          <ul className={styles.resourcesList}>
            <li>
              <strong>RAM:</strong>{' '}
              {isMac ? (
                <>
                  ~2 GB para el contenedor Oracle + ~4 GB asignados a Colima. Cierra otras apps
                  si tienes 8 GB en total.
                </>
              ) : (
                <>
                  ~2 GB para el contenedor Oracle + recursos de Docker Desktop. Cierra otras apps
                  si tienes 8 GB en total.
                </>
              )}
            </li>
            <li>
              <strong>Disco:</strong>{' '}
              {isMac ? (
                <>
                  ~3 GB con la imagen <strong>23-slim</strong> (vs ~7 GB de la full). Más espacio
                  para esquemas y datos SH.
                </>
              ) : (
                <>Varios GB para la imagen Docker y los datos SH.</>
              )}
            </li>
            <li>
              <strong>Tiempo estimado:</strong> <strong>30–60 min</strong> la primera vez
              {isMac ? ' (con Colima + imagen slim)' : ''}. Descargas e instalación de SH son lo
              que más tarda.
            </li>
            <li>
              <strong>Requisitos:</strong> Java 17+, SQLcl{' '}
              <strong>25.2+</strong> (guía probada con <strong>25.4+</strong>)
              {isMac ? ', Docker o Colima' : ', Docker Desktop'}. En SQLcl{' '}
              <strong>26.x</strong> el guardado de conexiones cambió — ver paso 6.
            </li>
          </ul>
        </div>
      </header>

      <div className={styles.platformBar}>
        <div className={styles.platformBarInner}>
          <PlatformSelector value={platform} onChange={setPlatform} />
        </div>
      </div>

      <div className={styles.body}>
        <header className={styles.guideIntro}>
          <h2 className={styles.guideTitle}>Oracle local + SQLcl MCP</h2>
          <p className={styles.guideLead}>
            Guía probada de extremo a extremo para <strong>{isMac ? 'macOS' : 'Windows'}</strong>.
            Si FreeSQL remoto no te da acceso completo a CO/SH, este es el camino más fiable para
            practicar con IA.
          </p>
          <div className={styles.warn}>
            <span className={styles.warnLabel}>
              Cada vez que reinicies el PC — haz esto ANTES de abrir Codex / Cursor / OpenCode
            </span>
            <p>
              El contenedor <strong>oracle-free</strong> se apaga al reiniciar. El MCP no puede
              ejecutarlo por ti. Si no está arriba, verás <strong>ORA-12541</strong> o timeout.
            </p>
          </div>
          <ShellBlock
            title={isMac ? 'Arrancar Oracle (macOS)' : 'Arrancar Oracle (Windows)'}
            code={
              isMac
                ? `# 1. Si usas Colima:
colima status 2>/dev/null || colima start

# 2. Arrancar el contenedor:
docker start oracle-free

# 3. Esperar listo (30-60 seg):
docker logs oracle-free 2>&1 | grep "DATABASE IS READY TO USE"`
                : `# 1. Arrancar el contenedor:
docker start oracle-free

# 2. Esperar listo (30-60 seg):
docker logs oracle-free 2>&1 | findstr "DATABASE IS READY TO USE"`
            }
            caption="Esquemas CO/SH y datos persisten aunque el contenedor esté apagado. Solo hay que volver a arrancarlo."
          />
        </header>

        <GuideSection step={1} title="Descargar los esquemas CO y SH">
          <p className={styles.sectionText}>
            Los ejercicios de esta tutoría usan los esquemas oficiales de Oracle. Descárgalos
            una sola vez:
          </p>
          <ol className={styles.list}>
            <li>
              Ve a{' '}
              <a
                href="https://github.com/oracle-samples/db-sample-schemas/releases"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                Releases de db-sample-schemas
              </a>{' '}
              y descarga <strong>Source code (zip)</strong> (versión 23c sirve para Oracle
              19c+).
            </li>
            <li>Extrae el ZIP en una carpeta de tu elección, por ejemplo:</li>
          </ol>
          <ShellBlock
            title={isMac ? 'Carpeta sugerida (macOS)' : 'Carpeta sugerida (Windows)'}
            code={isMac ? '~/oracle/db-sample-schemas' : 'C:\\oracle\\db-sample-schemas'}
          />
          <p className={styles.sectionText}>
            Carpetas que usarás en los siguientes pasos:
          </p>
          <ul className={styles.list}>
            <li>
              <strong>customer_orders/</strong> → esquema <strong>CO</strong> (
              <code>co_install.sql</code>)
            </li>
            <li>
              <strong>sales_history/</strong> → esquema <strong>SH</strong> (
              <code>sh_install.sql</code>, requiere SQLcl para cargar CSV)
            </li>
          </ul>
        </GuideSection>

        <GuideSection step={2} title="Levantar Oracle Database local">
          {isMac ? (
            <>
              <p className={styles.sectionText}>
                Usa la imagen <strong>gvenzl/oracle-free:23-slim</strong> (~3 GB, mismo servidor
                que la full). Alternativa nativa:{' '}
                <a
                  href="https://www.oracle.com/database/free/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  Oracle Database Free
                </a>{' '}
                (más pesado, mismo resultado).
              </p>
              <div className={styles.note}>
                <span className={styles.noteLabel}>Recomendado en Mac (Apple Silicon, 8 GB RAM)</span>
                <p>
                  <strong>Colima</strong> es más liviano que Docker Desktop: no requiere GUI y
                  consume menos recursos. Docker Desktop también funciona si ya lo tienes
                  instalado.
                </p>
              </div>
              <p className={styles.sectionText}>
                <strong>Opción A — Colima (recomendada)</strong>
              </p>
              <ShellBlock
                title="Instalar y arrancar Colima"
                code={`brew install docker docker-compose colima
colima start --cpu 2 --memory 4 --disk 60`}
                caption="Asigna 2 CPUs, 4 GB RAM y 60 GB disco a la VM de Colima."
              />
              <p className={styles.sectionText}>
                <strong>Opción B — Docker Desktop</strong> (si ya lo usas): instálalo desde{' '}
                <a
                  href="https://www.docker.com/products/docker-desktop/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  docker.com
                </a>{' '}
                y ábrelo antes de continuar.
              </p>
              <p className={styles.sectionText}>Luego, con Colima o Docker Desktop activo:</p>
              <ShellBlock
                title="Contenedor Oracle Free slim (macOS)"
                code={DOCKER_RUN_MAC}
                caption="Primera descarga ~3 GB. Arranque: 2–5 min. Espera DATABASE IS READY TO USE en los logs."
              />
              <ShellBlock
                title="Verificar que el contenedor está listo"
                code={`docker logs -f oracle-free
# Espera el mensaje: DATABASE IS READY TO USE`}
              />
            </>
          ) : (
            <>
              <p className={styles.sectionText}>
                Instala{' '}
                <a
                  href="https://www.docker.com/products/docker-desktop/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  Docker Desktop
                </a>{' '}
                con WSL2 si te lo pide. Alternativa nativa:{' '}
                <a
                  href="https://www.oracle.com/database/free/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  Oracle Database Free
                </a>
                .
              </p>
              <ol className={styles.list}>
                <li>Abre PowerShell y ejecuta:</li>
              </ol>
              <ShellBlock
                title="Contenedor Oracle Free (Windows)"
                code={DOCKER_RUN_WIN}
                caption="Usa la misma contraseña en todos los pasos siguientes."
              />
              <ShellBlock
                title="Verificar en PowerShell"
                code="docker logs -f oracle-free"
              />
            </>
          )}
          <div className={styles.note}>
            <span className={styles.noteLabel}>Cadena de conexión local</span>
            <p>
              Usuario administrador: <strong>system</strong> / contraseña que definiste.
              Service name del PDB: <strong>FREEPDB1</strong>. Cadena completa:{' '}
              <strong>//localhost:1521/FREEPDB1</strong>
            </p>
          </div>
          <ShellBlock
            title="Verificar Oracle sin SQLcl (diagnóstico rápido)"
            code={`docker exec oracle-free sql system/TuPasswordSeguro123@FREEPDB1 -S "SELECT 1 FROM DUAL;"`}
            caption="Si esto responde 1, Oracle está listo aunque SQLcl aún no esté instalado."
          />
        </GuideSection>

        <GuideSection step={3} title="Instalar Java 17+ y SQLcl (25.4+ recomendado)">
          <p className={styles.sectionText}>
            SQLcl es obligatorio para instalar <strong>SH</strong> (carga CSV) y para el MCP.
            Requiere Java 17 o 21. Esta guía se probó con <strong>SQLcl 25.4+</strong>. El mínimo
            documentado por Oracle para MCP es 25.2; en <strong>26.x</strong> el guardado de
            conexiones cambió (paso 6).
          </p>
          {isMac ? (
            <>
              <ol className={styles.list}>
                <li>
                  Java: instalador desde{' '}
                  <a
                    href="https://adoptium.net"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                  >
                    adoptium.net
                  </a>{' '}
                  o <strong>brew install openjdk@21</strong>
                </li>
                <li>
                  SQLcl: descarga desde{' '}
                  <a
                    href="https://www.oracle.com/tools/sqlcl/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                  >
                    oracle.com/tools/sqlcl
                  </a>{' '}
                  (preferible 25.4+)
                </li>
                <li>
                  Extrae el ZIP en <strong>~/oracle/sqlcl</strong>
                </li>
                <li>
                  Añade <strong>~/oracle/sqlcl/bin</strong> al PATH o usa la ruta absoluta
                </li>
              </ol>
            </>
          ) : (
            <>
              <ol className={styles.list}>
                <li>
                  Java: instalador LTS desde{' '}
                  <a
                    href="https://adoptium.net"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                  >
                    adoptium.net
                  </a>
                </li>
                <li>
                  SQLcl: descarga desde{' '}
                  <a
                    href="https://www.oracle.com/tools/sqlcl/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                  >
                    oracle.com/tools/sqlcl
                  </a>{' '}
                  (preferible 25.4+)
                </li>
                <li>
                  Extrae en <strong>C:\oracle\sqlcl</strong>
                </li>
                <li>
                  Añade <strong>C:\oracle\sqlcl\bin</strong> al PATH del sistema
                </li>
              </ol>
            </>
          )}
          <p className={styles.sectionText}>
            <strong>Chequeo previo de entorno</strong> (hazlo siempre antes de instalar CO/SH):
          </p>
          <ShellBlock
            title={isMac ? 'Verificar entorno (macOS)' : 'Verificar entorno (Windows)'}
            code={
              isMac
                ? `docker --version
java -version
sql -version
# o: ~/oracle/sqlcl/bin/sql -version

# Confirma que el puerto 1521 no esté ocupado por otro contenedor:
docker ps`
                : `docker --version
java -version
sql -version

# Confirma que el puerto 1521 no esté ocupado por otro contenedor:
docker ps`
            }
            caption="Si docker ps muestra otro proceso usando 1521, deténlo o cambia el mapeo de puertos antes de continuar."
          />
        </GuideSection>

        <GuideSection step={4} title="Validar FREEPDB1 e instalar CO">
          <p className={styles.sectionText}>
            Antes de instalar esquemas, confirma que el listener y el PDB responden. Si esto
            falla, no ejecutes <strong>co_install.sql</strong>.
          </p>
          <ShellBlock
            title="Probar conexión a FREEPDB1"
            code={
              isMac
                ? `sql system/TuPasswordSeguro123@//localhost:1521/FREEPDB1
SELECT name FROM v$database;
SELECT 1 FROM dual;
exit`
                : `sql system/TuPasswordSeguro123@//localhost:1521/FREEPDB1
SELECT name FROM v$database;
SELECT 1 FROM dual;
exit`
            }
            caption="Si conecta y responde, el PDB está listo. Sustituye la contraseña por la de Docker."
          />
          <p className={styles.sectionText}>
            Luego instala <strong>CO</strong> desde <strong>customer_orders</strong> como{' '}
            <strong>system</strong>:
          </p>
          <ShellBlock
            title={isMac ? 'Instalar CO (macOS)' : 'Instalar CO (Windows)'}
            code={
              isMac
                ? `cd ~/oracle/db-sample-schemas/customer_orders
sql system/TuPasswordSeguro123@//localhost:1521/FREEPDB1
@co_install.sql`
                : `cd C:\\oracle\\db-sample-schemas\\customer_orders
sql system/TuPasswordSeguro123@//localhost:1521/FREEPDB1
@co_install.sql`
            }
            caption={
              isMac
                ? 'Cuando pida password para CO, elige una (ej. CoPass123). Tablespace: Enter para el predeterminado.'
                : 'Sustituye la contraseña de system por la que usaste en Docker.'
            }
          />
          <CodeBlock
            title="Consulta de prueba CO"
            sql="SELECT COUNT(*) AS clientes FROM CO.CUSTOMERS;"
          />
          <ShellBlock
            title="Verificar CO sin SQLcl"
            code={`docker exec oracle-free sql system/TuPasswordSeguro123@FREEPDB1 -S "SELECT COUNT(*) FROM CO.CUSTOMERS;"`}
          />
        </GuideSection>

        <GuideSection step={5} title="Instalar el esquema SH (Sales History)">
          <p className={styles.sectionText}>
            <strong>SH requiere SQLcl</strong> (no basta SQL*Plus) porque carga datos desde
            archivos CSV con el comando <strong>LOAD</strong>.
          </p>
          <ShellBlock
            title={isMac ? 'Instalar SH (macOS)' : 'Instalar SH (Windows)'}
            code={
              isMac
                ? `cd ~/oracle/db-sample-schemas/sales_history
sql system/TuPasswordSeguro123@//localhost:1521/FREEPDB1
@sh_install.sql`
                : `cd C:\\oracle\\db-sample-schemas\\sales_history
sql system/TuPasswordSeguro123@//localhost:1521/FREEPDB1
@sh_install.sql`
            }
            caption={
              isMac
                ? 'Puede tardar varios minutos. Elige password para SH (ej. ShPass123).'
                : undefined
            }
          />
          <div className={styles.warn}>
            <span className={styles.warnLabel}>ORA-29833 (Oracle Text en Database Free)</span>
            <p>
              En SH puede aparecer <strong>ORA-29833: indextype does not exist</strong> al crear
              el índice de texto en <strong>supplementary_demographics</strong>. En Oracle
              Database Free el tipo <strong>ctxsys.context</strong> no viene habilitado por
              defecto.
            </p>
          </div>
          <p className={styles.sectionText}>
            <strong>Opción A — Ignorar el error (suficiente para la tutoría):</strong> todas las
            tablas SH se crean igual; solo falla ese índice textual.
          </p>
          <p className={styles.sectionText}>
            <strong>Opción B — Habilitar Oracle Text:</strong>
          </p>
          <ShellBlock
            title="Habilitar Oracle Text (opcional)"
            code={`docker exec -it oracle-free bash
sqlplus / as sysdba
@$ORACLE_HOME/ctx/admin/catctx.sql`}
            caption="Solo si necesitas el índice de texto. Para esta tutoría no es obligatorio."
          />
          <CodeBlock
            title="Consulta de prueba SH"
            sql="SELECT COUNT(*) AS ventas FROM SH.SALES;"
            caption="Si devuelve un número grande (cientos de miles), SH quedó bien cargado."
          />
          <ShellBlock
            title="Verificar SH sin SQLcl"
            code={`docker exec oracle-free sql system/TuPasswordSeguro123@FREEPDB1 -S "SELECT COUNT(*) FROM SH.SALES;"`}
          />
        </GuideSection>

        <GuideSection step={6} title="Conexión para el MCP (SQLcl 25.x vs 26.x)">
          <div className={styles.note}>
            <span className={styles.noteLabel}>Dos nombres distintos — no los mezcles</span>
            <p>
              <strong>Servidor MCP</strong> = <strong>sqlcl</strong> (cómo se llama el tool en
              Codex/Cursor/OpenCode).{' '}
              <strong>Conexión guardada</strong> = <strong>co_local</strong> (solo si usas SQLcl
              ≤25.x con <code>-save</code>). Cuando digas &quot;conéctate a co_local&quot;, te
              refieres a la conexión, no al nombre del servidor MCP.
            </p>
          </div>

          <h3 className={styles.subsectionTitle}>Opción A — SQLcl 25.x (incluye 25.4)</h3>
          <p className={styles.sectionText}>
            En 25.x puedes guardar la conexión con contraseña. El MCP no acepta credenciales en
            el chat; usa la conexión guardada.
          </p>
          <ShellBlock
            title="Guardar conexión (solo SQLcl ≤25.x)"
            code={`sql -name co_local -save -savepwd system/TuPasswordSeguro123@//localhost:1521/FREEPDB1`}
            caption="co_local es el nombre que usarás con connect. Credenciales en ~/.dbtools"
          />
          <ShellBlock
            title="Listar conexiones"
            code={`connmgr list`}
          />
          <div className={styles.warn}>
            <span className={styles.warnLabel}>Compatibilidad</span>
            <p>
              <strong>
                <code>-name … -save -savepwd</code> solo funciona en SQLcl ≤25.x.
              </strong>{' '}
              En SQLcl <strong>26.x</strong> ese método ya no funciona (
              <code>-save</code> fue eliminado). No pierdas tiempo con{' '}
              <code>connmgr add</code> / JSON manuales: en 26 no reemplazan este flujo de forma
              sencilla. Usa la opción B.
            </p>
          </div>

          <h3 className={styles.subsectionTitle}>Opción B — SQLcl 26.x (cadena directa en el chat)</h3>
          <p className={styles.sectionText}>
            No dependas de <strong>co_local</strong>. Pídele al agente que se conecte con la
            cadena completa (sustituye la contraseña):
          </p>
          <div className={styles.promptCard}>
            <p className={styles.promptTitle}>Prompt de conexión (SQLcl 26)</p>
            <p className={styles.promptText}>
              {`Conéctate con el MCP sqlcl a system/"TuPasswordSeguro123"@//localhost:1521/FREEPDB1`}
            </p>
          </div>
          <p className={styles.sectionText}>
            Si tu contraseña tiene caracteres especiales, déjala entre comillas como en el
            ejemplo. Luego pide <code>SELECT 1 FROM dual;</code> para verificar.
          </p>
        </GuideSection>

        <GuideSection step={7} title="Configurar SQLcl MCP en tu cliente de IA">
          <p className={styles.sectionText}>
            El <strong>servidor MCP</strong> debe llamarse <strong>sqlcl</strong> (minúsculas).
            Usa la <strong>ruta absoluta</strong> al binario <strong>sql</strong>. Incluye{' '}
            <strong>JAVA_HOME</strong> en <code>env</code>: sin eso el MCP puede fallar aunque{' '}
            <code>java -version</code> funcione en tu terminal. Tras guardar,{' '}
            <strong>reinicia el cliente</strong>.
          </p>

          <h3 className={styles.subsectionTitle}>Codex (OpenAI)</h3>
          <p className={styles.sectionText}>
            Archivo: <strong>~/.codex/config.toml</strong> (o extensión Codex → ⚙️ → MCP Settings
            → Open config.toml). Docs:{' '}
            <a
              href="https://developers.openai.com/codex/mcp"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              developers.openai.com/codex/mcp
            </a>
            .
          </p>
          <ShellBlock
            title={isMac ? 'config.toml (macOS)' : 'config.toml (Windows)'}
            code={isMac ? CODEX_CONFIG_MAC : CODEX_CONFIG_WINDOWS}
            caption={
              isMac
                ? 'Ajusta la ruta de sql y JAVA_HOME (puedes obtenerla con /usr/libexec/java_home). Reinicia Codex.'
                : 'Ajusta la ruta de sql.exe y JAVA_HOME a tu JDK real. Reinicia Codex.'
            }
          />

          <h3 className={styles.subsectionTitle}>Cursor</h3>
          <p className={styles.sectionText}>
            Settings → Tools & MCP → Add MCP server, o edita{' '}
            <strong>
              {isMac ? '~/.cursor/mcp.json' : '%USERPROFILE%\\.cursor\\mcp.json'}
            </strong>
            .
          </p>
          <ShellBlock
            title={isMac ? 'mcp.json (macOS)' : 'mcp.json (Windows)'}
            code={isMac ? MCP_JSON_MAC : MCP_JSON_WINDOWS}
            caption={
              isMac
                ? 'Sustituye TU_USUARIO y la ruta JAVA_HOME.'
                : 'Doble barra en rutas Windows. Ajusta JAVA_HOME a tu JDK.'
            }
          />

          <h3 className={styles.subsectionTitle}>OpenCode</h3>
          <p className={styles.sectionText}>
            Archivo: <strong>~/.config/opencode/opencode.jsonc</strong>
          </p>
          <ShellBlock
            title={isMac ? 'OpenCode (macOS)' : 'OpenCode (Windows)'}
            code={isMac ? OPENCODE_CONFIG_MAC : OPENCODE_CONFIG_WINDOWS}
            caption='Bloque "mcp" con type "local" + JAVA_HOME. Reinicia OpenCode.'
          />

          <div className={styles.note}>
            <span className={styles.noteLabel}>Recordatorio de nombres</span>
            <p>
              En el panel MCP verás el servidor <strong>sqlcl</strong>. La conexión a la base es{' '}
              <strong>co_local</strong> (25.x) o la cadena{' '}
              <strong>system/…@//localhost:1521/FREEPDB1</strong> (26.x).
            </p>
          </div>
        </GuideSection>

        <GuideSection step={8} title="Probar el MCP y practicar ejercicios">
          <p className={styles.sectionText}>
            Abre un <strong>chat nuevo</strong>. Primero una prueba mínima (separa “MCP no
            carga” de “consulta mal escrita”), luego los ejercicios.
          </p>

          <h3 className={styles.subsectionTitle}>Prueba mínima del MCP</h3>
          <div className={styles.promptCard}>
            <p className={styles.promptTitle}>1. Conectar</p>
            <p className={styles.promptText}>
              {`SQLcl 25.x: Usa el MCP sqlcl y conéctate a la conexión guardada co_local.

SQLcl 26.x: Usa el MCP sqlcl y conéctate a system/"TuPasswordSeguro123"@//localhost:1521/FREEPDB1`}
            </p>
          </div>
          <div className={styles.promptCard}>
            <p className={styles.promptTitle}>2. Smoke test</p>
            <p className={styles.promptText}>Ejecuta: SELECT 1 FROM dual;</p>
          </div>
          <div className={styles.promptCard}>
            <p className={styles.promptTitle}>3. Catálogo</p>
            <p className={styles.promptText}>
              Ejecuta: SELECT table_name FROM all_tables WHERE owner = &apos;CO&apos; ORDER BY
              1;
            </p>
          </div>

          <h3 className={styles.subsectionTitle}>Practicar ejercicios</h3>
          <div className={styles.promptCard}>
            <p className={styles.promptTitle}>Ejercicio VIP</p>
            <p className={styles.promptText}>
              {`Estoy practicando tutorías SQL. Usa el MCP sqlcl (ya conectado) y ejecuta:

SELECT c.FULL_NAME,
       SUM(oi.UNIT_PRICE * oi.QUANTITY) AS total_compras
FROM CO.ORDERS o
JOIN CO.ORDER_ITEMS oi ON oi.ORDER_ID = o.ORDER_ID
JOIN CO.CUSTOMERS c ON c.CUSTOMER_ID = o.CUSTOMER_ID
GROUP BY c.FULL_NAME
HAVING SUM(oi.UNIT_PRICE * oi.QUANTITY) > 1000
ORDER BY total_compras DESC;

Explícame el resultado en lenguaje comercial.`}
            </p>
          </div>
          <div className={styles.promptCard}>
            <p className={styles.promptTitle}>PL/SQL (solo lectura)</p>
            <p className={styles.promptText}>
              {`Usa el MCP sqlcl. Muestra el bloque PL/SQL del ejercicio de reconocimiento (CUSTOMER_ID = 5) y explícame en lenguaje comercial qué hace, sin reescribirlo.`}
            </p>
          </div>
          <div className={styles.note}>
            <span className={styles.noteLabel}>Flujo recomendado</span>
            <p>
              Arranca Oracle (bloque del inicio) → chat nuevo → prueba mínima → sección{' '}
              <strong>Ejercicio</strong> → carrusel → pide a la IA que ejecute con MCP.
            </p>
          </div>
        </GuideSection>

        <GuideSection step={9} title="Solución de problemas">
          <ul className={styles.list}>
            {isMac && (
              <li>
                <strong>Sin RAM / Mac lento</strong> — Usa Colima con{' '}
                <strong>--memory 4</strong>. Cierra otras apps. Imagen{' '}
                <strong>23-slim</strong> reduce descarga.
              </li>
            )}
            <li>
              <strong>ORA-12541 / connection refused</strong> — Contenedor apagado o no listo.
              Ejecuta <strong>docker start oracle-free</strong> y revisa los logs hasta DATABASE
              IS READY.
            </li>
            <li>
              <strong>ORA-01017 invalid username/password</strong> — Contraseña incorrecta o
              conexión guardada desactualizada. Regenera / vuelve a guardar en 25.x, o usa la
              cadena directa del paso 6 (opción B) en 26.x.
            </li>
            <li>
              <strong>ORA-28009</strong> — Intentaste conectar como <strong>SYS</strong> sin{' '}
              <strong>AS SYSDBA</strong>. Para esta guía usa <strong>system</strong> hacia
              FREEPDB1, no SYS.
            </li>
            <li>
              <strong>Puerto 1521 ocupado</strong> — <strong>docker ps</strong>; detén el otro
              contenedor o cambia el mapeo <code>-p</code>.
            </li>
            <li>
              <strong>SQLcl no conecta pero Oracle sí</strong> — Prueba{' '}
              <strong>docker exec oracle-free sql …</strong> para aislar el fallo.
            </li>
            <li>
              <strong>ORA-29833 en SH</strong> — Normal en Database Free; ignóralo o ejecuta{' '}
              <strong>catctx.sql</strong> (paso 5).
            </li>
            <li>
              <strong>sh_install.sql falla</strong> — Debe ser con <strong>SQLcl</strong>, no
              SQL*Plus. Verifica <strong>sql -version</strong>.
            </li>
            <li>
              <strong>-save no funciona / co_local vacío</strong> — Estás en SQLcl 26.x. Usa
              conexión por cadena (paso 6, opción B).
            </li>
            <li>
              <strong>sqlcl no aparece / falla al arrancar</strong> — JSON/TOML válido, ruta
              absoluta, nombre <strong>sqlcl</strong>, <strong>JAVA_HOME</strong> en{' '}
              <code>env</code>, reinicia el cliente.
            </li>
            <li>
              <strong>ORA- sobre permisos CO/SH</strong> — Usa prefijos{' '}
              <strong>CO.CUSTOMERS</strong>, <strong>SH.SALES</strong>.
            </li>
            <li>
              <strong>TNS / alias no encontrado</strong> — Añade <strong>TNS_ADMIN</strong> en el
              bloque <code>env</code> del MCP, o usa EZConnect (
              <code>//localhost:1521/FREEPDB1</code>).
            </li>
          </ul>
          <div className={styles.warn}>
            <span className={styles.warnLabel}>Sin instalar Oracle</span>
            <p>
              Practica en{' '}
              <a
                href="https://freesql.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                FreeSQL
              </a>{' '}
              en el navegador copiando cada paso del carrusel.
            </p>
          </div>
          <div className={styles.note}>
            <span className={styles.noteLabel}>Documentación</span>
            <p>
              <a
                href="https://www.oracle.com/mcp/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                Oracle MCP (SQLcl)
              </a>
              {' · '}
              <a
                href="https://developers.openai.com/codex/mcp"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                Codex MCP
              </a>
              {' · '}
              <a
                href="https://github.com/oracle-samples/db-sample-schemas"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                db-sample-schemas
              </a>
              {' · '}
              <a
                href="https://cursor.com/docs/mcp"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                MCP en Cursor
              </a>
            </p>
          </div>
        </GuideSection>
      </div>
    </div>
  )
}
