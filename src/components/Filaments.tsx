import { useState } from 'react'
import { formatBRL } from '../lib/calc'
import type { Filamento } from '../types'

interface FilamentsProps {
  filamentos: Filamento[]
  onAdd: (filamento: Omit<Filamento, 'id' | 'criadoEm'>) => void
  onDelete: (id: string) => void
}

export function Filaments({ filamentos, onAdd, onDelete }: FilamentsProps) {
  const [marca, setMarca] = useState('')
  const [modelo, setModelo] = useState('')
  const [cor, setCor] = useState('')
  const [precoKg, setPrecoKg] = useState<number>(0)

  function handleAdd() {
    if (!marca.trim() || precoKg <= 0) return
    onAdd({ marca: marca.trim(), modelo: modelo.trim(), cor: cor.trim() || undefined, precoKg })
    setMarca('')
    setModelo('')
    setCor('')
    setPrecoKg(0)
  }

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-brand-700 dark:text-brand-400">
          Cadastrar filamento
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <TextField label="Marca" placeholder="Ex: 3D Fila" value={marca} onChange={setMarca} />
          <TextField label="Modelo" placeholder="Ex: PLA Premium" value={modelo} onChange={setModelo} />
          <TextField label="Cor (opcional)" placeholder="Ex: Preto" value={cor} onChange={setCor} />
          <label className="block">
            <span className="mb-1 flex items-baseline justify-between text-sm font-medium text-slate-700 dark:text-slate-200">
              Preço por kg
              <span className="text-xs font-normal text-slate-400 dark:text-slate-500">R$</span>
            </span>
            <input
              type="number"
              inputMode="decimal"
              step={0.01}
              min={0}
              value={precoKg || ''}
              onChange={(e) => setPrecoKg(e.target.valueAsNumber || 0)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            />
          </label>
        </div>
        <button
          onClick={handleAdd}
          disabled={!marca.trim() || precoKg <= 0}
          className="mt-4 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 active:bg-brand-800 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Adicionar filamento
        </button>
      </section>

      {filamentos.length === 0 ? (
        <section className="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-400 dark:border-slate-700 dark:text-slate-500">
          Nenhum filamento cadastrado ainda. Cadastre marcas e modelos com seus respectivos preços para usá-los
          direto na calculadora.
        </section>
      ) : (
        <section className="space-y-3">
          {filamentos
            .slice()
            .sort((a, b) => a.marca.localeCompare(b.marca))
            .map((f) => (
              <div
                key={f.id}
                className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium text-slate-800 dark:text-slate-100">
                    {f.marca} {f.modelo && `· ${f.modelo}`}
                  </p>
                  {f.cor && <p className="text-xs text-slate-400 dark:text-slate-500">Cor: {f.cor}</p>}
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <span className="font-semibold text-brand-700 dark:text-brand-400">{formatBRL(f.precoKg)}/kg</span>
                  <button
                    onClick={() => onDelete(f.id)}
                    className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:border-rose-400 hover:text-rose-600 dark:border-slate-700 dark:text-slate-300 dark:hover:border-rose-400 dark:hover:text-rose-400"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
        </section>
      )}
    </div>
  )
}

function TextField({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string
  placeholder?: string
  value: string
  onChange: (value: string) => void
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">{label}</span>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
      />
    </label>
  )
}
