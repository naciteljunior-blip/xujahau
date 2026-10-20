import { useEffect, useRef, useState } from 'react'
import { BotaoWhatsApp, IconeCarrinho, SeletorQuantidade } from './componentes'
import type { Produto, Variacao } from './config'
import { base, comVariacao, formatarPreco, linkWhatsApp, mensagemProduto, percentualDesconto, QTD_MAXIMA, temPrecosDiferentes } from './util'

export type PropsCarrinho = { noCarrinho: number; onAdicionar: (v: Variacao | undefined, quantidade: number) => void; onVerCarrinho: () => void }

function BotaoAdicionar({
  produto,
  noCarrinho,
  onAdicionar,
  onVerCarrinho,
  className = '',
}: {
  produto: Produto
  noCarrinho: number
  onAdicionar: () => boolean | void
  onVerCarrinho: () => void
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
        <button type="button" onClick={onVerCarrinho} className="font-semibold text-vinho underline underline-offset-4 hover:text-vinho-escuro">
          {noCarrinho} no carrinho · Ver carrinho
        </button>
      )}
    </p>
  )

  return (
    <div className={className}>
      <button
        type="button"
        onClick={() => {
          if (onAdicionar() === false) return
          setAdicionado((n) => n + 1)
        }}
        disabled={noCarrinho >= QTD_MAXIMA}
        className={`inline-flex min-h-14 w-full items-center justify-center gap-2.5 rounded-full px-5 text-lg font-semibold text-pessego transition focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-magenta disabled:opacity-50 ${
          adicionado ? 'bg-magenta' : 'bg-vinho hover:bg-vinho-escuro'
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

function FotoProduto({ produto: p, foto }: { produto: Produto; foto?: string }) {
  const arquivo = foto ?? p.fotos?.[0]
  return (
    <div className="flex aspect-[4/3] items-center justify-center overflow-hidden bg-pessego">
      {arquivo ? (
        <img src={`${base}produtos/${arquivo}`} alt={p.nome} loading="lazy" className="h-full w-full bg-creme object-contain" />
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
    <span className={`rounded-full bg-magenta px-3 py-1 text-base font-extrabold text-pessego ${className}`}>
      {pct}% OFF
    </span>
  )
}

function Preco({ produto: p, className = '' }: { produto: Produto; className?: string }) {
  if (!p.preco) return <p className={`text-2xl font-extrabold text-chocolate/70 ${className}`}>Sob consulta</p>
  const pct = percentualDesconto(p)
  return (
    <div className={className}>
      {pct > 0 && (
        <p className="text-lg text-chocolate/70">
          <span className="sr-only">De </span>
          <s>{formatarPreco(p.precoOriginal!)}</s>
          <span className="sr-only"> por</span>
        </p>
      )}
      <p className="text-3xl font-extrabold text-magenta">
        {temPrecosDiferentes(p) && <span className="block text-base font-semibold text-chocolate/75">A partir de</span>}
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
  const [quantidade, setQuantidade] = useState(1)
  const maximo = Math.max(1, QTD_MAXIMA - noCarrinho)
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
    onAdicionar(escolhida ?? undefined, Math.min(quantidade, maximo))
    setQuantidade(1)
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
      className="m-auto w-[calc(100%-2rem)] max-w-3xl rounded-3xl bg-creme p-0 text-lg text-chocolate shadow-2xl backdrop:bg-chocolate/60"
    >
      <div className="sticky top-0 z-10 flex justify-end bg-creme/90 p-3 backdrop-blur">
        <button
          type="button"
          onClick={fechar}
          className="min-h-12 rounded-full bg-pessego px-5 font-semibold text-chocolate/85 hover:bg-pessego-escuro focus-visible:outline focus-visible:outline-4 focus-visible:outline-magenta"
        >
          ✕ Fechar
        </button>
      </div>
      <div className="grid gap-6 px-6 pb-8 md:grid-cols-2">
        <div>
          <div className="relative overflow-hidden rounded-2xl ring-1 ring-chocolate/10">
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
                  className={`h-16 w-16 overflow-hidden rounded-xl bg-creme ring-2 ${i === fotoAtual ? 'ring-vinho' : 'ring-chocolate/10'}`}
                >
                  <img src={`${base}produtos/${f}`} alt="" className="h-full w-full object-contain" />
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <p className="inline-block self-start rounded-full bg-salvia px-3 py-0.5 text-sm font-semibold lowercase text-chocolate">{p.categoria}</p>
          <h3 className="mt-2 text-3xl font-extrabold leading-[1.02] tracking-[-0.03em] text-chocolate">{p.nome}</h3>
          <Preco produto={exibido} className="mt-4" />
          {p.variacoes && (
            <fieldset className="mt-5">
              <legend className="text-lg font-extrabold text-chocolate">{p.rotuloVariacao ?? 'Escolha uma opção'}</legend>
              <div role="radiogroup" className="mt-2 grid gap-2" aria-invalid={faltaEscolher || undefined}>
                {p.variacoes.map((v, i) => (
                  <label
                    key={v.nome}
                    className={`flex min-h-16 cursor-pointer items-center gap-3 rounded-2xl p-2 pr-4 ring-2 transition has-[:focus-visible]:outline has-[:focus-visible]:outline-4 has-[:focus-visible]:outline-magenta ${
                      escolhida?.nome === v.nome
                        ? 'bg-salvia/15 ring-vinho'
                        : faltaEscolher
                          ? 'ring-red-400'
                          : 'ring-chocolate/10 hover:ring-chocolate/30'
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
                    {v.foto && <img src={`${base}produtos/${v.foto}`} alt="" className="h-14 w-14 shrink-0 rounded-xl bg-creme object-cover" />}
                    <span className="min-w-0 flex-1">
                      <span className="block font-bold text-chocolate">{v.nome}</span>
                      {v.dica && <span className="block text-base text-chocolate/75">{v.dica}</span>}
                    </span>
                    <span className="font-extrabold text-chocolate">{formatarPreco(v.preco)}</span>
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
          {exibido.preco && (
            <div role="group" aria-labelledby={`qtd-${p.id}`} className="mt-5 flex items-center gap-4">
              <span id={`qtd-${p.id}`} className="text-lg font-extrabold text-chocolate">
                Quantidade
              </span>
              <SeletorQuantidade
                quantidade={Math.min(quantidade, maximo)}
                nome={p.nome}
                onAlterar={(delta) => setQuantidade((q) => Math.min(Math.max(q + delta, 1), maximo))}
                maximo={maximo}
                className="w-40"
              />
            </div>
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
          <div className="space-y-4 text-chocolate/85 md:col-span-2">
            <h4 className="text-xl font-extrabold tracking-[-0.02em] text-chocolate">descrição.</h4>
            {p.detalhes.split(/\n\s*\n/).map((par, i) => (
              <p key={i} className="whitespace-pre-line">{par}</p>
            ))}
          </div>
        )}
        {p.caracteristicas && p.caracteristicas.length > 0 && (
          <div className="md:col-span-2">
            <h4 className="text-xl font-extrabold tracking-[-0.02em] text-chocolate">características.</h4>
            <dl className="mt-3 overflow-hidden rounded-2xl ring-1 ring-chocolate/10">
              {p.caracteristicas.map(([k, v], i) => (
                <div key={k} className={`grid grid-cols-2 gap-4 px-5 py-3 ${i % 2 === 0 ? 'bg-pessego/50' : 'bg-creme'}`}>
                  <dt className="font-semibold text-chocolate/75">{k}</dt>
                  <dd className="text-chocolate">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </div>
    </dialog>
  )
}
