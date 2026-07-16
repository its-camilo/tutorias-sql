import type { ExerciseSchema } from '../../types/exercises'
import { coTables } from './coTables'
import { coExercises } from './coExercises'
import { shTables } from './shTables'
import { shExercises } from './shExercises'

export const exerciseSchemas: ExerciseSchema[] = [
  {
    id: 'co',
    name: 'Customer Orders',
    shortName: 'CO',
    badge: 'ERP de ventas',
    description:
      'Simula un ERP de ventas completo con clientes, productos, pedidos, tiendas, envíos e inventario. Cubre del Nivel 1 al Nivel 4: fundamentos, JOINs, subconsultas y PL/SQL.',
    purpose: 'Columna vertebral de la tutoría — practica SQL en contexto real de negocio.',
    tables: coTables,
    exercises: coExercises,
  },
  {
    id: 'sh',
    name: 'Sales History',
    shortName: 'SH',
    badge: 'Data warehouse',
    description:
      'Esquema dimensional diseñado para reportes analíticos. Contiene la tabla de hechos SALES conectada a dimensiones de tiempo, clientes, productos, canales y promociones.',
    purpose: 'Bloque de modelado dimensional — Nivel 3 (fact vs dimension, esquema estrella).',
    tables: shTables,
    exercises: shExercises,
  },
]

export { coTables, coExercises, shTables, shExercises }
