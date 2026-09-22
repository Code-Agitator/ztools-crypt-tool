import { useEffect, useState } from 'react'
import type { AlgorithmProps } from '../../registry/types'
import { Actions, CopyButton, Field } from '../../shared'
import { runCodec, showError, showData } from '../codec'

export default function RsaUI({ enterPayload }: AlgorithmProps) {
  const [publicKey, setPublicKey] = useState('')
  const [privateKey, setPrivateKey] = useState('')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')

  useEffect(() => {
    if (enterPayload) setInput(enterPayload)
  }, [enterPayload])

  const keygen = () => {
    const r = runCodec(() => window.services.crypt.rsa.generateKeyPair())
    if (!r.ok) {
      setError(r.error)
      return
    }
    try {
      const pair = JSON.parse(r.data) as { publicKey: string; privateKey: string }
      setPublicKey(pair.publicKey)
      setPrivateKey(pair.privateKey)
      setNotice('已生成 2048 位密钥对')
      setError('')
    } catch {
      setError('密钥对解析失败')
    }
  }

  const encrypt = () => {
    const r = runCodec(() => window.services.crypt.rsa.encrypt({ publicKey, plaintext: input }))
    setError(showError(r))
    setOutput(showData(r))
  }

  const decrypt = () => {
    const r = runCodec(() => window.services.crypt.rsa.decrypt({ privateKey, ciphertext: input }))
    setError(showError(r))
    setOutput(showData(r))
  }

  return (
    <>
      <div className="ct-grid2">
        <Field label="公钥 Public Key" hint="PEM" help="用于加密；可从私钥或生成获得" type="textarea" rows={4} value={publicKey} onChange={setPublicKey} />
        <Field label="私钥 Private Key" hint="PEM" help="用于解密；勿泄露" type="textarea" rows={4} value={privateKey} onChange={setPrivateKey} />
        <Field label="输入" help="加密传明文；解密传 Base64 密文（单块）" type="textarea" value={input} onChange={setInput} />
        <Field label="输出" help="加密得 Base64；解密得明文" type="textarea" value={output} onChange={() => {}} readOnly />
      </div>
      <Actions
        items={[
          { label: '生成密钥对', variant: 'ghost', onClick: keygen },
          { label: '加密', variant: 'primary', onClick: encrypt },
          { label: '解密', onClick: decrypt }
        ]}
      />
      <div className="ct-actions">
        <CopyButton text={output} />
        <CopyButton text={publicKey} label="复制公钥" />
        <CopyButton text={privateKey} label="复制私钥" />
      </div>
      {notice ? <div className="ct-field-help">{notice}</div> : null}
      {error ? <div className="ct-field-error">{error}</div> : null}
    </>
  )
}
