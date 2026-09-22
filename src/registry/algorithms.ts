import type { AlgorithmModule, CategoryId } from './types'

// Tasks 10–13 push modules into this array; stubbed empty here.
export const algorithms: AlgorithmModule[] = []

export function getById(list: AlgorithmModule[], id: string): AlgorithmModule | undefined {
  return list.find((m) => m.meta.id === id)
}

export function getByCategory(list: AlgorithmModule[], category: CategoryId): AlgorithmModule[] {
  return list.filter((m) => m.meta.category === category)
}

export function getEnabledList(
  list: AlgorithmModule[],
  enabled: Record<string, boolean>
): AlgorithmModule[] {
  return list.filter((m) => enabled[m.meta.id])
}

export function firstEnabledId(
  list: AlgorithmModule[],
  enabled: Record<string, boolean>
): string | null {
  const first = getEnabledList(list, enabled)[0]
  return first ? first.meta.id : null
}
