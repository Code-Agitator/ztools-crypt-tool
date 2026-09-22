import { useEffect, useState } from 'react'
import type { AlgorithmProps } from '../../registry/types'
import { Actions, CopyButton, Field } from '../../shared'
import { runCodec, showError, showData } from '../codec'

export default function Sha256UI({ enterPayload }: AlgorithmProps) {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (enterPayload) setInput(enterPayload)
  }, [enterPayload])

  const run = () => {
    const r = runCodec(() => window.services.crypt.sha256.digest(input))
    setError(showError(r))
    setOutput(showData(r))
  }

  return (
    <>
      <div className="ct-grid2">
        <Field label="明文" help="参与摘要的 UTF-8 文本" type="textarea" value={input} onChange={setInput} />
        <Field label="摘要 Hex" help="64 位十六进制，不可逆" type="textarea" value={output} onChange={() => {}} readOnly />
      </div>
      <Actions items={[{ label: '计算', variant: 'primary', onClick: run }]} />
      <div className="ct-actions">
        <CopyButton text={output} />
      </div>
      {error ? <div className="ct-field-error">{error}</div> : null}
    </>
  )
}
