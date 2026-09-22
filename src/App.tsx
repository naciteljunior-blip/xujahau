import { useEffect, useState } from 'react'
import { Calculator } from './components/Calculator'
import { History } from './components/History'
import { Filaments } from './components/Filaments'
import { useLocalStorage } from './hooks/useLocalStorage'
import type { Filamento, SavedPeca } from './types'
import type { CalcInputs } from './lib/calc'

type Tab = 'calculadora' | 'filamentos' | 'historico'

function useTheme() {
  const [dark, setDark] = useLocalStorage<boolean>(
    'tema-escuro',
    window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false,
  )

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  return [dark, setDark] as const
}

export default function App() {
  const [tab, setTab] = useState<Tab>('calculadora')
  const [pecas, setPecas] = useLocalStorage<SavedPeca[]>('pecas-3d', [])
  const [filamentos, setFilamentos] = useLocalStorage<Filamento[]>('filamentos-3d', [])
  const [dark, setDark] = useTheme()
  const [carregada, setCarregada] = useState<SavedPeca | null>(null)
  const [resetKey, setResetKey] = useState(0)

  function handleSave(nome: string, inputs: CalcInputs) {
    const peca: SavedPeca = {
      id: crypto.randomUUID(),
      nome,
      criadoEm: Date.now(),
      inputs,
    }
    setPecas((prev) => [...prev, peca])
  }

  function handleLoad(peca: SavedPeca) {
    setCarregada(peca)
    setResetKey((k) => k + 1)
    setTab('calculadora')
  }

  function handleDelete(id: string) {
    setPecas((prev) => prev.filter((p) => p.id !== id))
  }

  function handleAddFilamento(filamento: Omit<Filamento, 'id' | 'criadoEm'>) {
    setFilamentos((prev) => [...prev, { ...filamento, id: crypto.randomUUID(), criadoEm: Date.now() }])
  }

  function handleDeleteFilamento(id: string) {
    setFilamentos((prev) => prev.filter((f) => f.id !== id))
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2.5">
            <img src="/cube.svg" alt="" className="h-7 w-7" />
            <div>
              <h1 className="text-base font-bold leading-tight">Calculadora de Custo 3D</h1>
              <p className="text-xs text-slate-400 dark:text-slate-500">Precifique suas impressões com precisão</p>
            </div>
          </div>
          <button
            onClick={() => setDark((d) => !d)}
            aria-label="Alternar tema"
            className="rounded-full border border-slate-300 p-2 text-slate-500 transition hover:border-brand-500 hover:text-brand-600 dark:border-slate-700 dark:text-slate-400 dark:hover:border-brand-500 dark:hover:text-brand-400"
          >
            {dark ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8">
        <nav className="mb-6 flex w-fit gap-1 rounded-full border border-slate-200 bg-white p-1 dark:border-slate-800 dark:bg-slate-900">
          <TabButton active={tab === 'calculadora'} onClick={() => setTab('calculadora')}>
            Calculadora
          </TabButton>
          <TabButton active={tab === 'filamentos'} onClick={() => setTab('filamentos')}>
            Filamentos {filamentos.length > 0 && `(${filamentos.length})`}
          </TabButton>
          <TabButton active={tab === 'historico'} onClick={() => setTab('historico')}>
            Peças salvas {pecas.length > 0 && `(${pecas.length})`}
          </TabButton>
        </nav>

        {tab === 'calculadora' && (
          <Calculator
            key={resetKey}
            onSave={handleSave}
            initial={carregada?.inputs}
            loadedFrom={carregada}
            filamentos={filamentos}
          />
        )}
        {tab === 'filamentos' && (
          <Filaments filamentos={filamentos} onAdd={handleAddFilamento} onDelete={handleDeleteFilamento} />
        )}
        {tab === 'historico' && <History pecas={pecas} onLoad={handleLoad} onDelete={handleDelete} />}
      </main>

      <footer className="mx-auto max-w-5xl px-4 pb-8 text-center text-xs text-slate-400 dark:text-slate-600">
        Preço sugerido = Custo (filamento + energia + extras) + Lucro + Mão de obra
      </footer>
    </div>
  )
}

function TabButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
        active
          ? 'bg-brand-600 text-white shadow-sm'
          : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100'
      }`}
    >
      {children}
    </button>
  )
}
