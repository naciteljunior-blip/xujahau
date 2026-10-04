import { useEffect, useMemo, useRef, useState } from 'react'
import Carrinho from './Carrinho'
import { BarraCarrinho, IconeCarrinho, IconeWhatsApp } from './componentes'
import { iconesCategorias, loja, produtos, type Produto } from './config'
import { DetalhesProduto, SeloDesconto } from './produto'
import { useCarrinho } from './useCarrinho'
import { base, chaveCarrinho, duvidas, formatarPreco, linkWhatsApp, mensagemGeral, percentualDesconto, temPrecosDiferentes } from './util'

type Ordem = 'relevancia' | 'menor-preco' | 'maior-preco' | 'desconto'

const normalizar = (texto: string) => texto.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase()

const msgEmpresa = `Olá! Vim pelo site da ${loja.nome} e gostaria de um orçamento para a minha empresa.

Empresa:
Produto desejado:
Quantidade:
Prazo:`

const telefoneFormatado = loja.whatsapp.replace(/^55(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3')

export default function Loja() {
  const carrinho = useCarrinho()
  const [detalhe, setDetalhe] = useState<Produto | null>(null)
  const [categoria, setCategoria] = useState('Todos')
  const [busca, setBusca] = useState('')
  const [ordem, setOrdem] = useState<Ordem>('relevancia')
  const gradeRef = useRef<HTMLElement>(null)

  const categorias = useMemo(() => ['Todos', ...new Set(produtos.map((p) => p.categoria))], [])
  const ofertas = useMemo(
    () => [...produtos].filter((p) => percentualDesconto(p) > 0).sort((a, b) => percentualDesconto(b) - percentualDesconto(a)).slice(0, 12),
    [],
  )

  const termo = normalizar(busca.trim())
  const lista = produtos
    .filter((p) => categoria === 'Todos' || p.categoria === categoria)
    .filter((p) => !termo || normalizar(`${p.nome} ${p.descricao} ${p.categoria}`).includes(termo))
  const ordenada =
    ordem === 'relevancia'
      ? lista
      : [...lista].sort((a, b) =>
          ordem === 'desconto'
            ? percentualDesconto(b) - percentualDesconto(a)
            : ((a.preco ?? Infinity) - (b.preco ?? Infinity)) * (ordem === 'menor-preco' ? 1 : -1),
        )

  const irParaGrade = () => gradeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  const escolherCategoria = (c: string) => {
    setCategoria(c)
    irParaGrade()
  }

  useEffect(() => {
    document.documentElement.classList.remove('dark')
    document.title = `${loja.nome} — Produtos impressos em 3D`
  }, [])

  const propsCartao = (p: Produto) => ({
    produto: p,
    noCarrinho: carrinho.noCarrinho(p.id),
    onAbrir: () => setDetalhe(p),
    onAdicionar: () => carrinho.alterarQuantidade(chaveCarrinho(p), 1),
  })

  return (
    <div className={`min-h-screen bg-stone-100 text-base text-slate-800 ${carrinho.totalItens > 0 ? 'pb-24' : ''}`}>
      <div className="bg-brand-700 px-4 py-2 text-center text-sm font-semibold text-white sm:text-base">
        <span>🚚 Entrega para todo o Brasil por {formatarPreco(loja.taxaEntrega)}</span>
        <span className="hidden sm:inline"> · 💳 Pix, cartão ou boleto</span>
        <span className="hidden lg:inline"> · 💬 Atendimento pelo WhatsApp</span>
      </div>

      <header className="sticky top-0 z-30 border-b border-stone-200 bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 md:gap-6">
          <a href="#" onClick={(e) => (e.preventDefault(), window.scrollTo({ top: 0, behavior: 'smooth' }))} className="flex shrink-0 items-center gap-2">
            <img src={`${base}cube.svg`} alt="" className="h-9 w-9" />
            <span className="text-xl font-extrabold tracking-tight text-slate-900">{loja.nome}</span>
          </a>
          <CampoBusca valor={busca} onMudar={setBusca} onEnviar={irParaGrade} className="hidden flex-1 md:flex" />
          <div className="ml-auto flex items-center gap-1 md:ml-0">
            <a
              href={linkWhatsApp(mensagemGeral)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-11 items-center gap-2 rounded-xl px-3 font-semibold text-slate-700 hover:bg-stone-100"
            >
              <IconeWhatsApp className="h-6 w-6 text-[#1ebe5a]" />
              <span className="hidden leading-tight lg:block">
                <span className="block text-xs font-normal text-slate-500">Atendimento</span>
                {telefoneFormatado}
              </span>
            </a>
            <button
              type="button"
              onClick={carrinho.abrir}
              aria-label={`Abrir carrinho, ${carrinho.totalItens} ${carrinho.totalItens === 1 ? 'item' : 'itens'}`}
              className="relative flex min-h-11 items-center gap-2 rounded-xl px-3 font-semibold text-slate-700 hover:bg-stone-100"
            >
              <span className="relative">
                <IconeCarrinho className="h-7 w-7" />
                {carrinho.totalItens > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-600 px-1 text-xs font-extrabold text-white">
                    {carrinho.totalItens}
                  </span>
                )}
              </span>
              <span className="hidden leading-tight md:block">
                <span className="block text-xs font-normal text-slate-500">Carrinho</span>
                {formatarPreco(carrinho.totalCentavos / 100)}
              </span>
            </button>
          </div>
        </div>
        <div className="px-4 pb-3 md:hidden">
          <CampoBusca valor={busca} onMudar={setBusca} onEnviar={irParaGrade} />
        </div>
        <nav aria-label="Categorias" className="border-t border-stone-200">
          <ul className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-2">
            {categorias.map((c) => (
              <li key={c} className="shrink-0">
                <button
                  type="button"
                  onClick={() => escolherCategoria(c)}
                  aria-pressed={categoria === c}
                  className={`flex min-h-12 items-center gap-2 border-b-[3px] px-3 font-semibold transition ${
                    categoria === c ? 'border-brand-600 text-brand-700' : 'border-transparent text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {iconesCategorias[c] && <span aria-hidden>{iconesCategorias[c]}</span>}
                  {c === 'Todos' ? 'Todos os produtos' : c}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main className="mx-auto max-w-7xl space-y-8 px-4 py-6">
        <section className="grid items-center gap-6 overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 to-brand-900 p-6 text-white md:grid-cols-2 md:p-10">
          <div>
            <p className="inline-block rounded-full bg-white/15 px-3 py-1 text-sm font-semibold">✨ Feito em impressão 3D</p>
            <h1 className="mt-3 text-3xl font-extrabold leading-tight md:text-5xl">Carimbos, moldes e decoração para você</h1>
            <p className="mt-3 text-lg text-brand-50">{loja.slogan}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => {
                  setOrdem('desconto')
                  escolherCategoria('Todos')
                }}
                className="min-h-12 rounded-xl bg-white px-6 font-bold text-brand-800 shadow hover:bg-brand-50"
              >
                Ver ofertas
              </button>
              <a
                href={linkWhatsApp(mensagemGeral)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center gap-2 rounded-xl border-2 border-white/70 px-5 font-bold hover:bg-white/10"
              >
                <IconeWhatsApp className="h-5 w-5" /> Falar no WhatsApp
              </a>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {ofertas.slice(0, 3).map((p, i) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setDetalhe(p)}
                aria-label={`Ver ${p.nome}`}
                className={`overflow-hidden rounded-2xl bg-white shadow-lg ring-4 ring-white/20 ${i === 1 ? 'md:-translate-y-4' : 'md:translate-y-4'}`}
              >
                <img src={`${base}produtos/${p.fotos?.[0]}`} alt="" className="aspect-square w-full object-cover" />
              </button>
            ))}
          </div>
        </section>

        <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {[
            ['🚚', 'Entrega para todo o Brasil', `Valor fixo de ${formatarPreco(loja.taxaEntrega)}`],
            ['💳', 'Pix, cartão ou boleto', 'Você escolhe no carrinho'],
            ['💬', 'Atendimento pelo WhatsApp', 'Com uma pessoa de verdade'],
            ['🛠️', 'Produção própria', 'Peças impressas em 3D'],
          ].map(([icone, titulo, texto]) => (
            <li key={titulo} className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm">
              <span className="text-3xl" aria-hidden>{icone}</span>
              <span>
                <span className="block font-bold leading-tight text-slate-900">{titulo}</span>
                <span className="block text-sm text-slate-600">{texto}</span>
              </span>
            </li>
          ))}
        </ul>

        {ofertas.length > 0 && !termo && categoria === 'Todos' && (
          <section aria-labelledby="titulo-ofertas">
            <div className="mb-3 flex items-end justify-between gap-3">
              <h2 id="titulo-ofertas" className="text-2xl font-extrabold text-slate-900">🔥 Maiores descontos</h2>
              <button
                type="button"
                onClick={() => {
                  setOrdem('desconto')
                  irParaGrade()
                }}
                className="min-h-11 font-semibold text-brand-700 hover:underline"
              >
                Ver todas →
              </button>
            </div>
            <ul className="-mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-2">
              {ofertas.map((p) => (
                <li key={p.id} className="w-44 shrink-0 snap-start sm:w-52">
                  <CartaoCompacto {...propsCartao(p)} />
                </li>
              ))}
            </ul>
          </section>
        )}

        <section ref={gradeRef} aria-labelledby="titulo-grade" className="scroll-mt-48">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 id="titulo-grade" className="text-2xl font-extrabold text-slate-900">
                {termo ? `Resultados para “${busca.trim()}”` : categoria === 'Todos' ? 'Todos os produtos' : categoria}
              </h2>
              <p className="text-slate-600" aria-live="polite">
                {ordenada.length} {ordenada.length === 1 ? 'produto' : 'produtos'}
              </p>
            </div>
            <label className="flex items-center gap-2 font-semibold text-slate-700">
              Ordenar por
              <select
                value={ordem}
                onChange={(e) => setOrdem(e.target.value as Ordem)}
                className="min-h-11 rounded-xl border-2 border-stone-300 bg-white px-3 font-semibold focus:border-brand-600 focus:outline-none"
              >
                <option value="relevancia">Mais relevantes</option>
                <option value="desconto">Maior desconto</option>
                <option value="menor-preco">Menor preço</option>
                <option value="maior-preco">Maior preço</option>
              </select>
            </label>
          </div>

          {ordenada.length === 0 ? (
            <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
              <p className="text-xl font-bold text-slate-900">Não encontramos nada com esse nome 😕</p>
              <p className="mt-2 text-slate-600">Tente outra palavra ou peça sob encomenda pelo WhatsApp.</p>
              <button
                type="button"
                onClick={() => {
                  setBusca('')
                  setCategoria('Todos')
                }}
                className="mt-5 min-h-12 rounded-xl bg-slate-900 px-6 font-bold text-white hover:bg-slate-700"
              >
                Ver todos os produtos
              </button>
            </div>
          ) : (
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {ordenada.map((p) => (
                <li key={p.id}>
                  <CartaoCompacto {...propsCartao(p)} />
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="grid items-center gap-6 rounded-3xl bg-slate-900 p-6 text-white md:grid-cols-[1fr_auto] md:p-10">
          <div>
            <p className="font-semibold text-brand-300">Para empresas e festas</p>
            <h2 className="mt-1 text-2xl font-extrabold md:text-3xl">Carimbo com a sua logo e pedidos em quantidade</h2>
            <p className="mt-2 text-slate-300">Brindes, confeitarias, buffets e eventos. Fazemos orçamento sem compromisso.</p>
          </div>
          <a
            href={linkWhatsApp(msgEmpresa)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-14 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 text-lg font-bold text-white hover:bg-[#1ebe5a]"
          >
            <IconeWhatsApp className="h-6 w-6" /> Pedir orçamento
          </a>
        </section>

        <section aria-labelledby="titulo-duvidas" className="mx-auto max-w-3xl">
          <h2 id="titulo-duvidas" className="mb-4 text-center text-2xl font-extrabold text-slate-900">Dúvidas frequentes</h2>
          <div className="space-y-2">
            {duvidas.map(([pergunta, resposta]) => (
              <details key={pergunta} className="group rounded-2xl bg-white shadow-sm">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 text-lg font-bold text-slate-900 [&::-webkit-details-marker]:hidden">
                  {pergunta}
                  <span className="text-2xl text-brand-600 transition group-open:rotate-45" aria-hidden>+</span>
                </summary>
                <p className="px-5 pb-4 text-slate-600">{resposta}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <footer className="mt-10 bg-slate-900 text-slate-300">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="flex items-center gap-2 text-xl font-extrabold text-white">
              <img src={`${base}cube.svg`} alt="" className="h-8 w-8" /> {loja.nome}
            </p>
            <p className="mt-2">{loja.slogan}</p>
          </div>
          <div>
            <h2 className="font-bold text-white">Categorias</h2>
            <ul className="mt-2 space-y-1">
              {categorias.slice(1).map((c) => (
                <li key={c}>
                  <button type="button" onClick={() => escolherCategoria(c)} className="min-h-9 hover:text-white hover:underline">
                    {c}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-bold text-white">Atendimento</h2>
            <a href={linkWhatsApp(mensagemGeral)} target="_blank" rel="noopener noreferrer" className="mt-2 flex min-h-9 items-center gap-2 hover:text-white">
              <IconeWhatsApp className="h-5 w-5 text-[#25D366]" /> {telefoneFormatado}
            </a>
            <p className="mt-1">{loja.cidade}</p>
          </div>
          <div>
            <h2 className="font-bold text-white">Pagamento e entrega</h2>
            <p className="mt-2">{loja.formasPagamento.join(', ')}</p>
            <p className="mt-1">Entrega com valor fixo de {formatarPreco(loja.taxaEntrega)}</p>
          </div>
        </div>
        <p className="border-t border-white/10 py-4 text-center text-sm">© {new Date().getFullYear()} {loja.nome} · Todos os direitos reservados</p>
      </footer>

      <BarraCarrinho totalItens={carrinho.totalItens} totalCentavos={carrinho.totalCentavos} onAbrir={carrinho.abrir} />

      {detalhe && (
        <DetalhesProduto
          key={detalhe.id}
          produto={detalhe}
          noCarrinho={carrinho.noCarrinho(detalhe.id)}
          onAdicionar={(v) => carrinho.alterarQuantidade(chaveCarrinho(detalhe, v), 1)}
          onVerCarrinho={carrinho.abrir}
          onFechar={() => setDetalhe(null)}
        />
      )}

      <Carrinho
        dialogRef={carrinho.dialogRef}
        itens={carrinho.itens}
        subtotalCentavos={carrinho.totalCentavos}
        onAlterar={carrinho.alterarQuantidade}
        onEsvaziar={carrinho.esvaziar}
      />
    </div>
  )
}

function CampoBusca({
  valor,
  onMudar,
  onEnviar,
  className = '',
}: {
  valor: string
  onMudar: (v: string) => void
  onEnviar: () => void
  className?: string
}) {
  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault()
        onEnviar()
      }}
      className={`flex ${className}`}
    >
      <input
        type="search"
        value={valor}
        onChange={(e) => onMudar(e.target.value)}
        placeholder="O que você procura? Ex.: carimbo, Natal…"
        aria-label="Buscar produtos"
        className="min-h-12 w-full min-w-0 rounded-l-xl border-2 border-r-0 border-stone-300 px-4 text-base focus:border-brand-600 focus:outline-none"
      />
      <button type="submit" aria-label="Buscar" className="flex min-h-12 w-14 shrink-0 items-center justify-center rounded-r-xl bg-brand-600 text-white hover:bg-brand-700">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" aria-hidden className="h-6 w-6">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-4-4" />
        </svg>
      </button>
    </form>
  )
}

function CartaoCompacto({
  produto: p,
  noCarrinho,
  onAbrir,
  onAdicionar,
}: {
  produto: Produto
  noCarrinho: number
  onAbrir: () => void
  onAdicionar: () => void
}) {
  const [adicionado, setAdicionado] = useState(0)
  useEffect(() => {
    if (!adicionado) return
    const t = setTimeout(() => setAdicionado(0), 1500)
    return () => clearTimeout(t)
  }, [adicionado])

  const pct = percentualDesconto(p)
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-stone-200 transition hover:shadow-lg">
      <button type="button" onClick={onAbrir} className="flex flex-1 flex-col text-left" aria-label={`Ver detalhes de ${p.nome}`}>
        <span className="relative block aspect-square w-full overflow-hidden bg-white">
          {p.fotos?.[0] ? (
            <img src={`${base}produtos/${p.fotos[0]}`} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
          ) : (
            <span className="flex h-full items-center justify-center text-6xl" aria-hidden>{p.emoji ?? '📦'}</span>
          )}
          <SeloDesconto produto={p} className="absolute left-2 top-2 !px-2 !py-0.5 !text-sm" />
        </span>
        <span className="flex flex-1 flex-col p-3">
          <span className="line-clamp-2 h-[2.75em] text-[15px] font-semibold leading-snug text-slate-800">{p.nome}</span>
          <span className="mt-auto pt-2">
            {p.preco ? (
              <>
                {pct > 0 && <s className="block text-sm text-slate-500">{formatarPreco(p.precoOriginal!)}</s>}
                {temPrecosDiferentes(p) && <span className="block text-xs font-semibold text-slate-500">A partir de</span>}
                <span className="block text-xl font-extrabold text-slate-900">{formatarPreco(p.preco)}</span>
              </>
            ) : (
              <span className="block text-lg font-extrabold text-slate-500">Sob consulta</span>
            )}
          </span>
        </span>
      </button>
      <div className="px-3 pb-3">
        {p.preco && !p.variacoes ? (
          <button
            type="button"
            onClick={() => {
              onAdicionar()
              setAdicionado((n) => n + 1)
            }}
            className={`flex min-h-11 w-full items-center justify-center gap-2 rounded-xl font-bold text-white transition ${
              adicionado ? 'bg-brand-600' : 'bg-slate-900 hover:bg-slate-700'
            }`}
          >
            {adicionado ? (
              '✓ Adicionado'
            ) : (
              <>
                <IconeCarrinho className="h-5 w-5" /> Adicionar
              </>
            )}
          </button>
        ) : (
          <button
            type="button"
            onClick={onAbrir}
            className="flex min-h-11 w-full items-center justify-center rounded-xl border-2 border-slate-900 font-bold text-slate-900 hover:bg-slate-900 hover:text-white"
          >
            {p.variacoes ? 'Ver opções' : 'Ver detalhes'}
          </button>
        )}
        <p className="mt-1 min-h-5 text-center text-sm font-semibold text-brand-700" aria-live="polite">
          {noCarrinho > 0 && `${noCarrinho} no carrinho`}
        </p>
      </div>
    </article>
  )
}
