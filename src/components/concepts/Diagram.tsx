import type { DiagramVariant } from '../../types/concepts'
import styles from './Diagram.module.css'

interface DiagramProps {
  variant: DiagramVariant
}

export default function Diagram({ variant }: DiagramProps) {
  return (
    <figure className={styles.figure}>
      <div className={styles.canvas}>{renderDiagram(variant)}</div>
      {captions[variant] && (
        <figcaption className={styles.caption}>{captions[variant]}</figcaption>
      )}
    </figure>
  )
}

const captions: Partial<Record<DiagramVariant, string>> = {
  'query-flow': 'Flujo de una consulta SELECT: el motor lee tablas, filtra filas y devuelve columnas.',
  'join-inner': 'INNER JOIN: solo filas donde la clave coincide en ambas tablas.',
  'join-left': 'LEFT JOIN: todas las filas de la tabla izquierda; NULL donde no hay coincidencia.',
  'join-right': 'RIGHT JOIN: todas las filas de la tabla derecha; NULL donde no hay coincidencia.',
  'star-schema': 'Esquema estrella: una tabla de hechos central conectada directamente a dimensiones desnormalizadas.',
  'snowflake-schema': 'Esquema copo de nieve: las dimensiones se normalizan en subtablas jerárquicas.',
  'plsql-block': 'Estructura de un bloque anónimo PL/SQL en Oracle.',
  transaction: 'Transacción ERP: venta + inventario + factura deben confirmarse juntas o revertirse.',
  'where-having': 'WHERE filtra filas antes de agrupar; HAVING filtra grupos después de GROUP BY.',
}

function renderDiagram(variant: DiagramVariant) {
  switch (variant) {
    case 'query-flow':
      return <QueryFlowDiagram />
    case 'join-inner':
      return <JoinDiagram type="inner" />
    case 'join-left':
      return <JoinDiagram type="left" />
    case 'join-right':
      return <JoinDiagram type="right" />
    case 'star-schema':
      return <StarSchemaDiagram />
    case 'snowflake-schema':
      return <SnowflakeSchemaDiagram />
    case 'plsql-block':
      return <PlsqlBlockDiagram />
    case 'transaction':
      return <TransactionDiagram />
    case 'where-having':
      return <WhereHavingDiagram />
    default:
      return null
  }
}

function QueryFlowDiagram() {
  return (
    <svg viewBox="0 0 520 120" className={styles.svg} aria-hidden="true">
      <rect x="10" y="35" width="90" height="50" rx="2" className={styles.boxFill} />
      <text x="55" y="58" textAnchor="middle" className={styles.label}>TABLA</text>
      <text x="55" y="74" textAnchor="middle" className={styles.sublabel}>FROM</text>

      <path d="M100 60 H140" className={styles.arrow} markerEnd="url(#arrowhead)" />
      <rect x="140" y="35" width="90" height="50" rx="2" className={styles.boxFillAccent} />
      <text x="185" y="58" textAnchor="middle" className={styles.label}>FILTRO</text>
      <text x="185" y="74" textAnchor="middle" className={styles.sublabel}>WHERE</text>

      <path d="M230 60 H270" className={styles.arrow} markerEnd="url(#arrowhead)" />
      <rect x="270" y="35" width="90" height="50" rx="2" className={styles.boxFill} />
      <text x="315" y="58" textAnchor="middle" className={styles.label}>COLUMNAS</text>
      <text x="315" y="74" textAnchor="middle" className={styles.sublabel}>SELECT</text>

      <path d="M360 60 H400" className={styles.arrow} markerEnd="url(#arrowhead)" />
      <rect x="400" y="35" width="110" height="50" rx="2" className={styles.boxFillHighlight} />
      <text x="455" y="58" textAnchor="middle" className={styles.label}>RESULTADO</text>
      <text x="455" y="74" textAnchor="middle" className={styles.sublabel}>filas × cols</text>

      <defs>
        <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#f59e0b" />
        </marker>
      </defs>
    </svg>
  )
}

