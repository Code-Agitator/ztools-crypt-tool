import type { AlgorithmModule } from '../registry/types'
import { categoryLabel } from '../registry'
import { TeachCard } from '../shared'

interface Props {
  module: AlgorithmModule
  enterPayload?: string
}

export default function AlgorithmHost({ module, enterPayload }: Props) {
  const { Component, meta } = module
  return (
    <div className="ct-main">
      <div className="ct-main-head">
        <h4>{meta.title}</h4>
        <span className="ct-cat">{categoryLabel(meta.category)}</span>
      </div>
      <TeachCard summary={meta.teach.summary} />
      <Component enterPayload={enterPayload} />
    </div>
  )
}
