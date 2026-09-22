import { useEffect, useState } from 'react'
import type { AlgorithmProps } from '../../registry/types'
import { Actions, CopyButton, Field } from '../../shared'
import { runCodec, showError, showData } from '../codec'

export default function UrlUI({ enterPayload }: AlgorithmProps) {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (enterPayload) setInput(enterPayload)
  }, [enterPayload])

  const run = (dir: 'encode' | 'decode') => {
    const r = runCodec(() =>
      dir === 'encode'
        ? window.services.crypt.url.encode(input)
        : window.services.crypt.url.decode(input)
    )
    setError(showError(r))
    setOutput(showData(r))
  }

  return (
    <>
      <div className="ct-grid2">
        <Field
          label="输入"
          help="待编码的原文，或待解码的 %XX 字符串"
          type="textarea"
          value={input}
          onChange={setInput}
        />
        <Field label="输出" help="结果文本" type="textarea" value={output} onChange={() => {}} readOnly />
      </div>
      <Actions
        items={[
          { label: '编码', variant: 'primary', onClick: () => run('encode') },
          { label: '解码', onClick: () => run('decode') }
        ]}
      />
      <div className="ct-actions">
        <CopyButton text={output} />
      </div>
      {error ? <div className="ct-field-error">{error}</div> : null}
    </>
  )
}