function JoinDiagram({ type }: { type: 'inner' | 'left' | 'right' }) {
  const leftOnly = type === 'left'
  const rightOnly = type === 'right'
  const overlap = type === 'inner' || type === 'left' || type === 'right'

  return (
    <svg viewBox="0 0 400 180" className={styles.svg} aria-hidden="true">
      <circle cx="150" cy="90" r="70" className={leftOnly || overlap ? styles.vennLeft : styles.vennMuted} />
      <circle cx="250" cy="90" r="70" className={rightOnly || overlap ? styles.vennRight : styles.vennMuted} />
      {type === 'inner' && (
        <clipPath id="overlap">
          <circle cx="150" cy="90" r="70" />
        </clipPath>
      )}
      {type === 'inner' && (
        <circle cx="250" cy="90" r="70" clipPath="url(#overlap)" className={styles.vennOverlap} />
      )}
      <text x="110" y="92" textAnchor="middle" className={styles.vennLabel}>Tabla A</text>
      <text x="290" y="92" textAnchor="middle" className={styles.vennLabel}>Tabla B</text>
      {type === 'inner' && (
        <text x="200" y="92" textAnchor="middle" className={styles.vennLabelAccent}>Coinciden</text>
      )}
      {type === 'left' && (
        <text x="130" y="92" textAnchor="middle" className={styles.vennLabelAccent}>Todas A</text>
      )}
      {type === 'right' && (
        <text x="270" y="92" textAnchor="middle" className={styles.vennLabelAccent}>Todas B</text>
      )}
      <text x="200" y="165" textAnchor="middle" className={styles.diagramTitle}>
        {type === 'inner' && 'INNER JOIN'}
        {type === 'left' && 'LEFT JOIN'}
        {type === 'right' && 'RIGHT JOIN'}
      </text>
    </svg>
  )
}

function StarSchemaDiagram() {
  return (
    <svg viewBox="0 0 420 260" className={styles.svg} aria-hidden="true">
      <rect x="155" y="95" width="110" height="70" rx="3" className={styles.factBox} />
      <text x="210" y="125" textAnchor="middle" className={styles.factLabel}>HECHOS</text>
      <text x="210" y="145" textAnchor="middle" className={styles.factSublabel}>ventas</text>

      {[
        { x: 60, y: 20, label: 'Dim. Cliente' },
        { x: 300, y: 20, label: 'Dim. Producto' },
        { x: 60, y: 200, label: 'Dim. Tiempo' },
        { x: 300, y: 200, label: 'Dim. Región' },
      ].map(({ x, y, label }) => (
        <g key={label}>
          <rect x={x} y={y} width="100" height="44" rx="2" className={styles.dimBox} />
          <text x={x + 50} y={y + 27} textAnchor="middle" className={styles.dimLabel}>{label}</text>
          <line
            x1={x + 50}
            y1={y + (y < 100 ? 44 : 0)}
            x2={210}
            y2={y < 100 ? 95 : 165}
            className={styles.connector}
          />
        </g>
      ))}
    </svg>
  )
}

function SnowflakeSchemaDiagram() {
  return (
    <svg viewBox="0 0 420 280" className={styles.svg} aria-hidden="true">
      <rect x="155" y="110" width="110" height="60" rx="3" className={styles.factBox} />
      <text x="210" y="145" textAnchor="middle" className={styles.factLabel}>HECHOS</text>

      <rect x="30" y="30" width="90" height="36" rx="2" className={styles.dimBox} />
      <text x="75" y="52" textAnchor="middle" className={styles.dimLabelSmall}>Categoría</text>
      <rect x="140" y="10" width="90" height="36" rx="2" className={styles.dimBox} />
      <text x="185" y="32" textAnchor="middle" className={styles.dimLabelSmall}>Producto</text>
      <line x1="185" y1="46" x2="185" y2="70" className={styles.connector} />
      <line x1="120" y1="48" x2="140" y2="28" className={styles.connector} />

      <rect x="290" y="30" width="90" height="36" rx="2" className={styles.dimBox} />
      <text x="335" y="52" textAnchor="middle" className={styles.dimLabelSmall}>Cliente</text>
      <line x1="335" y1="66" x2="240" y2="110" className={styles.connector} />
      <line x1="185" y1="70" x2="210" y2="110" className={styles.connector} />

      <rect x="30" y="210" width="90" height="36" rx="2" className={styles.dimBox} />
      <text x="75" y="232" textAnchor="middle" className={styles.dimLabelSmall}>Mes</text>
      <rect x="140" y="230" width="90" height="36" rx="2" className={styles.dimBox} />
      <text x="185" y="252" textAnchor="middle" className={styles.dimLabelSmall}>Año</text>
      <line x1="120" y1="228" x2="140" y2="248" className={styles.connector} />
      <line x1="185" y1="230" x2="200" y2="170" className={styles.connector} />
    </svg>
  )
}

