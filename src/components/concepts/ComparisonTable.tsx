import styles from './ComparisonTable.module.css'

interface ComparisonTableProps {
  title: string
  headerA: string
  headerB: string
  rows: { aspect: string; optionA: string; optionB: string }[]
}

export default function ComparisonTable({
  title,
  headerA,
  headerB,
  rows,
}: ComparisonTableProps) {
  return (
    <div className={styles.wrapper}>
      <h4 className={styles.title}>{title}</h4>
      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col">Aspecto</th>
            <th scope="col">{headerA}</th>
            <th scope="col">{headerB}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.aspect}>
              <th scope="row">{row.aspect}</th>
              <td data-label={headerA}>{row.optionA}</td>
              <td data-label={headerB}>{row.optionB}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
