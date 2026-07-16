import type { SqlStep } from '../../types/exercises'

type StepInput = Omit<SqlStep, 'step'>

export function buildSteps(steps: StepInput[]): SqlStep[] {
  return steps.map((step, index) => ({
    ...step,
    step: index + 1,
  }))
}
