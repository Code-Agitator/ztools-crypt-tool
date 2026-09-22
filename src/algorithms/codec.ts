import type { CryptResult } from '../types/crypt'

export function runCodec(fn: () => CryptResult): CryptResult {
  try {
    return fn()
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : '计算失败' }
  }
}

export function showError(result: CryptResult): string {
  return result.ok ? '' : result.error
}

export function showData(result: CryptResult): string {
  return result.ok ? result.data : ''
}
