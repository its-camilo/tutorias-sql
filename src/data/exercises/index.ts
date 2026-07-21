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
      'Simula un ERP de pedidos: clientes, productos, inventario y ventas. Ejercicios pensados para el perfil Comercial GenO — entender y explicar, no memorizar SQL avanzado.',
    purpose:
      'Practica consultas útiles en prospección, seguimiento de cuentas e inventario, y cierra cada una explicándola en lenguaje de cliente.',
    tables: coTables,
    exercises: coExercises,
  },
  {
    id: 'sh',
    name: 'Sales History',
    shortName: 'SH',
    badge: 'Data warehouse',
    description:
      'Esquema dimensional para reportes: hechos de venta conectados a producto, tiempo y canal. Ideal para hablar de reporting con un cliente sin tecnicismos excesivos.',
    purpose:
      'Practica el vocabulario de hechos vs dimensiones — clave en conversaciones comerciales sobre analítica.',
    tables: shTables,
    exercises: shExercises,
  },
]

export { coTables, coExercises, shTables, shExercises }
