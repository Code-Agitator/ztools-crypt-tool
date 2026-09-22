import type { AlgorithmModule } from '../registry/types'
import { CATEGORIES, categoryLabel, getByCategory } from '../registry'
import { Actions } from '../shared'
import { defaultSettings, type Settings } from '../config'

interface Props {
  modules: AlgorithmModule[]
  settings: Settings
  onChange: (s: Settings) => void
}

export default function SettingsPage({ modules, settings, onChange }: Props) {
  const toggle = (id: string, on: boolean) => {
    onChange({ ...settings, enabled: { ...settings.enabled, [id]: on } })
  }

  return (
    <div className="ct-main">
      <div className="ct-main-head">
        <h4>设置</h4>
        <span className="ct-cat">算法启停</span>
      </div>
      {CATEGORIES.map((cat) => {
        const items = getByCategory(modules, cat.id)
        if (!items.length) return null
        return (
          <div key={cat.id} className="ct-settings-group">
            <div className="ct-side-title" style={{ margin: '8px 0 4px' }}>{categoryLabel(cat.id)}</div>
            {items.map((m) => (
              <div key={m.meta.id} className="ct-toggle">
                <span>{m.meta.title}</span>
                <input
                  type="checkbox"
                  checked={settings.enabled[m.meta.id] ?? m.meta.defaultEnabled}
                  onChange={(e) => toggle(m.meta.id, e.target.checked)}
                />
              </div>
            ))}
          </div>
        )
      })}
      <Actions
        items={[
          {
            label: '恢复默认',
            variant: 'ghost',
            onClick: () => onChange(defaultSettings(modules))
          },
          {
            label: '返回算法',
            variant: 'primary',
            onClick: () => {
              /* parent handles navigation via settings close */
            }
          }
        ]}
      />
      <p style={{ fontSize: 12, opacity: 0.55, margin: 0 }}>
        修改后自动保存（dbStorage），直达指令将同步增删。
      </p>
    </div>
  )
}
