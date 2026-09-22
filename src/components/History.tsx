import { calcular, formatBRL } from '../lib/calc'
import type { SavedPeca } from '../types'

interface HistoryProps {
  pecas: SavedPeca[]
  onLoad: (peca: SavedPeca) => void
  onDelete: (id: string) => void
}

export function History({ pecas, onLoad, onDelete }: HistoryProps) {
  if (pecas.length === 0) {
    return (
      <section className="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-400 dark:border-slate-700 dark:text-slate-500">
        Nenhuma peça salva ainda. Calcule um custo e clique em "Salvar" para guardar aqui.
      </section>
    )
  }

  return (
    <section className="space-y-3">
      {pecas
        .slice()
        .sort((a, b) => b.criadoEm - a.criadoEm)
        .map((peca) => {
          const result = calcular(peca.inputs)
          return (
            <div
              key={peca.id}
              className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60"
            >
              <div className="min-w-0">
                <p className="truncate font-medium text-slate-800 dark:text-slate-100">{peca.nome}</p>
                <p className="text-xs text-slate-400 dark:text-slate-500">
                  {new Date(peca.criadoEm).toLocaleString('pt-BR')} · {peca.inputs.materialUsadoG}g ·{' '}
                  {peca.inputs.duracaoHoras}h
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <span className="font-semibold text-brand-700 dark:text-brand-400">
                  {formatBRL(result.precoSugeridoUnitario)}
                </span>
                <button
                  onClick={() => onLoad(peca)}
                  className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:border-brand-500 hover:text-brand-700 dark:border-slate-700 dark:text-slate-300 dark:hover:border-brand-500 dark:hover:text-brand-400"
                >
                  Carregar
                </button>
                <button
                  onClick={() => onDelete(peca.id)}
                  className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:border-rose-400 hover:text-rose-600 dark:border-slate-700 dark:text-slate-300 dark:hover:border-rose-400 dark:hover:text-rose-400"
                >
                  Excluir
                </button>
              </div>
            </div>
          )
        })}
    </section>
  )
}