function PlsqlBlockDiagram() {
  const sections = [
    { label: 'DECLARE', desc: 'Variables, cursores, excepciones', y: 10, h: 50 },
    { label: 'BEGIN', desc: 'Lógica principal', y: 70, h: 50 },
    { label: 'EXCEPTION', desc: 'Manejo de errores', y: 130, h: 50 },
    { label: 'END;', desc: 'Cierre del bloque', y: 190, h: 36 },
  ]

  return (
    <svg viewBox="0 0 340 240" className={styles.svg} aria-hidden="true">
      {sections.map(({ label, desc, y, h }) => (
        <g key={label}>
          <rect x="20" y={y} width="300" height={h} rx="2" className={styles.plsqlSection} />
          <text x="40" y={y + 22} className={styles.plsqlKeyword}>{label}</text>
          <text x="40" y={y + 38} className={styles.plsqlDesc}>{desc}</text>
        </g>
      ))}
    </svg>
  )
}

function TransactionDiagram() {
  return (
    <svg viewBox="0 0 480 140" className={styles.svg} aria-hidden="true">
      <rect x="10" y="40" width="100" height="50" rx="2" className={styles.boxFill} />
      <text x="60" y="62" textAnchor="middle" className={styles.label}>Pedido</text>
      <text x="60" y="78" textAnchor="middle" className={styles.sublabel}>INSERT</text>

      <rect x="130" y="40" width="100" height="50" rx="2" className={styles.boxFill} />
      <text x="180" y="62" textAnchor="middle" className={styles.label}>Inventario</text>
      <text x="180" y="78" textAnchor="middle" className={styles.sublabel}>UPDATE</text>

      <rect x="250" y="40" width="100" height="50" rx="2" className={styles.boxFill} />
      <text x="300" y="62" textAnchor="middle" className={styles.label}>Factura</text>
      <text x="300" y="78" textAnchor="middle" className={styles.sublabel}>INSERT</text>

      <path d="M110 65 H130 M230 65 H250" className={styles.arrow} />

      <rect x="370" y="30" width="100" height="70" rx="2" className={styles.commitBox} />
      <text x="420" y="58" textAnchor="middle" className={styles.label}>COMMIT</text>
      <text x="420" y="78" textAnchor="middle" className={styles.sublabel}>todo OK</text>
      <text x="420" y="92" textAnchor="middle" className={styles.sublabelSmall}>o ROLLBACK</text>

      <path d="M350 65 H370" className={styles.arrow} markerEnd="url(#arrowhead2)" />
      <defs>
        <marker id="arrowhead2" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#86efac" />
        </marker>
      </defs>
    </svg>
  )
}

function WhereHavingDiagram() {
  return (
    <svg viewBox="0 0 480 130" className={styles.svg} aria-hidden="true">
      <rect x="10" y="20" width="110" height="44" rx="2" className={styles.boxFill} />
      <text x="65" y="47" textAnchor="middle" className={styles.label}>Todas las filas</text>

      <path d="M120 42 H155" className={styles.arrow} markerEnd="url(#arrowhead3)" />
      <rect x="155" y="20" width="110" height="44" rx="2" className={styles.boxFillAccent} />
      <text x="210" y="40" textAnchor="middle" className={styles.label}>WHERE</text>
      <text x="210" y="56" textAnchor="middle" className={styles.sublabel}>filtra filas</text>

      <path d="M265 42 H300" className={styles.arrow} markerEnd="url(#arrowhead3)" />
      <rect x="300" y="20" width="110" height="44" rx="2" className={styles.boxFill} />
      <text x="355" y="40" textAnchor="middle" className={styles.label}>GROUP BY</text>
      <text x="355" y="56" textAnchor="middle" className={styles.sublabel}>agrupa</text>

      <path d="M410 42 H445" className={styles.arrow} markerEnd="url(#arrowhead3)" />
      <rect x="155" y="80" width="110" height="44" rx="2" className={styles.boxFillHighlight} />
      <text x="210" y="100" textAnchor="middle" className={styles.label}>HAVING</text>
      <text x="210" y="116" textAnchor="middle" className={styles.sublabel}>filtra grupos</text>

      <path d="M355 64 V72 H210 V80" className={styles.arrowDashed} markerEnd="url(#arrowhead3)" />

      <defs>
        <marker id="arrowhead3" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#f59e0b" />
        </marker>
      </defs>
    </svg>
  )
}
