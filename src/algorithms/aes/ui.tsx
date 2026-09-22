import { useEffect, useState } from 'react'
import type { AlgorithmProps } from '../../registry/types'
import { Actions, CopyButton, Field } from '../../shared'
import { runCodec, showError, showData } from '../codec'

export default function AesUI({ enterPayload }: AlgorithmProps) {
  const [key, setKey] = useState('my-secret-key-16b')
  const [iv, setIv] = useState('random-iv-16bytes')
  const [mode, setMode] = useState('CBC')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (enterPayload) setInput(enterPayload)
  }, [enterPayload])

  const crypt = (dir: 'encrypt' | 'decrypt') => {
    const r = runCodec(() =>
      dir === 'encrypt'
        ? window.services.crypt.aes.encrypt({ key, iv, mode, plaintext: input })
        : window.services.crypt.aes.decrypt({ key, iv, mode, ciphertext: input })
    )
    setError(showError(r))
    setOutput(showData(r))
  }

  return (
    <>
      <div className="ct-grid2">
        <Field
          label="密钥 Key"
          hint="16 / 24 / 32 字节"
          help="加密解密共用；UTF-8 字节长度决定 AES-128 / 192 / 256"
          value={key}
          onChange={setKey}
        />
        <Field
          label="模式 Mode"
          help="CBC 需相同 IV；GCM 含认证标签更安全"
          type="select"
          value={mode}
          onChange={setMode}
          options={[
            { value: 'CBC', label: 'CBC' },
            { value: 'GCM', label: 'GCM' }
          ]}
        />
        <Field
          label="IV"
          hint="16 字节"
          help="初始化向量；建议随机，需与密文一并保存"
          value={iv}
          onChange={setIv}
        />
        <Field
          label="输入（明文或密文 Base64）"
          help="加密传明文；解密传 Base64 密文"
          type="textarea"
          value={input}
          onChange={setInput}
        />
        <Field label="输出" help="加密得 Base64 密文；解密得明文" type="textarea" value={output} onChange={() => {}} readOnly />
      </div>
      <Actions
        items={[
          { label: '加密', variant: 'primary', onClick: () => crypt('encrypt') },
          { label: '解密', onClick: () => crypt('decrypt') }
        ]}
      />
      <div className="ct-actions">
        <CopyButton text={output} />
        <button
          type="button"
          className="ct-btn ct-btn-ghost"
          onClick={() => {
            setInput(output)
            setOutput('')
            setError('')
          }}
        >
          互换输入输出
        </button>
      </div>
      {error ? <div className="ct-field-error">{error}</div> : null}
    </>
  )
}
