import { useEffect, useId, useMemo, useRef, useState } from 'react'
import Carrinho from './Carrinho'
import { BarraCarrinho, IconeCarrinho, IconeWhatsApp, Logomarca, SeletorQuantidade } from './componentes'
import { iconesCategorias, loja, produtos, type Produto } from './config'
import { DetalhesProduto, SeloDesconto } from './produto'
import { useCarrinho } from './useCarrinho'
import { base, chaveCarrinho, duvidas, QTD_MAXIMA, formatarPreco, linkWhatsApp, mensagemGeral, percentualDesconto, temPrecosDiferentes } from './util'

type Ordem = 'relevancia' | 'menor-preco' | 'maior-preco' | 'desconto'

const normalizar = (texto: string) => texto.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase()

/** Todas as palavras digitadas precisam aparecer no produto, em qualquer ordem ("natal carimbo" acha "Kit Carimbos Natal"). */
const combina = (p: Produto, palavras: string[]) => {
  const texto = normalizar(`${p.nome} ${p.descricao} ${p.categoria}`)
  return palavras.every((w) => texto.includes(w))
}

const MAX_SUGESTOES = 6

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
  const palavras = termo.split(/\s+/).filter(Boolean)
  const lista = produtos
    .filter((p) => categoria === 'Todos' || p.categoria === categoria)
    .filter((p) => combina(p, palavras))
  // Sugestões embaixo da barra: em todas as categorias, com quem tem a palavra no nome primeiro.
  const sugestoes = palavras.length
    ? produtos
        .filter((p) => combina(p, palavras))
        .sort((a, b) => Number(palavras.every((w) => normalizar(b.nome).includes(w))) - Number(palavras.every((w) => normalizar(a.nome).includes(w))))
    : []
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
    document.title = `${loja.nome} — ${loja.slogan}`
  }, [])

  const propsCartao = (p: Produto) => ({
    produto: p,
    noCarrinho: carrinho.noCarrinho(p.id),
    onAbrir: () => setDetalhe(p),
    onAlterar: (delta: number) => carrinho.alterarQuantidade(chaveCarrinho(p), delta),
  })

  return (
    <div className={`min-h-screen bg-pessego font-marca text-base text-chocolate ${carrinho.totalItens > 0 ? 'pb-24' : ''}`}>
      <div className="bg-vinho px-4 py-2 text-center text-sm font-semibold text-pessego sm:text-base">
        <span>🚚 Entrega para todo o Brasil por {formatarPreco(loja.taxaEntrega)}</span>
        <span className="hidden sm:inline"> · 💳 Pix, cartão ou boleto</span>
        <span className="hidden lg:inline"> · 💬 Atendimento pelo WhatsApp</span>
      </div>

      <header className="sticky top-0 z-30 border-b border-chocolate/10 bg-creme shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 md:gap-6">
          <a href="#" onClick={(e) => (e.preventDefault(), window.scrollTo({ top: 0, behavior: 'smooth' }))} aria-label={`${loja.nome}, voltar ao topo`} className="flex shrink-0 items-center py-1">
            <Logomarca tamanho={32} />
          </a>
          <CampoBusca
            valor={busca}
            onMudar={setBusca} onEnviar={() => {
              setCategoria('Todos')
              irParaGrade()
            }}
            sugestoes={sugestoes}
            onEscolher={setDetalhe} className="hidden flex-1 md:flex" />
          <div className="ml-auto flex items-center gap-1 md:ml-0">
            <a
              href={linkWhatsApp(mensagemGeral)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-11 items-center gap-2 rounded-xl px-3 font-semibold text-chocolate/85 hover:bg-pessego"
            >
              <IconeWhatsApp className="h-6 w-6 text-[#1ebe5a]" />
              <span className="hidden leading-tight lg:block">
                <span className="block text-xs font-normal text-chocolate/70">Atendimento</span>
                {telefoneFormatado}
              </span>
            </a>
            <button
              type="button"
              onClick={carrinho.abrir}
              aria-label={`Abrir carrinho, ${carrinho.totalItens} ${carrinho.totalItens === 1 ? 'item' : 'itens'}`}
              className="relative flex min-h-11 items-center gap-2 rounded-xl px-3 font-semibold text-chocolate/85 hover:bg-pessego"
            >
              <span className="relative">
                <IconeCarrinho className="h-7 w-7" />
                {carrinho.totalItens > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-magenta px-1 text-xs font-extrabold text-pessego">
                    {carrinho.totalItens}
                  </span>
                )}
              </span>
              <span className="hidden leading-tight md:block">
                <span className="block text-xs font-normal text-chocolate/70">Carrinho</span>
                {formatarPreco(carrinho.totalCentavos / 100)}
              </span>
            </button>
          </div>
        </div>
        <div className="px-4 pb-3 md:hidden">
          <CampoBusca
            valor={busca}
            onMudar={setBusca} onEnviar={() => {
              setCategoria('Todos')
              irParaGrade()
            }}
            sugestoes={sugestoes}
            onEscolher={setDetalhe} />
        </div>
        <nav aria-label="Categorias" className="border-t border-chocolate/10">
          <ul className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-2">
            {categorias.map((c) => (
              <li key={c} className="shrink-0">
                <button
                  type="button"
                  onClick={() => escolherCategoria(c)}
                  aria-pressed={categoria === c}
                  className={`flex min-h-12 items-center gap-2 border-b-[3px] px-3 font-semibold transition ${
                    categoria === c ? 'border-vinho text-vinho' : 'border-transparent text-chocolate/75 hover:text-chocolate'
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
        <section className="grid items-center gap-6 overflow-hidden rounded-3xl bg-vinho p-6 text-pessego md:grid-cols-2 md:p-10">
          <div>
            <p className="inline-block rounded-full bg-magenta px-3 py-1 text-sm font-semibold text-pessego">presentes, decor e mimos ♡</p>
            <h1 className="mt-4 text-4xl font-extrabold leading-[0.95] tracking-[-0.035em] md:text-6xl">carimbos, moldes e mimos feitos pra você.</h1>
            <p className="mt-4 text-lg text-pessego/90">{loja.slogan}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => {
                  setOrdem('desconto')
                  escolherCategoria('Todos')
                }}
                className="min-h-12 rounded-full bg-pessego px-6 font-semibold text-vinho hover:bg-pessego-escuro"
              >
                Ver ofertas
              </button>
              <a
                href={linkWhatsApp(mensagemGeral)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center gap-2 rounded-full border-[1.5px] border-pessego px-5 font-semibold hover:bg-pessego/10"
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
                className={`overflow-hidden rounded-2xl bg-creme ring-4 ring-pessego/20 ${i === 1 ? 'md:-translate-y-4' : 'md:translate-y-4'}`}
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
            ['♡', 'Produção própria', 'Feito camada por camada'],
          ].map(([icone, titulo, texto]) => (
            <li key={titulo} className="flex items-center gap-3 rounded-2xl bg-creme p-4">
              <span className="text-3xl" aria-hidden>{icone}</span>
              <span>
                <span className="block font-bold leading-tight text-chocolate">{titulo}</span>
                <span className="block text-sm text-chocolate/75">{texto}</span>
              </span>
            </li>
          ))}
        </ul>

        {ofertas.length > 0 && !termo && categoria === 'Todos' && (
          <section aria-labelledby="titulo-ofertas">
            <div className="mb-3 flex items-end justify-between gap-3">
              <h2 id="titulo-ofertas" className="text-3xl font-extrabold leading-none tracking-[-0.03em] text-chocolate">maiores descontos.</h2>
              <button
                type="button"
                onClick={() => {
                  setOrdem('desconto')
                  irParaGrade()
                }}
                className="min-h-11 font-semibold text-vinho hover:underline"
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
              <h2 id="titulo-grade" className="text-3xl font-extrabold leading-none tracking-[-0.03em] text-chocolate">
                {termo ? `resultados para “${busca.trim()}”.` : categoria === 'Todos' ? 'todos os produtos.' : `${categoria.toLowerCase()}.`}
              </h2>
              <p className="text-chocolate/75" aria-live="polite">
                {ordenada.length} {ordenada.length === 1 ? 'produto' : 'produtos'}
              </p>
            </div>
            <label className="flex items-center gap-2 font-semibold text-chocolate/85">
              Ordenar por
              <select
                value={ordem}
                onChange={(e) => setOrdem(e.target.value as Ordem)}
                className="min-h-11 rounded-full border-2 border-chocolate/20 bg-creme px-4 font-semibold focus:border-vinho focus:outline-none"
              >
                <option value="relevancia">Mais relevantes</option>
                <option value="desconto">Maior desconto</option>
                <option value="menor-preco">Menor preço</option>
                <option value="maior-preco">Maior preço</option>
              </select>
            </label>
          </div>

          {ordenada.length === 0 ? (
            <div className="rounded-3xl bg-creme p-10 text-center">
              <p className="text-xl font-bold text-chocolate">Não encontramos nada com esse nome 😕</p>
              <p className="mt-2 text-chocolate/75">Tente outra palavra ou peça sob encomenda pelo WhatsApp.</p>
              <button
                type="button"
                onClick={() => {
                  setBusca('')
                  setCategoria('Todos')
                }}
                className="mt-5 min-h-12 rounded-full bg-vinho px-6 font-semibold text-pessego hover:bg-vinho-escuro"
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

        <section className="grid items-center gap-6 rounded-3xl bg-chocolate p-6 text-pessego md:grid-cols-[1fr_auto] md:p-10">
          <div>
            <p className="font-semibold text-magenta">Para empresas e festas</p>
            <h2 className="mt-1 text-3xl font-extrabold leading-[0.95] tracking-[-0.03em] md:text-4xl">carimbo com a sua logo e pedidos em quantidade.</h2>
            <p className="mt-2 text-pessego/80">Brindes, confeitarias, buffets e eventos. Fazemos orçamento sem compromisso.</p>
          </div>
          <a
            href={linkWhatsApp(msgEmpresa)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 text-lg font-semibold text-chocolate hover:bg-[#1ebe5a]"
          >
            <IconeWhatsApp className="h-6 w-6" /> Pedir orçamento
          </a>
        </section>

        <section aria-labelledby="titulo-duvidas" className="mx-auto max-w-3xl">
          <h2 id="titulo-duvidas" className="mb-5 text-center text-3xl font-extrabold leading-none tracking-[-0.03em] text-chocolate">dúvidas frequentes.</h2>
          <div className="space-y-2">
            {duvidas.map(([pergunta, resposta]) => (
              <details key={pergunta} className="group rounded-2xl bg-creme">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 text-lg font-bold text-chocolate [&::-webkit-details-marker]:hidden">
                  {pergunta}
                  <span className="text-2xl text-magenta transition group-open:rotate-45" aria-hidden>+</span>
                </summary>
                <p className="px-5 pb-4 text-chocolate/75">{resposta}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <footer className="mt-10 bg-chocolate text-pessego/80">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p>
              <Logomarca tamanho={44} claro />
            </p>
            <p className="mt-3">{loja.slogan}</p>
            {loja.instagram && (
              <a href={loja.instagram} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex min-h-9 items-center font-semibold text-pessego underline decoration-magenta decoration-2 underline-offset-4 hover:text-magenta">
                @{loja.instagram.replace(/\/+$/, '').split('/').pop()}
              </a>
            )}
          </div>
          <div>
            <h2 className="font-bold text-pessego">Categorias</h2>
            <ul className="mt-2 space-y-1">
              {categorias.slice(1).map((c) => (
                <li key={c}>
                  <button type="button" onClick={() => escolherCategoria(c)} className="min-h-9 hover:text-pessego hover:underline">
                    {c}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-bold text-pessego">Atendimento</h2>
            <a href={linkWhatsApp(mensagemGeral)} target="_blank" rel="noopener noreferrer" className="mt-2 flex min-h-9 items-center gap-2 hover:text-pessego">
              <IconeWhatsApp className="h-5 w-5 text-[#25D366]" /> {telefoneFormatado}
            </a>
            <p className="mt-1">{loja.cidade}</p>
          </div>
          <div>
            <h2 className="font-bold text-pessego">Pagamento e entrega</h2>
            <p className="mt-2">{loja.formasPagamento.join(', ')}</p>
            <p className="mt-1">Entrega com valor fixo de {formatarPreco(loja.taxaEntrega)}</p>
          </div>
        </div>
        <p className="border-t border-pessego/10 py-4 text-center text-sm">© {new Date().getFullYear()} {loja.nome} · Todos os direitos reservados</p>
      </footer>

      <BarraCarrinho totalItens={carrinho.totalItens} totalCentavos={carrinho.totalCentavos} onAbrir={carrinho.abrir} />

      {detalhe && (
        <DetalhesProduto
          key={detalhe.id}
          produto={detalhe}
          noCarrinho={carrinho.noCarrinho(detalhe.id)}
          onAdicionar={(v, quantidade) => carrinho.alterarQuantidade(chaveCarrinho(detalhe, v), quantidade)}
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
  sugestoes,
  onEscolher,
  className = '',
}: {
  valor: string
  onMudar: (v: string) => void
  onEnviar: () => void
  sugestoes: Produto[]
  onEscolher: (p: Produto) => void
  className?: string
}) {
  const [aberto, setAberto] = useState(false)
  const [ativo, setAtivo] = useState(-1)
  const id = useId()
  const visiveis = sugestoes.slice(0, MAX_SUGESTOES)
  const mostrar = aberto && valor.trim().length > 0

  const escolher = (p: Produto) => {
    setAberto(false)
    setAtivo(-1)
    onEscolher(p)
  }
  const verTodos = () => {
    setAberto(false)
    setAtivo(-1)
    onEnviar()
  }

  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault()
        if (mostrar && visiveis[ativo]) escolher(visiveis[ativo])
        else verTodos()
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setAberto(false)
      }}
      className={`relative flex ${className}`}
    >
      <input
        type="search"
        role="combobox"
        aria-expanded={mostrar}
        aria-controls={`${id}-lista`}
        aria-autocomplete="list"
        aria-activedescendant={mostrar && ativo >= 0 ? `${id}-${ativo}` : undefined}
        value={valor}
        onChange={(e) => {
          onMudar(e.target.value)
          setAberto(true)
          setAtivo(-1)
        }}
        onFocus={() => setAberto(true)}
        onKeyDown={(e) => {
          if (e.key === 'Escape') setAberto(false)
          if (!mostrar || !visiveis.length) return
          if (e.key === 'ArrowDown') {
            e.preventDefault()
            setAtivo((i) => (i + 1) % visiveis.length)
          } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            setAtivo((i) => (i <= 0 ? visiveis.length - 1 : i - 1))
          }
        }}
        placeholder="O que você procura? Ex.: carimbo, Natal…"
        aria-label="Buscar produtos"
        className="min-h-12 w-full min-w-0 rounded-l-full border-2 border-r-0 border-chocolate/20 bg-creme px-4 text-base focus:border-vinho focus:outline-none"
      />
      <button type="submit" aria-label="Buscar" className="flex min-h-12 w-14 shrink-0 items-center justify-center rounded-r-full bg-vinho text-pessego hover:bg-vinho-escuro">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" aria-hidden className="h-6 w-6">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-4-4" />
        </svg>
      </button>

      {mostrar && (
        <div className="absolute inset-x-0 top-full z-40 mt-2 overflow-hidden rounded-2xl bg-creme shadow-xl ring-1 ring-chocolate/10">
          {visiveis.length === 0 ? (
            <p className="px-4 py-4 text-chocolate/75" role="status">
              Nenhum produto com “{valor.trim()}”. Tente outra palavra ou peça sob encomenda pelo WhatsApp.
            </p>
          ) : (
            <>
              <ul id={`${id}-lista`} role="listbox" aria-label="Produtos encontrados" className="max-h-[60vh] overflow-y-auto py-1">
                {visiveis.map((p, i) => (
                  <li
                    key={p.id}
                    id={`${id}-${i}`}
                    role="option"
                    aria-selected={i === ativo}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => escolher(p)}
                    onMouseEnter={() => setAtivo(i)}
                    className={`flex cursor-pointer items-center gap-3 px-3 py-2 ${i === ativo ? 'bg-pessego' : ''}`}
                  >
                    <span className="h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-pessego ring-1 ring-chocolate/10">
                      {p.fotos?.[0] ? (
                        <img src={`${base}produtos/${p.fotos[0]}`} alt="" loading="lazy" className="h-full w-full object-cover" />
                      ) : (
                        <span className="flex h-full items-center justify-center text-2xl" aria-hidden>{p.emoji ?? '📦'}</span>
                      )}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="line-clamp-2 text-[15px] font-semibold leading-snug text-chocolate">{p.nome}</span>
                      <span className="text-sm lowercase text-chocolate/70">{p.categoria}</span>
                    </span>
                    {p.preco && (
                      <span className="shrink-0 text-right font-extrabold text-magenta">
                        {temPrecosDiferentes(p) && <span className="block text-xs font-semibold text-chocolate/70">a partir de</span>}
                        {formatarPreco(p.preco)}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={verTodos}
                className="flex min-h-12 w-full items-center justify-between border-t border-chocolate/10 px-4 font-semibold text-vinho hover:bg-pessego"
              >
                <span>
                  {sugestoes.length === 1 ? 'Ver 1 resultado na lista' : `Ver todos os ${sugestoes.length} resultados`}
                </span>
                <span aria-hidden>→</span>
              </button>
            </>
          )}
        </div>
      )}
    </form>
  )
}

function CartaoCompacto({
  produto: p,
  noCarrinho,
  onAbrir,
  onAlterar,
}: {
  produto: Produto
  noCarrinho: number
  onAbrir: () => void
  onAlterar: (delta: number) => void
}) {
  const [quantidade, setQuantidade] = useState(1)
  const [adicionado, setAdicionado] = useState(0)
  useEffect(() => {
    if (!adicionado) return
    const t = setTimeout(() => setAdicionado(0), 1500)
    return () => clearTimeout(t)
  }, [adicionado])
  const maximo = Math.max(1, QTD_MAXIMA - noCarrinho)

  const pct = percentualDesconto(p)
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-creme ring-1 ring-chocolate/10 transition hover:shadow-md">
      <button type="button" onClick={onAbrir} className="flex flex-1 flex-col text-left" aria-label={`Ver detalhes de ${p.nome}`}>
        <span className="relative block aspect-square w-full overflow-hidden bg-creme">
          {p.fotos?.[0] ? (
            <img src={`${base}produtos/${p.fotos[0]}`} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
          ) : (
            <span className="flex h-full items-center justify-center text-6xl" aria-hidden>{p.emoji ?? '📦'}</span>
          )}
          <SeloDesconto produto={p} className="absolute left-2 top-2 !px-2 !py-0.5 !text-sm" />
        </span>
        <span className="flex flex-1 flex-col p-3">
          <span className="line-clamp-2 h-[2.75em] text-[15px] font-semibold leading-snug text-chocolate">{p.nome}</span>
          <span className="mt-auto pt-2">
            {p.preco ? (
              <>
                {pct > 0 && <s className="block text-sm text-chocolate/70">{formatarPreco(p.precoOriginal!)}</s>}
                {temPrecosDiferentes(p) && <span className="block text-xs font-semibold text-chocolate/70">A partir de</span>}
                <span className="block text-xl font-extrabold text-magenta">{formatarPreco(p.preco)}</span>
              </>
            ) : (
              <span className="block text-lg font-extrabold text-chocolate/70">Sob consulta</span>
            )}
          </span>
        </span>
      </button>
      <div className="px-3 pb-3">
        {p.preco && !p.variacoes ? (
          <>
            <SeletorQuantidade
              quantidade={Math.min(quantidade, maximo)}
              nome={p.nome}
              onAlterar={(delta) => setQuantidade((q) => Math.min(Math.max(q + delta, 1), maximo))}
              maximo={maximo}
              tamanho="pequeno"
              className="mb-2"
            />
            <button
              type="button"
              onClick={() => {
                onAlterar(Math.min(quantidade, maximo))
                setQuantidade(1)
                setAdicionado((n) => n + 1)
              }}
              disabled={noCarrinho >= QTD_MAXIMA}
              className={`flex min-h-11 w-full items-center justify-center gap-2 rounded-full font-semibold text-pessego transition disabled:opacity-50 ${
                adicionado ? 'bg-magenta' : 'bg-vinho hover:bg-vinho-escuro'
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
          </>
        ) : (
          <button
            type="button"
            onClick={onAbrir}
            className="flex min-h-11 w-full items-center justify-center rounded-full border-[1.5px] border-vinho font-semibold text-vinho hover:bg-vinho hover:text-pessego"
          >
            {p.variacoes ? 'Ver opções' : 'Ver detalhes'}
          </button>
        )}
        <p className="mt-1 min-h-5 text-center text-sm font-semibold text-vinho" aria-live="polite">
          {noCarrinho > 0 && `${noCarrinho} no carrinho`}
        </p>
      </div>
    </article>
  )
}
