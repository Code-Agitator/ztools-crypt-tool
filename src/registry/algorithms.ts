import type { AlgorithmModule, CategoryId } from './types'
import { base64 } from '../algorithms/base64'
import { hex } from '../algorithms/hex'
import { url } from '../algorithms/url'

export const algorithms: AlgorithmModule[] = [base64, hex, url]

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
