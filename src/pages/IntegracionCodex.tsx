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
      "args": ["-mcp"]
    }
  }
}`

const MCP_JSON_WINDOWS = `{
  "mcpServers": {
    "sqlcl": {
      "command": "C:\\\\ruta\\\\a\\\\sqlcl\\\\bin\\\\sql.exe",
      "args": ["-mcp"]
    }
  }
}`

const CODEX_CONFIG_MAC = `[mcp_servers.sqlcl]
command = "/Users/TU_USUARIO/oracle/sqlcl/bin/sql"
args = ["-mcp"]
startup_timeout_ms = 60000`

const CODEX_CONFIG_WINDOWS = `[mcp_servers.sqlcl]
command = "C:\\\\oracle\\\\sqlcl\\\\bin\\\\sql.exe"
args = ["-mcp"]
startup_timeout_ms = 60000`

const OPENCODE_CONFIG_MAC = `{
  "mcp": {
    "sqlcl": {
      "type": "local",
      "command": ["/Users/TU_USUARIO/oracle/sqlcl/bin/sql", "-mcp"],
      "enabled": true
    }
  }
}`

const OPENCODE_CONFIG_WINDOWS = `{
  "mcp": {
    "sqlcl": {
      "type": "local",
      "command": ["C:\\\\oracle\\\\sqlcl\\\\bin\\\\sql.exe", "-mcp"],
      "enabled": true
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
                <>
                  Varios GB para la imagen Docker y los datos SH.
                </>
              )}
            </li>
            <li>
              <strong>Tiempo estimado:</strong> <strong>30–60 min</strong> la primera vez
              {isMac ? ' (con Colima + imagen slim)' : ''}. Descargas e instalación de SH son lo
              que más tarda.
            </li>
            <li>
              <strong>Requisitos:</strong> Java 17+, SQLcl 25.2+
              {isMac ? ', Docker o Colima' : ', Docker Desktop'}.
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
            <span className={styles.warnLabel}>Antes de cada sesión con IA</span>
            <p>
              El contenedor <strong>oracle-free</strong> debe estar corriendo antes de que Codex,
              Cursor u OpenCode intenten conectarse vía MCP. Si no, verás{' '}
              <strong>ORA-12541</strong> o timeout. Los pasos para levantarlo están al final del{' '}
              <strong>Paso 8</strong>.
            </p>
          </div>
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

        <GuideSection step={3} title="Instalar Java 17+ y SQLcl 25.2+">
          <p className={styles.sectionText}>
            SQLcl es obligatorio para instalar <strong>SH</strong> (carga datos desde CSV) y
            para el MCP. Requiere Java 17 o 21.
          </p>
          <ShellBlock
            title="Verificar Java"
            code={`java -version
# Debe mostrar 17 o superior`}
          />
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
                  (versión 25.2 o superior)
                </li>
                <li>
                  Extrae el ZIP en <strong>~/oracle/sqlcl</strong>
                </li>
                <li>
                  Añade <strong>~/oracle/sqlcl/bin</strong> al PATH o usa la ruta absoluta
                </li>
              </ol>
              <ShellBlock title="Verificar SQLcl" code="~/oracle/sqlcl/bin/sql -version" />
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
                  </a>
                </li>
                <li>
                  Extrae en <strong>C:\oracle\sqlcl</strong>
                </li>
                <li>
                  Añade <strong>C:\oracle\sqlcl\bin</strong> al PATH del sistema
                </li>
              </ol>
              <ShellBlock title="Verificar en PowerShell" code="sql -version" />
            </>
          )}
        </GuideSection>

        <GuideSection step={4} title="Instalar el esquema CO (Customer Orders)">
          <p className={styles.sectionText}>
            Conéctate como usuario privilegiado (<strong>system</strong>) y ejecuta el script
            de instalación desde la carpeta <strong>customer_orders</strong>.
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
          <p className={styles.sectionText}>
            Al final deberías ver un mensaje de instalación exitosa. Verifica con SQLcl o sin
            él:
          </p>
          <CodeBlock
            title="Consulta de prueba CO (SQLcl)"
            sql="SELECT COUNT(*) AS clientes FROM CO.CUSTOMERS;"
          />
          <ShellBlock
            title="Verificar CO sin SQLcl"
            code={`docker exec oracle-free sql system/TuPasswordSeguro123@FREEPDB1 -S "SELECT COUNT(*) FROM CO.CUSTOMERS;"`}
            caption="Útil si SQLcl falla pero quieres confirmar que CO quedó instalado."
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
                ? 'Puede tardar varios minutos por el volumen de datos. Elige password para SH (ej. ShPass123).'
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
            tablas SH se crean igual; solo falla ese índice textual. Los ejercicios de{' '}
            <strong>SH.SALES</strong>, <strong>SH.TIMES</strong>, etc. funcionan con normalidad.
          </p>
          <p className={styles.sectionText}>
            <strong>Opción B — Habilitar Oracle Text:</strong> conéctate como SYSDBA dentro del
            contenedor y ejecuta el script de instalación de Text:
          </p>
          <ShellBlock
            title="Habilitar Oracle Text (opcional)"
            code={`docker exec -it oracle-free bash
sqlplus / as sysdba
@$ORACLE_HOME/ctx/admin/catctx.sql`}
            caption="Solo si necesitas el índice de texto. Para los ejercicios de esta tutoría no es obligatorio."
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

        <GuideSection step={6} title="Guardar la conexión local en SQLcl">
          <p className={styles.sectionText}>
            El MCP de SQLcl <strong>no acepta credenciales en el chat</strong>. Debes guardar
            la conexión con nombre y contraseña almacenada. El flag{' '}
            <strong>-name</strong> define el identificador que la IA usará con{' '}
            <strong>connect</strong> ([documentación Oracle](https://docs.oracle.com/en/database/oracle/sql-developer-command-line/25.4/sqcug/preparing-your-environment.html)).
          </p>
          <ShellBlock
            title="Guardar conexión"
            code={`sql -name co_local -save -savepwd system/TuPasswordSeguro123@//localhost:1521/FREEPDB1`}
            caption="co_local es el nombre exacto que pedirás al MCP: connect a co_local. Credenciales en ~/.dbtools"
          />
          <ShellBlock
            title="Listar conexiones guardadas"
            code={`connmgr list
# En SQLcl 26.x: connmgr list (sin guión extra)`}
          />
          <p className={styles.sectionText}>
            Deberías ver <strong>co_local</strong> en la lista antes de configurar el MCP.
          </p>
          <div className={styles.note}>
            <span className={styles.noteLabel}>Permisos CO/SH</span>
            <p>
              Conectas como <strong>system</strong> para ver todos los esquemas. En los
              ejercicios usarás <strong>CO.tabla</strong> y <strong>SH.tabla</strong> con
              prefijo de esquema, igual que en FreeSQL.
            </p>
          </div>
        </GuideSection>

        <GuideSection step={7} title="Configurar SQLcl MCP en tu cliente de IA">
          <p className={styles.sectionText}>
            El servidor MCP debe llamarse <strong>sqlcl</strong> (minúsculas). Usa la{' '}
            <strong>ruta absoluta</strong> al binario <strong>sql</strong>. Tras guardar la
            configuración, <strong>reinicia el cliente</strong> (Codex, Cursor u OpenCode).
          </p>

          <h3 className={styles.subsectionTitle}>Codex (OpenAI)</h3>
          <p className={styles.sectionText}>
            Archivo: <strong>~/.codex/config.toml</strong> (o desde la extensión Codex → ⚙️ →
            MCP Settings → Open config.toml). Documentación:{' '}
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
                ? 'Sustituye TU_USUARIO. Reinicia VS Code o la extensión Codex.'
                : 'Ajusta la ruta a tu instalación de SQLcl. Reinicia VS Code o la extensión Codex.'
            }
          />

          <h3 className={styles.subsectionTitle}>Cursor</h3>
          <p className={styles.sectionText}>
            <strong>Settings → Tools & MCP → Add MCP server</strong>, o edita el archivo
            manualmente ([guía Cursor + SQLcl](https://oracle-mcp.mintlify.app/clients/cursor)).
            Archivo:{' '}
            <strong>
              {isMac ? '~/.cursor/mcp.json' : '%USERPROFILE%\\.cursor\\mcp.json'}
            </strong>
          </p>
          <ShellBlock
            title={isMac ? 'mcp.json (macOS)' : 'mcp.json (Windows)'}
            code={isMac ? MCP_JSON_MAC : MCP_JSON_WINDOWS}
            caption={
              isMac
                ? 'Sustituye TU_USUARIO por tu usuario de macOS.'
                : 'Usa doble barra invertida en la ruta. Ejemplo: C:\\\\oracle\\\\sqlcl\\\\bin\\\\sql.exe'
            }
          />

          <h3 className={styles.subsectionTitle}>OpenCode</h3>
          <p className={styles.sectionText}>
            Archivo: <strong>~/.config/opencode/opencode.jsonc</strong>
          </p>
          <ShellBlock
            title={isMac ? 'OpenCode (macOS)' : 'OpenCode (Windows)'}
            code={isMac ? OPENCODE_CONFIG_MAC : OPENCODE_CONFIG_WINDOWS}
            caption='Bloque "mcp" con type "local". Reinicia OpenCode tras guardar.'
          />

          <div className={styles.note}>
            <span className={styles.noteLabel}>Común a todos los clientes</span>
            <p>
              Nombre del servidor: <strong>sqlcl</strong>. Ruta absoluta al binario. Reinicio
              obligatorio. En el panel MCP deberías ver <strong>sqlcl</strong> activo antes de
              abrir un chat nuevo.
            </p>
          </div>
        </GuideSection>

        <GuideSection step={8} title="Verificar MCP y practicar ejercicios">
          <p className={styles.sectionText}>
            Abre un <strong>chat nuevo</strong> en tu cliente (Codex, Cursor u OpenCode). Prueba
            en este orden y aprueba cada herramienta cuando te lo pida:
          </p>
          <div className={styles.promptCard}>
            <p className={styles.promptTitle}>1. Conectar</p>
            <p className={styles.promptText}>
              Usa el MCP de SQLcl para conectarte a la conexión guardada{' '}
              <strong>co_local</strong>.
            </p>
          </div>
          <div className={styles.promptCard}>
            <p className={styles.promptTitle}>2. Listar tablas CO</p>
            <p className={styles.promptText}>
              Ejecuta: SELECT table_name FROM all_tables WHERE owner = 'CO' ORDER BY 1;
            </p>
          </div>
          <div className={styles.promptCard}>
            <p className={styles.promptTitle}>3. Ejercicio de la tutoría</p>
            <p className={styles.promptText}>
              {`Estoy practicando tutorías SQL. Usa el MCP de SQLcl conectado a co_local y ejecuta el paso actual del ejercicio Clientes VIP:

SELECT c.FULL_NAME,
       SUM(oi.UNIT_PRICE * oi.QUANTITY) AS total_compras
FROM CO.ORDERS o
JOIN CO.ORDER_ITEMS oi ON oi.ORDER_ID = o.ORDER_ID
JOIN CO.CUSTOMERS c ON c.CUSTOMER_ID = o.CUSTOMER_ID
GROUP BY c.FULL_NAME
HAVING SUM(oi.UNIT_PRICE * oi.QUANTITY) > 1000
ORDER BY total_compras DESC;

Explícame el resultado.`}
            </p>
          </div>
          <div className={styles.promptCard}>
            <p className={styles.promptTitle}>4. Explicar PL/SQL (lectura)</p>
            <p className={styles.promptText}>
              {`Usa SQLcl MCP. Muestra el bloque PL/SQL del ejercicio de reconocimiento (CUSTOMER_ID = 5) y explícame en lenguaje comercial qué hace, sin reescribirlo.`}
            </p>
          </div>
          <div className={styles.note}>
            <span className={styles.noteLabel}>Flujo recomendado</span>
            <p>
              Ve a la sección <strong>Ejercicio</strong> → lee el paso del carrusel → pídele a la
              IA que lo ejecute con SQLcl MCP → revisa el resultado → siguiente paso.
            </p>
          </div>
          <div className={styles.warn}>
            <span className={styles.warnLabel}>Requisito antes de usar el MCP</span>
            <p>
              El contenedor Oracle debe estar corriendo <strong>antes</strong> de que cualquier
              agente IA intente conectarse vía MCP. Ejecuta estos pasos en la terminal cada vez
              que reinicies el equipo o hayas apagado el contenedor:
            </p>
          </div>
          <ShellBlock
            title={isMac ? 'Levantar Oracle (macOS con Colima)' : 'Levantar Oracle (Windows)'}
            code={
              isMac
                ? `# 1. Si usas Colima:
colima status 2>/dev/null || colima start

# 2. Arrancar el contenedor Oracle:
docker start oracle-free

# 3. Esperar a que esté listo (30-60 seg):
docker logs oracle-free 2>&1 | grep "DATABASE IS READY TO USE"`
                : `# 1. Arrancar el contenedor Oracle:
docker start oracle-free

# 2. Esperar a que esté listo (30-60 seg):
docker logs oracle-free 2>&1 | findstr "DATABASE IS READY TO USE"`
            }
          />
          <p className={styles.sectionText}>
            Si el contenedor no está levantado, el MCP de SQLcl arranca pero falla con{' '}
            <strong>ORA-12541: TNS:no listener</strong> o timeout. El MCP no puede ejecutar{' '}
            <strong>docker</strong> en tu máquina: debes levantar Oracle tú manualmente.
          </p>
          <div className={styles.note}>
            <span className={styles.noteLabel}>Los datos persisten</span>
            <p>
              Si reinicias el sistema, los contenedores se detienen y hay que repetir los pasos de
              arriba. La conexión guardada (<strong>co_local</strong>), los esquemas CO/SH y los
              datos siguen en el volumen del contenedor aunque esté apagado.
            </p>
          </div>
        </GuideSection>

        <GuideSection step={9} title="Solución de problemas">
          <ul className={styles.list}>
            {isMac && (
              <li>
                <strong>Sin RAM / Mac lento</strong> — Usa Colima con{' '}
                <strong>--memory 4</strong>. Cierra navegador y otras apps. La imagen{' '}
                <strong>23-slim</strong> reduce descarga y arranque.
              </li>
            )}
            <li>
              <strong>ORA-12541 / connection refused</strong> — El contenedor aún no está
              listo. Revisa <strong>docker logs oracle-free</strong> hasta ver DATABASE IS
              READY. Prueba el <strong>docker exec</strong> del paso 2.
            </li>
            <li>
              <strong>SQLcl no conecta pero Oracle sí</strong> — Usa{' '}
              <strong>docker exec oracle-free sql ...</strong> para aislar si el problema es
              SQLcl o la base.
            </li>
            <li>
              <strong>ORA-29833 en SH</strong> — Normal en Database Free. Ignóralo o ejecuta{' '}
              <strong>catctx.sql</strong> como SYSDBA (paso 5).
            </li>
            <li>
              <strong>sh_install.sql falla</strong> — Debe ejecutarse con <strong>SQLcl</strong>,
              no SQL*Plus. Verifica <strong>sql -version</strong> ≥ 25.2.
            </li>
            <li>
              <strong>sqlcl no aparece en el cliente</strong> — JSON/TOML válido, ruta absoluta,
              nombre <strong>sqlcl</strong> en minúsculas, reinicia el cliente.
            </li>
            <li>
              <strong>MCP no conecta / pide password</strong> — Recrea con{' '}
              <strong>-name co_local -save -savepwd</strong>. Verifica con{' '}
              <strong>connmgr list</strong>.
            </li>
            <li>
              <strong>ORA- sobre permisos en CO/SH</strong> — Usa prefijo de esquema:{' '}
              <strong>CO.CUSTOMERS</strong>, <strong>SH.SALES</strong>.
            </li>
            <li>
              <strong>TNS / alias no encontrado</strong> — Si usas TNS en lugar de cadena
              EZConnect, añade <strong>TNS_ADMIN</strong> en el bloque <strong>env</strong> de
              la configuración MCP.
            </li>
          </ul>
          <div className={styles.warn}>
            <span className={styles.warnLabel}>Sin instalar Oracle</span>
            <p>
              Si no quieres montar nada local, practica en{' '}
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
