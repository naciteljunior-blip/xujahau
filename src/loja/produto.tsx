import { useEffect, useRef, useState } from 'react'
import { BotaoWhatsApp, IconeCarrinho } from './componentes'
import type { Produto, Variacao } from './config'
import { base, comVariacao, formatarPreco, linkWhatsApp, mensagemProduto, percentualDesconto, QTD_MAXIMA, temPrecosDiferentes } from './util'

export type PropsCarrinho = { noCarrinho: number; onAdicionar: (v?: Variacao) => void; onVerCarrinho: () => void }

export function BotaoAdicionar({
  produto,
  noCarrinho,
  onAdicionar,
  onVerCarrinho,
  onEscolher,
  className = '',
}: {
  produto: Produto
  noCarrinho: number
  onAdicionar: () => boolean | void
  onVerCarrinho: () => void
  onEscolher?: () => void
  className?: string
}) {
  const [adicionado, setAdicionado] = useState(0)

  useEffect(() => {
    if (!adicionado) return
    const t = setTimeout(() => setAdicionado(0), 1500)
    return () => clearTimeout(t)
  }, [adicionado])

  if (!produto.preco) {
    return (
      <BotaoWhatsApp href={linkWhatsApp(mensagemProduto(produto))} className={`w-full ${className}`}>
        Pedir orçamento
      </BotaoWhatsApp>
    )
  }

  const linkCarrinho = (
    <p className="mt-2 min-h-7 text-center text-base" aria-live="polite">
      {noCarrinho > 0 && (
        <button type="button" onClick={onVerCarrinho} className="font-semibold text-brand-700 underline underline-offset-4 hover:text-brand-900">
          {noCarrinho} no carrinho · Ver carrinho
        </button>
      )}
    </p>
  )

  if (produto.variacoes && onEscolher) {
    return (
      <div className={className}>
        <button
          type="button"
          onClick={onEscolher}
          className="inline-flex min-h-14 w-full items-center justify-center gap-2.5 rounded-2xl bg-slate-900 px-5 text-lg font-bold text-white shadow-md transition hover:bg-slate-700 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-slate-400"
        >
          Escolher opção ({produto.variacoes.length})
        </button>
        {linkCarrinho}
      </div>
    )
  }

  return (
    <div className={className}>
      <button
        type="button"
        onClick={() => {
          if (onAdicionar() === false) return
          setAdicionado((n) => n + 1)
        }}
        disabled={noCarrinho >= QTD_MAXIMA}
        className={`inline-flex min-h-14 w-full items-center justify-center gap-2.5 rounded-2xl px-5 text-lg font-bold text-white shadow-md transition focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-slate-400 disabled:opacity-50 ${
          adicionado ? 'bg-brand-600' : 'bg-slate-900 hover:bg-slate-700'
        }`}
      >
        {adicionado ? (
          '✓ Adicionado!'
        ) : (
          <>
            <IconeCarrinho className="h-6 w-6 shrink-0" />
            Adicionar ao carrinho
          </>
        )}
      </button>
      {linkCarrinho}
    </div>
  )
}

export function FotoProduto({ produto: p, foto }: { produto: Produto; foto?: string }) {
  const arquivo = foto ?? p.fotos?.[0]
  return (
    <div className="flex aspect-[4/3] items-center justify-center overflow-hidden bg-gradient-to-br from-brand-100 via-white to-amber-100">
      {arquivo ? (
        <img src={`${base}produtos/${arquivo}`} alt={p.nome} loading="lazy" className="h-full w-full bg-white object-contain" />
      ) : (
        <span className="text-8xl drop-shadow-sm" role="img" aria-label={p.nome}>
          {p.emoji ?? '📦'}
        </span>
      )}
    </div>
  )
}

export function SeloDesconto({ produto, className = '' }: { produto: Produto; className?: string }) {
  const pct = percentualDesconto(produto)
  if (!pct) return null
  return (
    <span className={`rounded-full bg-brand-600 px-3 py-1 text-base font-extrabold text-white shadow ${className}`}>
      {pct}% OFF
    </span>
  )
}

export function Preco({ produto: p, className = '' }: { produto: Produto; className?: string }) {
  if (!p.preco) return <p className={`text-2xl font-extrabold text-slate-500 ${className}`}>Sob consulta</p>
  const pct = percentualDesconto(p)
  return (
    <div className={className}>
      {pct > 0 && (
        <p className="text-lg text-slate-500">
          <span className="sr-only">De </span>
          <s>{formatarPreco(p.precoOriginal!)}</s>
          <span className="sr-only"> por</span>
        </p>
      )}
      <p className="text-3xl font-extrabold text-slate-900">
        {temPrecosDiferentes(p) && <span className="block text-base font-semibold text-slate-600">A partir de</span>}
        {formatarPreco(p.preco)}
      </p>
    </div>
  )
}

