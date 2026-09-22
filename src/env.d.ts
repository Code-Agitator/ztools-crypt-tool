/// <reference types="vite/client" />
/// <reference types="@ztools-center/ztools-api-types" />

export type CryptResultOk<T = string> = { ok: true; data: T }
export type CryptResultErr = { ok: false; error: string }
export type CryptResult<T = string> = CryptResultOk<T> | CryptResultErr

declare global {
  interface Window {
    services: {
      readFile: (file: string) => string
      writeTextFile: (text: string) => string
      writeImageFile: (base64Url: string) => string | undefined
      crypt: {
        base64: { encode: (s: string) => CryptResult; decode: (s: string) => CryptResult }
        hex: { encode: (s: string) => CryptResult; decode: (s: string) => CryptResult }
        url: { encode: (s: string) => CryptResult; decode: (s: string) => CryptResult }
        md5: { digest: (s: string) => CryptResult }
        sha256: { digest: (s: string) => CryptResult }
        aes: {
          encrypt: (a: { key: string; iv: string; mode: string; plaintext: string }) => CryptResult
          decrypt: (a: { key: string; iv: string; mode: string; ciphertext: string }) => CryptResult
        }
        rsa: {
          encrypt: (a: { publicKey: string; plaintext: string }) => CryptResult
          decrypt: (a: { privateKey: string; ciphertext: string }) => CryptResult
          generateKeyPair: () => CryptResult
        }
        hmac: {
          sign: (a: { key: string; data: string; algo: string }) => CryptResult
          verify: (a: { key: string; data: string; algo: string; signature: string }) => CryptResult<boolean>
        }
        pbkdf2: {
          derive: (a: {
            password: string
            salt: string
            iterations: number
            keylen: number
            hash: string
          }) => CryptResult
        }
      }
    }
  }
}

export {}
