import type { SchemaTable } from '../../types/exercises'
import styles from './SchemaTables.module.css'

interface SchemaTablesProps {
  tables: SchemaTable[]
}

export default function SchemaTables({ tables }: SchemaTablesProps) {
  return (
    <div className={styles.grid}>
      {tables.map((table) => (
        <details key={table.name} className={styles.tableCard} open={tables.length <= 4}>
          <summary className={styles.summary}>
            <span className={styles.tableName}>{table.name}</span>
            <span className={styles.colCount}>{table.columns.length} columnas</span>
          </summary>
          <p className={styles.description}>{table.description}</p>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th scope="col">Columna</th>
                  <th scope="col">Tipo</th>
                  <th scope="col">Clave</th>
                </tr>
              </thead>
              <tbody>
                {table.columns.map((col) => (
                  <tr key={col.name}>
                    <td className={styles.colName}>{col.name}</td>
                    <td className={styles.colType}>{col.type}</td>
                    <td>
                      {col.key && (
                        <span className={col.key === 'PK' ? styles.pk : styles.fk}>
                          {col.key}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>
      ))}
    </div>
  )
}
