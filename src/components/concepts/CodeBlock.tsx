import styles from './CodeBlock.module.css'

interface CodeBlockProps {
  title?: string
  sql: string
  caption?: string
}

function highlightSql(sql: string): string {
  const keywords = [
    'RAISE_APPLICATION_ERROR', 'SELECT', 'FROM', 'WHERE', 'ORDER', 'BY', 'GROUP',
    'HAVING', 'INSERT', 'INTO', 'UPDATE', 'SET', 'DELETE', 'INNER', 'LEFT',
    'RIGHT', 'OUTER', 'JOIN', 'ON', 'AS', 'AND', 'OR', 'NOT', 'IN', 'BETWEEN',
    'LIKE', 'IS', 'NULL', 'DISTINCT', 'COUNT', 'SUM', 'AVG', 'MAX', 'MIN',
    'CREATE', 'TABLE', 'PRIMARY', 'KEY', 'FOREIGN', 'REFERENCES', 'DECLARE',
    'BEGIN', 'END', 'EXCEPTION', 'WHEN', 'THEN', 'ELSE', 'IF', 'LOOP', 'FOR',
    'CURSOR', 'OPEN', 'FETCH', 'CLOSE', 'PROCEDURE', 'FUNCTION', 'RETURN',
    'OUT', 'COMMIT', 'ROLLBACK', 'TRUNCATE', 'DROP', 'OTHERS', 'ROWNUM',
    'VALUES', 'VARCHAR2', 'NUMBER', 'DATE', 'BOOLEAN', 'EXIT', 'USING',
  ]

  let result = sql
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  result = result.replace(/('(?:[^'\\]|\\.)*')/g, '<span class="hl-str">$1</span>')
  result = result.replace(/(--[^\n]*)/g, '<span class="hl-cmt">$1</span>')

  const keywordPattern = new RegExp(`\\b(${keywords.join('|')})\\b`, 'gi')
  result = result.replace(keywordPattern, '<span class="hl-kw">$1</span>')

  result = result.replace(/\b(\d+(?:\.\d+)?)\b/g, '<span class="hl-num">$1</span>')

  return result
}

export default function CodeBlock({ title, sql, caption }: CodeBlockProps) {
  return (
    <figure className={styles.figure}>
      {title && <figcaption className={styles.title}>{title}</figcaption>}
      <pre className={styles.pre}>
        <code
          className={styles.code}
          dangerouslySetInnerHTML={{ __html: highlightSql(sql.trim()) }}
        />
      </pre>
      {caption && <p className={styles.caption}>{caption}</p>}
    </figure>
  )
}
