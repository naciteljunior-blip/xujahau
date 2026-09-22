import { useMemo, useState } from 'react'
import { calcular, formatBRL, DEFAULT_INPUTS, type CalcInputs } from '../lib/calc'
import { NumberField } from './NumberField'
import { CostBreakdownBar } from './CostBreakdownBar'
import type { Filamento, SavedPeca } from '../types'

interface CalculatorProps {
  onSave: (nome: string, inputs: CalcInputs) => void
  initial?: CalcInputs
  loadedFrom?: SavedPeca | null
  filamentos: Filamento[]
}

export function Calculator({ onSave, initial, loadedFrom, filamentos }: CalculatorProps) {
  const [inputs, setInputs] = useState<CalcInputs>(initial ?? DEFAULT_INPUTS)
  const [nome, setNome] = useState(loadedFrom?.nome ?? '')
  const [filamentoId, setFilamentoId] = useState('')

  const result = useMemo(() => calcular(inputs), [inputs])

  function set<K extends keyof CalcInputs>(key: K, value: number) {
    setInputs((prev) => ({ ...prev, [key]: value }))
  }

  function handleSelectFilamento(id: string) {
    setFilamentoId(id)
    const filamento = filamentos.find((f) => f.id === id)
    if (filamento) set('precoFilamentoKg', filamento.precoKg)
  }

  function handleSave() {
    const nomeFinal = nome.trim() || `Peça ${new Date().toLocaleDateString('pt-BR')}`
    onSave(nomeFinal, inputs)
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
      {/* Coluna de entradas */}
      <div className="space-y-6 lg:col-span-3">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-brand-700 dark:text-brand-400">
            Despesas da impressão
          </h2>
          {filamentos.length > 0 && (
            <label className="mb-4 block">
              <span className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">
                Filamento salvo
              </span>
              <select
                value={filamentoId}
                onChange={(e) => handleSelectFilamento(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              >
                <option value="">Preço manual</option>
                {filamentos.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.marca} {f.modelo && `· ${f.modelo}`} {f.cor && `(${f.cor})`} — {formatBRL(f.precoKg)}/kg
                  </option>
                ))}
              </select>
            </label>
          )}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <NumberField
              label="Preço do filamento"
              suffix="R$ / kg"
              value={inputs.precoFilamentoKg}
              onChange={(v) => {
                setFilamentoId('')
                set('precoFilamentoKg', v)
              }}
            />
            <NumberField
              label="Material utilizado"
              suffix="gramas"
              step={1}
              value={inputs.materialUsadoG}
              onChange={(v) => set('materialUsadoG', v)}
            />
            <NumberField
              label="Duração da impressão"
              suffix="horas"
              value={inputs.duracaoHoras}
              onChange={(v) => set('duracaoHoras', v)}
            />
            <NumberField
              label="Tarifa de energia"
              suffix="R$ / kWh"
              value={inputs.tarifaEnergiaKwh}
              onChange={(v) => set('tarifaEnergiaKwh', v)}
            />
            <NumberField
              label="Consumo da impressora"
              suffix="watts"
              step={1}
              value={inputs.potenciaImpressoraW}
              onChange={(v) => set('potenciaImpressoraW', v)}
            />
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-brand-700 dark:text-brand-400">
            Custos adicionais (opcional)
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <NumberField
              label="Custo da impressora"
              suffix="R$ / hora"
              value={inputs.desgasteImpressora}
              onChange={(v) => set('desgasteImpressora', v)}
              help="Desgaste e manutenção — padrão R$2,00/hora de impressão"
            />
            <NumberField
              label="Falhas / desperdício"
              suffix="%"
              step={1}
              value={inputs.falhaPercent}
              onChange={(v) => set('falhaPercent', v)}
              help="Percentual estimado de reimpressões"
            />
            <NumberField
              label="Embalagem / acabamento"
              suffix="R$"
              value={inputs.embalagem}
              onChange={(v) => set('embalagem', v)}
            />
            <NumberField
              label="Quantidade de peças"
              suffix="unidades"
              step={1}
              min={1}
              value={inputs.quantidade}
              onChange={(v) => set('quantidade', Math.max(1, Math.round(v)))}
            />
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-brand-700 dark:text-brand-400">
            Lucro e mão de obra
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 flex items-baseline justify-between text-sm font-medium text-slate-700 dark:text-slate-200">
                <span>Margem de lucro</span>
                <span className="text-brand-700 dark:text-brand-400">{Math.round(inputs.percentLucro * 100)}%</span>
              </label>
              <input
                type="range"
                min={0}
                max={2}
                step={0.01}
                value={inputs.percentLucro}
                onChange={(e) => set('percentLucro', e.target.valueAsNumber)}
                className="w-full accent-brand-600"
              />
            </div>
            <NumberField
              label="Mão de obra"
              suffix="R$"
              value={inputs.maoDeObra}
              onChange={(v) => set('maoDeObra', v)}
            />
          </div>
        </section>
      </div>

      {/* Coluna de resultado */}
      <div className="lg:col-span-2">
        <div className="sticky top-6 space-y-4">
          <section className="rounded-2xl bg-gradient-to-br from-brand-600 to-brand-700 p-6 text-white shadow-lg">
            <p className="text-sm font-medium text-brand-100">Preço sugerido por peça</p>
            <p className="mt-1 text-4xl font-bold tracking-tight">{formatBRL(result.precoSugeridoUnitario)}</p>
            {inputs.quantidade > 1 && (
              <p className="mt-2 text-sm text-brand-100">
                {inputs.quantidade}x peças ={' '}
                <span className="font-semibold text-white">{formatBRL(result.precoSugeridoTotal)}</span>
              </p>
            )}
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Composição do preço
            </h3>
            <CostBreakdownBar
              total={result.precoSugeridoUnitario}
              segments={[
                { label: 'Filamento', value: result.custoFilamento, colorClass: 'bg-brand-500' },
                { label: 'Energia', value: result.custoEnergia, colorClass: 'bg-amber-400' },
                { label: 'Impressora', value: result.custoDesgaste, colorClass: 'bg-orange-400' },
                { label: 'Embalagem', value: result.custoEmbalagem, colorClass: 'bg-cyan-400' },
                { label: 'Falhas', value: result.custoFalha, colorClass: 'bg-rose-400' },
                { label: 'Lucro', value: result.valorLucro, colorClass: 'bg-violet-500' },
                { label: 'Mão de obra', value: inputs.maoDeObra, colorClass: 'bg-slate-400' },
              ]}
            />

            <dl className="mt-4 divide-y divide-slate-100 text-sm dark:divide-slate-800">
              <Row label="Custo do filamento" value={result.custoFilamento} />
              <Row label="Custo de energia" value={result.custoEnergia} />
              {result.custoDesgaste > 0 && <Row label="Custo da impressora" value={result.custoDesgaste} />}
              {result.custoEmbalagem > 0 && <Row label="Embalagem" value={result.custoEmbalagem} />}
              {result.custoFalha > 0 && <Row label="Falhas / desperdício" value={result.custoFalha} />}
              <Row label="Custo total" value={result.custoTotal} bold />
              <Row label={`Lucro (${Math.round(inputs.percentLucro * 100)}%)`} value={result.valorLucro} />
              <Row label="Custo + lucro" value={result.custoMaisLucro} />
              <Row label="Mão de obra" value={inputs.maoDeObra} />
              <Row label="Preço sugerido" value={result.precoSugeridoUnitario} bold accent />
            </dl>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Salvar peça
            </h3>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Nome da peça (ex: Vaso decorativo)"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              />
              <button
                onClick={handleSave}
                className="shrink-0 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 active:bg-brand-800"
              >
                Salvar
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

function Row({ label, value, bold, accent }: { label: string; value: number; bold?: boolean; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className={`${bold ? 'font-semibold text-slate-800 dark:text-slate-100' : 'text-slate-500 dark:text-slate-400'}`}>
        {label}
      </span>
      <span
        className={`tabular-nums ${
          accent
            ? 'text-base font-bold text-brand-700 dark:text-brand-400'
            : bold
              ? 'font-semibold text-slate-800 dark:text-slate-100'
              : 'text-slate-700 dark:text-slate-300'
        }`}
      >
        {formatBRL(value)}
      </span>
    </div>
  )
}
