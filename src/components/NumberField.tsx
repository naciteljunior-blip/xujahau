interface NumberFieldProps {
  label: string
  suffix?: string
  value: number
  onChange: (value: number) => void
  step?: number
  min?: number
  help?: string
}

export function NumberField({ label, suffix, value, onChange, step = 0.01, min = 0, help }: NumberFieldProps) {
  return (
    <label className="block">
      <span className="mb-1 flex items-baseline justify-between text-sm font-medium text-slate-700 dark:text-slate-200">
        {label}
        {suffix && <span className="text-xs font-normal text-slate-400 dark:text-slate-500">{suffix}</span>}
      </span>
      <input
        type="number"
        inputMode="decimal"
        step={step}
        min={min}
        value={Number.isFinite(value) ? value : 0}
        onChange={(e) => onChange(e.target.valueAsNumber || 0)}
        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
      />
      {help && <span className="mt-1 block text-xs text-slate-400 dark:text-slate-500">{help}</span>}
    </label>
  )
}
