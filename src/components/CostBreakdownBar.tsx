import { formatBRL } from '../lib/calc'

interface Segment {
  label: string
  value: number
  colorClass: string
}

interface CostBreakdownBarProps {
  segments: Segment[]
  total: number
}

export function CostBreakdownBar({ segments, total }: CostBreakdownBarProps) {
  const visible = segments.filter((s) => s.value > 0)
  if (total <= 0 || visible.length === 0) return null

  return (
    <div>
      <div className="flex h-4 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
        {visible.map((s) => (
          <div
            key={s.label}
            className={s.colorClass}
            style={{ width: `${(s.value / total) * 100}%` }}
            title={`${s.label}: ${formatBRL(s.value)}`}
          />
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
        {visible.map((s) => (
          <div key={s.label} className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300">
            <span className={`h-2.5 w-2.5 rounded-sm ${s.colorClass}`} />
            <span>
              {s.label} <span className="text-slate-400 dark:text-slate-500">({((s.value / total) * 100).toFixed(0)}%)</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