export function DetalhesProduto({
  produto: p,
  onVerCarrinho,
  onFechar,
  onAdicionar,
  noCarrinho,
}: { produto: Produto; onFechar: () => void } & PropsCarrinho) {
  const [fotoAtual, setFotoAtual] = useState(0)
  const [escolhida, setEscolhida] = useState<Variacao | null>(null)
  const [faltaEscolher, setFaltaEscolher] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const fotos = p.fotos ?? []
  const fechar = () => dialogRef.current?.close()
  const exibido = comVariacao(p, escolhida)

  const escolher = (v: Variacao) => {
    setEscolhida(v)
    setFaltaEscolher(false)
    const i = v.foto ? fotos.indexOf(v.foto) : -1
    if (i >= 0) setFotoAtual(i)
  }

  const adicionar = () => {
    if (p.variacoes && !escolhida) {
      setFaltaEscolher(true)
      document.getElementById(`opcao-${p.id}-0`)?.focus()
      return false
    }
    onAdicionar(escolhida ?? undefined)
  }

  useEffect(() => {
    if (!dialogRef.current?.open) dialogRef.current?.showModal()
  }, [])

  return (
    <dialog
      ref={dialogRef}
      aria-label={p.nome}
      onClose={onFechar}
      onClick={(e) => e.target === e.currentTarget && fechar()}
      className="m-auto w-[calc(100%-2rem)] max-w-3xl rounded-3xl bg-white p-0 text-lg text-slate-800 shadow-2xl backdrop:bg-slate-900/60"
    >
      <div className="sticky top-0 z-10 flex justify-end bg-white/90 p-3 backdrop-blur">
        <button
          type="button"
          onClick={fechar}
          className="min-h-12 rounded-2xl bg-stone-100 px-5 font-bold text-slate-700 hover:bg-stone-200 focus-visible:outline focus-visible:outline-4 focus-visible:outline-slate-400"
        >
          ✕ Fechar
        </button>
      </div>
      <div className="grid gap-6 px-6 pb-8 md:grid-cols-2">
        <div>
          <div className="relative overflow-hidden rounded-2xl ring-1 ring-stone-200">
            <FotoProduto produto={p} foto={fotos[fotoAtual]} />
            <SeloDesconto produto={exibido} className="absolute right-3 top-3" />
          </div>
          {fotos.length > 1 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {fotos.map((f, i) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFotoAtual(i)}
                  aria-label={`Foto ${i + 1}`}
                  aria-pressed={i === fotoAtual}
                  className={`h-16 w-16 overflow-hidden rounded-xl bg-white ring-2 ${i === fotoAtual ? 'ring-brand-600' : 'ring-stone-200'}`}
                >
                  <img src={`${base}produtos/${f}`} alt="" className="h-full w-full object-contain" />
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <p className="text-sm font-bold uppercase tracking-wide text-brand-700">{p.categoria}</p>
          <h3 className="mt-1 text-2xl font-extrabold leading-snug text-slate-900">{p.nome}</h3>
          <Preco produto={exibido} className="mt-4" />
          {p.variacoes && (
            <fieldset className="mt-5">
              <legend className="text-lg font-extrabold text-slate-900">{p.rotuloVariacao ?? 'Escolha uma opção'}</legend>
              <div role="radiogroup" className="mt-2 grid gap-2" aria-invalid={faltaEscolher || undefined}>
                {p.variacoes.map((v, i) => (
                  <label
                    key={v.nome}
                    className={`flex min-h-16 cursor-pointer items-center gap-3 rounded-2xl p-2 pr-4 ring-2 transition has-[:focus-visible]:outline has-[:focus-visible]:outline-4 has-[:focus-visible]:outline-slate-400 ${
                      escolhida?.nome === v.nome
                        ? 'bg-brand-50 ring-brand-600'
                        : faltaEscolher
                          ? 'ring-red-400'
                          : 'ring-stone-200 hover:ring-stone-400'
                    }`}
                  >
                    <input
                      id={`opcao-${p.id}-${i}`}
                      type="radio"
                      name={`opcao-${p.id}`}
                      checked={escolhida?.nome === v.nome}
                      onChange={() => escolher(v)}
                      className="sr-only"
                    />
                    {v.foto && <img src={`${base}produtos/${v.foto}`} alt="" className="h-14 w-14 shrink-0 rounded-xl bg-white object-cover" />}
                    <span className="min-w-0 flex-1">
                      <span className="block font-bold text-slate-900">{v.nome}</span>
                      {v.dica && <span className="block text-base text-slate-600">{v.dica}</span>}
                    </span>
                    <span className="font-extrabold text-slate-900">{formatarPreco(v.preco)}</span>
                  </label>
                ))}
              </div>
              {faltaEscolher && (
                <p className="mt-2 text-base font-semibold text-red-700" role="alert">
                  Escolha uma opção antes de adicionar.
                </p>
              )}
            </fieldset>
          )}
          <BotaoAdicionar
            produto={exibido}
            noCarrinho={noCarrinho}
            onAdicionar={adicionar}
            onVerCarrinho={() => {
              fechar()
              onVerCarrinho()
            }}
            className="mt-5"
          />
        </div>
        {p.detalhes && (
          <div className="space-y-4 text-slate-700 md:col-span-2">
            <h4 className="text-xl font-bold text-slate-900">Descrição</h4>
            {p.detalhes.split(/\n\s*\n/).map((par, i) => (
              <p key={i} className="whitespace-pre-line">{par}</p>
            ))}
          </div>
        )}
        {p.caracteristicas && p.caracteristicas.length > 0 && (
          <div className="md:col-span-2">
            <h4 className="text-xl font-bold text-slate-900">Características</h4>
            <dl className="mt-3 overflow-hidden rounded-2xl ring-1 ring-stone-200">
              {p.caracteristicas.map(([k, v], i) => (
                <div key={k} className={`grid grid-cols-2 gap-4 px-5 py-3 ${i % 2 === 0 ? 'bg-stone-50' : 'bg-white'}`}>
                  <dt className="font-semibold text-slate-600">{k}</dt>
                  <dd className="text-slate-900">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </div>
    </dialog>
  )
}
