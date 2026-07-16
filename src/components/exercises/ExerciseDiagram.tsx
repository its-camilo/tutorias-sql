import type { ExerciseDiagramVariant } from '../../types/exercises'
import styles from './ExerciseDiagram.module.css'

interface ExerciseDiagramProps {
  variant: ExerciseDiagramVariant
  caption: string
}

export default function ExerciseDiagram({ variant, caption }: ExerciseDiagramProps) {
  return (
    <figure className={styles.figure}>
      <div className={styles.canvas}>{renderDiagram(variant)}</div>
      <figcaption className={styles.caption}>{caption}</figcaption>
    </figure>
  )
}

function Box({ x, y, w, h, label, sub, accent }: {
  x: number; y: number; w: number; h: number
  label: string; sub?: string; accent?: boolean
}) {
  return (
    <g>
      <rect
        x={x} y={y} width={w} height={h} rx={2}
        className={accent ? styles.boxAccent : styles.box}
      />
      <text x={x + w / 2} y={y + (sub ? 22 : 28)} textAnchor="middle" className={styles.label}>
        {label}
      </text>
      {sub && (
        <text x={x + w / 2} y={y + 38} textAnchor="middle" className={styles.sub}>
          {sub}
        </text>
      )}
    </g>
  )
}

function Arrow({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  return (
    <line x1={x1} y1={y1} x2={x2} y2={y2} className={styles.arrow} markerEnd="url(#exArrow)" />
  )
}

function Defs() {
  return (
    <defs>
      <marker id="exArrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
        <polygon points="0 0, 8 3, 0 6" fill="#f59e0b" />
      </marker>
    </defs>
  )
}

function renderDiagram(variant: ExerciseDiagramVariant) {
  switch (variant) {
    case 'co-filter-orders':
      return (
        <svg viewBox="0 0 480 100" className={styles.svg} aria-hidden="true">
          <Defs />
          <Box x={10} y={25} w={100} h={50} label="CUSTOMERS" sub="customer_id" />
          <Arrow x1={110} y1={50} x2={145} y2={50} />
          <Box x={145} y={25} w={100} h={50} label="ORDERS" sub="WHERE filtro" accent />
          <Arrow x1={245} y1={50} x2={280} y2={50} />
          <Box x={280} y={25} w={190} h={50} label="Resultado" sub="pedidos del cliente" />
        </svg>
      )

    case 'co-aggregate-customers':
      return (
        <svg viewBox="0 0 480 110" className={styles.svg} aria-hidden="true">
          <Defs />
          <Box x={10} y={30} w={90} h={44} label="ORDERS" />
          <Box x={120} y={30} w={100} h={44} label="ORDER_ITEMS" />
          <Arrow x1={100} y1={52} x2={120} y2={52} />
          <Arrow x1={220} y1={52} x2={250} y2={52} />
          <Box x={250} y={20} w={220} h={64} label="GROUP BY cliente" sub="SUM(monto) · COUNT(pedidos)" accent />
        </svg>
      )

    case 'co-having-vip':
      return (
        <svg viewBox="0 0 480 120" className={styles.svg} aria-hidden="true">
          <Defs />
          <Box x={10} y={35} w={90} h={44} label="Filas" sub="WHERE" />
          <Arrow x1={100} y1={57} x2={130} y2={57} />
          <Box x={130} y={35} w={90} h={44} label="Grupos" sub="GROUP BY" />
          <Arrow x1={220} y1={57} x2={250} y2={57} />
          <Box x={250} y={35} w={130} h={44} label="HAVING" sub="total > 1000" accent />
          <Arrow x1={380} y1={57} x2={410} y2={57} />
          <Box x={410} y={35} w={60} h={44} label="VIP" />
        </svg>
      )

    case 'co-join-order-detail':
      return (
        <svg viewBox="0 0 520 110" className={styles.svg} aria-hidden="true">
          <Defs />
          <Box x={10} y={30} w={80} h={44} label="ORDERS" />
          <Box x={110} y={30} w={100} h={44} label="ORDER_ITEMS" accent />
          <Box x={230} y={30} w={90} h={44} label="PRODUCTS" accent />
          <Arrow x1={90} y1={52} x2={110} y2={52} />
          <Arrow x1={210} y1={52} x2={230} y2={52} />
          <Arrow x1={320} y1={52} x2={350} y2={52} />
          <Box x={350} y={20} w={160} h={64} label="Detalle factura" sub="producto · cant · precio" />
        </svg>
      )

    case 'co-join-top-product':
      return (
        <svg viewBox="0 0 480 110" className={styles.svg} aria-hidden="true">
          <Defs />
          <Box x={20} y={30} w={100} h={44} label="PRODUCTS" />
          <Box x={150} y={30} w={110} h={44} label="ORDER_ITEMS" accent />
          <Arrow x1={120} y1={52} x2={150} y2={52} />
          <Arrow x1={260} y1={52} x2={290} y2={52} />
          <Box x={290} y={20} w={170} h={64} label="TOP producto" sub="SUM(quantity)" />
        </svg>
      )

    case 'co-left-join-inactive':
      return (
        <svg viewBox="0 0 480 110" className={styles.svg} aria-hidden="true">
          <Defs />
          <Box x={30} y={25} w={110} h={55} label="CUSTOMERS" sub="todas las filas" accent />
          <Box x={180} y={25} w={100} h={55} label="ORDERS" sub="coincidencias" />
          <text x={155} y={58} className={styles.joinLabel}>LEFT</text>
          <Arrow x1={280} y1={52} x2={320} y2={52} />
          <Box x={320} y={25} w={140} h={55} label="Sin pedidos" sub="order_id IS NULL" />
        </svg>
      )

    case 'co-subquery-avg':
      return (
        <svg viewBox="0 0 480 120" className={styles.svg} aria-hidden="true">
          <Defs />
          <Box x={160} y={10} w={160} h={40} label="Subconsulta" sub="AVG(gasto total)" accent />
          <Arrow x1={240} y1={50} x2={240} y2={65} />
          <Box x={60} y={65} w={120} h={44} label="Por cliente" sub="SUM + GROUP" />
          <Arrow x1={180} y1={87} x2={210} y2={87} />
          <Box x={210} y={65} w={210} h={44} label="WHERE total > promedio" />
        </svg>
      )

    case 'co-subquery-correlated':
      return (
        <svg viewBox="0 0 480 110" className={styles.svg} aria-hidden="true">
          <Defs />
          <Box x={20} y={30} w={90} h={44} label="STORES" sub="cada tienda" />
          <Arrow x1={110} y1={52} x2={140} y2={52} />
          <Box x={140} y={20} w={140} h={64} label="Subconsulta" sub="MAX por store_id" accent />
          <Arrow x1={280} y1={52} x2={310} y2={52} />
          <Box x={310} y={30} w={150} h={44} label="Top por sucursal" />
        </svg>
      )

    case 'co-join-inventory':
      return (
        <svg viewBox="0 0 520 110" className={styles.svg} aria-hidden="true">
          <Defs />
          <Box x={10} y={30} w={90} h={44} label="INVENTORY" sub="stock bajo" accent />
          <Box x={120} y={30} w={110} h={44} label="ORDER_ITEMS" sub="alta demanda" accent />
          <Box x={250} y={30} w={90} h={44} label="PRODUCTS" />
          <Arrow x1={100} y1={52} x2={120} y2={52} />
          <Arrow x1={230} y1={52} x2={250} y2={52} />
          <Arrow x1={340} y1={52} x2={370} y2={52} />
          <Box x={370} y={20} w={140} h={64} label="Alerta stock" sub="reabastecer" />
        </svg>
      )

    case 'co-procedure':
    case 'co-function':
    case 'co-cursor':
    case 'co-exception':
      return (
        <svg viewBox="0 0 480 100" className={styles.svg} aria-hidden="true">
          <Defs />
          <Box x={20} y={25} w={120} h={50} label="PL/SQL" sub="bloque / subprograma" accent />
          <Arrow x1={140} y1={50} x2={175} y2={50} />
          <Box x={175} y={25} w={130} h={50} label="Tablas CO" sub="orders · items" />
          <Arrow x1={305} y1={50} x2={340} y2={50} />
          <Box x={340} y={25} w={120} h={50} label="Resultado" sub="OUT / RETURN" />
        </svg>
      )

    case 'sh-fact-table':
      return (
        <svg viewBox="0 0 400 100" className={styles.svg} aria-hidden="true">
          <Defs />
          <Box x={120} y={20} w={160} h={60} label="SALES" sub="AMOUNT_SOLD · QUANTITY_SOLD" accent />
          <text x={200} y={95} textAnchor="middle" className={styles.sub}>Tabla de hechos — cada fila = una venta</text>
        </svg>
      )

    case 'sh-dimensions':
      return (
        <svg viewBox="0 0 480 130" className={styles.svg} aria-hidden="true">
          <Defs />
          <Box x={190} y={45} w={100} h={44} label="SALES" accent />
          {[
            { x: 10, y: 10, l: 'TIMES' },
            { x: 100, y: 10, l: 'CUSTOMERS' },
            { x: 290, y: 10, l: 'PRODUCTS' },
            { x: 380, y: 10, l: 'CHANNELS' },
            { x: 190, y: 100, l: 'PROMOTIONS' },
          ].map(({ x, y, l }) => (
            <g key={l}>
              <Box x={x} y={y} w={90} h={36} label={l} />
              <line
                x1={x + 45} y1={y + 36}
                x2={240} y2={45}
                className={styles.connector}
              />
            </g>
          ))}
        </svg>
      )

    case 'sh-star-schema':
      return (
        <svg viewBox="0 0 420 260" className={styles.svg} aria-hidden="true">
          <Defs />
          <rect x={155} y={100} width={110} height={55} rx={3} className={styles.factBox} />
          <text x={210} y={125} textAnchor="middle" className={styles.factLabel}>SALES</text>
          <text x={210} y={142} textAnchor="middle" className={styles.sub}>hechos</text>
          {[
            { x: 60, y: 20, l: 'TIMES' },
            { x: 270, y: 20, l: 'PRODUCTS' },
            { x: 60, y: 195, l: 'CUSTOMERS' },
            { x: 270, y: 195, l: 'CHANNELS' },
            { x: 165, y: 210, l: 'PROMOTIONS' },
          ].map(({ x, y, l }) => (
            <g key={l}>
              <rect x={x} y={y} width={90} height={36} rx={2} className={styles.dimBox} />
              <text x={x + 45} y={y + 22} textAnchor="middle" className={styles.dimLabel}>{l}</text>
              <line x1={x + 45} y1={y + (y < 100 ? 36 : 0)} x2={210} y2={y < 100 ? 100 : 155} className={styles.connector} />
            </g>
          ))}
        </svg>
      )

    case 'sh-quarter-sales':
      return (
        <svg viewBox="0 0 480 110" className={styles.svg} aria-hidden="true">
          <Defs />
          <Box x={20} y={30} w={90} h={44} label="SALES" accent />
          <Box x={140} y={30} w={90} h={44} label="TIMES" accent />
          <Arrow x1={110} y1={52} x2={140} y2={52} />
          <Arrow x1={230} y1={52} x2={260} y2={52} />
          <Box x={260} y={20} w={200} h={64} label="Por trimestre" sub="CALENDAR_QUARTER_DESC" />
        </svg>
      )

    case 'sh-channel-sales':
      return (
        <svg viewBox="0 0 480 110" className={styles.svg} aria-hidden="true">
          <Defs />
          <Box x={20} y={30} w={90} h={44} label="SALES" accent />
          <Box x={140} y={30} w={100} h={44} label="CHANNELS" accent />
          <Arrow x1={110} y1={52} x2={140} y2={52} />
          <Arrow x1={240} y1={52} x2={270} y2={52} />
          <Box x={270} y={20} w={190} h={64} label="Online vs tienda" sub="CHANNEL_DESC" />
        </svg>
      )

    case 'sh-promo-sales':
      return (
        <svg viewBox="0 0 480 110" className={styles.svg} aria-hidden="true">
          <Defs />
          <Box x={20} y={30} w={90} h={44} label="SALES" accent />
          <Box x={140} y={30} w={110} h={44} label="PROMOTIONS" accent />
          <Arrow x1={110} y1={52} x2={140} y2={52} />
          <Arrow x1={250} y1={52} x2={280} y2={52} />
          <Box x={280} y={20} w={180} h={64} label="ROI campaña" sub="SUM(amount_sold)" />
        </svg>
      )

    default:
      return null
  }
}
