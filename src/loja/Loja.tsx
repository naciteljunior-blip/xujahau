import { useEffect, useMemo, useState } from 'react'
import Carrinho from './Carrinho'
import { BarraCarrinho, BotaoWhatsApp, IconeCarrinho } from './componentes'
import { iconesCategorias, loja, produtos, type Produto } from './config'
import { BotaoAdicionar, DetalhesProduto, FotoProduto, Preco, SeloDesconto, type PropsCarrinho } from './produto'
import { useCarrinho } from './useCarrinho'
import { base, chaveCarrinho, duvidas, formatarPreco, linkWhatsApp, mensagemGeral, percentualDesconto, temPrecosDiferentes } from './util'

const msgGeral = mensagemGeral
const msgEncomenda = `Olá! Vim pelo site da ${loja.nome} e gostaria de encomendar uma peça 3D.`
const msgEmpresa = `Olá! Vim pelo site da ${loja.nome} e gostaria de um orçamento para a minha empresa.

Empresa:
Produto desejado:
Quantidade:
Prazo:`

export default function Loja() {
  const [categoria, setCategoria] = useState('Todos')
  const categorias = useMemo(() => ['Todos', ...new Set(produtos.map((p) => p.categoria))], [])
  const visiveis = categoria === 'Todos' ? produtos : produtos.filter((p) => p.categoria === categoria)

  const carrinho = useCarrinho()
  const { itens, totalItens, totalCentavos, alterarQuantidade, noCarrinho } = carrinho
  const abrirCarrinho = carrinho.abrir

  const [detalhe, setDetalhe] = useState<Produto | null>(null)

  useEffect(() => {
    document.documentElement.classList.remove('dark')
    document.title = `${loja.nome} — Produtos impressos em 3D`
  }, [])

  return (
    <div className={`min-h-screen bg-stone-50 text-lg text-slate-800 ${totalItens > 0 ? 'pb-24' : ''}`}>
      <a href="#produtos" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:p-3">
        Pular para os produtos
      </a>

      <header className="sticky top-0 z-30 border-b border-stone-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <a href="#inicio" className="flex items-center gap-2.5">
            <img src={`${base}cube.svg`} alt="" className="h-9 w-9" />
            <span className="whitespace-nowrap text-lg font-extrabold tracking-tight sm:text-xl">{loja.nome}</span>
          </a>
          <nav className="hidden items-center gap-6 font-medium text-slate-600 md:flex">
            <a href="#produtos" className="hover:text-brand-700">Produtos</a>
            <a href="#empresas" className="hover:text-brand-700">Para empresas</a>
            <a href="#duvidas" className="hover:text-brand-700">Dúvidas</a>
          </nav>
          <div className="flex items-center gap-2">
            <BotaoWhatsApp href={linkWhatsApp(msgGeral)} tamanho="pequeno" className="hidden sm:inline-flex">
              WhatsApp
            </BotaoWhatsApp>
            <button
              type="button"
              onClick={abrirCarrinho}
              aria-label={`Abrir carrinho, ${totalItens} ${totalItens === 1 ? 'item' : 'itens'}`}
              className="relative inline-flex min-h-11 items-center gap-2 rounded-2xl bg-slate-900 px-4 text-base font-bold text-white shadow-md transition hover:bg-slate-700 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-slate-400"
            >
              <IconeCarrinho className="h-5 w-5" />
              Carrinho
              {totalItens > 0 && (
                <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-brand-500 px-1.5 text-sm font-extrabold">
                  {totalItens}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <main>
        {produtos.length > 0 && (
          <section aria-label="Destaques" className="border-b border-stone-200 bg-white pb-3 pt-5">
            {categorias.length > 2 && (
              <FiltroCategorias categorias={categorias} ativa={categoria} onEscolher={setCategoria} className="mx-auto max-w-6xl px-4" />
            )}
            <Carrossel key={categoria} itens={visiveis} onAbrir={setDetalhe} />
          </section>
        )}

        <section id="inicio" className="relative overflow-hidden bg-gradient-to-b from-brand-50 to-stone-50">
          <Decoracao />
          <div className="relative mx-auto max-w-6xl px-4 py-16 text-center md:py-24">
            <p className="mb-4 inline-block rounded-full bg-white px-4 py-1.5 text-base font-semibold text-brand-700 shadow-sm">
              ✨ Feito em impressão 3D
            </p>
            <h1 className="mx-auto max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-6xl">
              Peças criativas, úteis e <span className="text-brand-600">feitas para você</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-xl text-slate-600">{loja.slogan}</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="#produtos"
                className="inline-flex min-h-14 w-full items-center justify-center rounded-2xl bg-slate-900 px-8 text-lg font-bold text-white shadow-lg transition hover:bg-slate-700 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-slate-400 sm:w-auto"
              >
                Ver produtos
              </a>
              <BotaoWhatsApp href={linkWhatsApp(msgGeral)} className="w-full sm:w-auto">
                Comprar pelo WhatsApp
              </BotaoWhatsApp>
            </div>
            <p className="mt-6 text-base text-slate-500">📦 {loja.cidade}</p>
          </div>
        </section>

        <section aria-labelledby="como-comprar" className="mx-auto max-w-6xl px-4 py-14">
          <h2 id="como-comprar" className="text-center text-3xl font-extrabold text-slate-900">
            Comprar é fácil
          </h2>
          <ol className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              ['🛒', 'Escolha', 'Toque em “Adicionar ao carrinho” nos produtos que você gostou.'],
              ['💬', 'Envie pelo WhatsApp', 'Abra o carrinho e toque no botão verde. O pedido já vai pronto, com o total.'],
              ['🚚', 'Receba', 'Combinamos o pagamento e a entrega com você.'],
            ].map(([icone, titulo, texto], i) => (
              <li key={titulo} className="flex items-start gap-4 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-stone-200">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-3xl" aria-hidden>
                  {icone}
                </span>
                <div>
                  <p className="text-sm font-bold uppercase tracking-wide text-brand-700">Passo {i + 1}</p>
                  <h3 className="text-xl font-bold text-slate-900">{titulo}</h3>
                  <p className="mt-1 text-slate-600">{texto}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section id="produtos" aria-labelledby="titulo-produtos" className="scroll-mt-20 bg-white py-14">
          <div className="mx-auto max-w-6xl px-4">
            <h2 id="titulo-produtos" className="text-center text-3xl font-extrabold text-slate-900">
              Nossos produtos
            </h2>
            {produtos.length === 0 ? (
              <div className="mx-auto mt-8 max-w-2xl rounded-3xl bg-gradient-to-br from-brand-50 via-white to-amber-50 p-8 text-center ring-1 ring-stone-200 md:p-12">
                <span className="text-6xl" aria-hidden>🛠️</span>
                <h3 className="mt-4 text-2xl font-bold text-slate-900">Nossa vitrine está sendo montada</h3>
                <p className="mt-3 text-slate-600">
                  Em breve você verá nossos produtos aqui. Mas já dá para fazer o seu pedido: conte o que você
                  precisa pelo WhatsApp e a gente faz sob encomenda!
                </p>
                <BotaoWhatsApp href={linkWhatsApp(msgEncomenda)} className="mt-6 w-full sm:w-auto">
                  Fazer um pedido
                </BotaoWhatsApp>
              </div>
            ) : (
              <>
                <p className="mt-2 text-center text-slate-600">Não achou o que procura? Fazemos sob encomenda!</p>

                {categorias.length > 2 && (
                  <FiltroCategorias categorias={categorias} ativa={categoria} onEscolher={setCategoria} className="mt-8" />
                )}

                <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {visiveis.map((p) => (
                    <CartaoProduto
                      key={p.id}
                      produto={p}
                      noCarrinho={noCarrinho(p.id)}
                      onAdicionar={() => alterarQuantidade(p.id, 1)}
                      onVerCarrinho={abrirCarrinho}
                      onVerDetalhes={() => setDetalhe(p)}
                    />
                  ))}
                </ul>
              </>
            )}
          </div>
        </section>

        <section id="empresas" aria-labelledby="titulo-empresas" className="scroll-mt-20 px-4 py-14">
          <div className="mx-auto grid max-w-6xl items-center gap-10 overflow-hidden rounded-[2rem] bg-slate-900 p-8 text-white md:grid-cols-2 md:p-14">
            <div>
              <p className="font-semibold text-brand-300">Para empresas</p>
              <h2 id="titulo-empresas" className="mt-2 text-3xl font-extrabold md:text-4xl">
                Brindes e peças com a cara da sua marca
              </h2>
              <p className="mt-4 text-slate-300">
                Atendemos empresas, lojas, escolas e eventos com pedidos em quantidade e preço especial.
              </p>
              <BotaoWhatsApp href={linkWhatsApp(msgEmpresa)} className="mt-8 w-full sm:w-auto">
                Pedir orçamento
              </BotaoWhatsApp>
            </div>
            <ul className="grid gap-3 text-lg">
              {[
                ['🎁', 'Brindes personalizados com logo'],
                ['📦', 'Pedidos em quantidade com desconto'],
                ['🧩', 'Protótipos e peças técnicas'],
                ['🧾', 'Emissão de orçamento formal'],
              ].map(([icone, texto]) => (
                <li key={texto} className="flex items-center gap-4 rounded-2xl bg-white/10 p-4">
                  <span className="text-2xl" aria-hidden>{icone}</span>
                  {texto}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {loja.marketplaces.length > 0 && (
          <section aria-labelledby="titulo-marketplaces" className="mx-auto max-w-6xl px-4 pb-14 text-center">
            <h2 id="titulo-marketplaces" className="text-2xl font-extrabold text-slate-900">
              Prefere comprar pelo marketplace?
            </h2>
            <p className="mt-2 text-slate-600">Também estamos nas lojas que você já conhece.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {loja.marketplaces.map((m) => (
                <a
                  key={m.nome}
                  href={m.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex min-h-14 items-center rounded-2xl px-7 text-lg font-bold text-white shadow-sm transition focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-slate-400 ${m.cor}`}
                >
                  {m.nome} ↗
                </a>
              ))}
            </div>
          </section>
        )}

        <section id="duvidas" aria-labelledby="titulo-duvidas" className="scroll-mt-20 bg-white py-14">
          <div className="mx-auto max-w-3xl px-4">
            <h2 id="titulo-duvidas" className="text-center text-3xl font-extrabold text-slate-900">
              Dúvidas frequentes
            </h2>
            <div className="mt-8 space-y-3">
              {duvidas.map(([pergunta, resposta]) => (
                <details key={pergunta} className="group rounded-2xl bg-stone-50 ring-1 ring-stone-200 open:bg-brand-50/60">
                  <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 px-6 text-lg font-bold text-slate-900 [&::-webkit-details-marker]:hidden">
                    {pergunta}
                    <span className="text-2xl text-brand-600 transition group-open:rotate-45" aria-hidden>+</span>
                  </summary>
                  <p className="px-6 pb-5 text-slate-600">{resposta}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 text-center">
          <h2 className="text-3xl font-extrabold text-slate-900">Ficou com alguma dúvida?</h2>
          <p className="mt-2 text-slate-600">Chame a gente. Respondemos rapidinho!</p>
          <BotaoWhatsApp href={linkWhatsApp(msgGeral)} className="mt-6 w-full sm:w-auto">
            Conversar no WhatsApp
          </BotaoWhatsApp>
        </section>
      </main>

      <footer className="border-t border-stone-200 bg-white px-4 py-8 text-center text-base text-slate-500">
        <p className="font-bold text-slate-700">{loja.nome}</p>
        <p className="mt-1">{loja.cidade}</p>
        {loja.instagram && (
          <a href={loja.instagram} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block font-semibold text-brand-700 hover:underline">
            Siga no Instagram
          </a>
        )}
        <p className="mt-4 text-sm">© {new Date().getFullYear()} · Todos os direitos reservados</p>
      </footer>

      <BarraCarrinho totalItens={totalItens} totalCentavos={totalCentavos} onAbrir={abrirCarrinho} />

      {detalhe && (
        <DetalhesProduto
          key={detalhe.id}
          produto={detalhe}
          noCarrinho={noCarrinho(detalhe.id)}
          onAdicionar={(v) => alterarQuantidade(chaveCarrinho(detalhe, v), 1)}
          onVerCarrinho={abrirCarrinho}
          onFechar={() => setDetalhe(null)}
        />
      )}

      <Carrinho
        dialogRef={carrinho.dialogRef}
        itens={itens}
        subtotalCentavos={totalCentavos}
        onAlterar={alterarQuantidade}
        onEsvaziar={carrinho.esvaziar}
      />
    </div>
  )
}

function CartaoProduto({
  produto: p,
  onVerDetalhes,
  ...carrinho
}: { produto: Produto; onVerDetalhes: () => void } & PropsCarrinho) {
  const temDetalhes = Boolean(p.detalhes || p.caracteristicas?.length || (p.fotos?.length ?? 0) > 1)

  return (
    <li className="flex flex-col overflow-hidden rounded-3xl bg-stone-50 ring-1 ring-stone-200 transition hover:-translate-y-1 hover:shadow-xl">
      <button
        type="button"
        onClick={() => temDetalhes && onVerDetalhes()}
        tabIndex={temDetalhes ? 0 : -1}
        aria-label={temDetalhes ? `Ver detalhes de ${p.nome}` : undefined}
        className={`relative block ${temDetalhes ? 'cursor-pointer' : 'cursor-default'}`}
      >
        <FotoProduto produto={p} />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-sm font-semibold text-slate-700 shadow-sm">
          {p.categoria}
        </span>
        <SeloDesconto produto={p} className="absolute right-4 top-4" />
      </button>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-bold leading-snug text-slate-900">{p.nome}</h3>
        <p className="mt-2 flex-1 text-slate-600">{p.descricao}</p>
        <Preco produto={p} className="mt-4" />
        <BotaoAdicionar produto={p} {...carrinho} onEscolher={onVerDetalhes} className="mt-4" />
        {temDetalhes && (
          <button
            type="button"
            onClick={onVerDetalhes}
            className="mt-1 min-h-12 rounded-2xl border-2 border-slate-300 font-bold text-slate-700 transition hover:border-slate-500 hover:text-slate-900 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-slate-400"
          >
            Ver detalhes
          </button>
        )}
        {p.links && p.links.length > 0 && (
          <div className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-1 text-base">
            {p.links.map((l) => (
              <a key={l.nome} href={l.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-slate-600 underline underline-offset-4 hover:text-brand-700">
                Ver na {l.nome}
              </a>
            ))}
          </div>
        )}
      </div>
    </li>
  )
}

function Decoracao() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div className="absolute -left-16 top-10 h-48 w-48 rotate-12 rounded-[2.5rem] bg-brand-200/50" />
      <div className="absolute -right-10 top-32 h-36 w-36 -rotate-12 rounded-[2rem] bg-amber-200/60" />
      <div className="absolute bottom-6 left-1/4 h-20 w-20 rotate-45 rounded-2xl bg-sky-200/50" />
    </div>
  )
}

function FiltroCategorias({
  categorias,
  ativa,
  onEscolher,
  className = '',
}: {
  categorias: string[]
  ativa: string
  onEscolher: (categoria: string) => void
  className?: string
}) {
  return (
    <div role="group" aria-label="Filtrar por categoria" className={`flex flex-wrap justify-center gap-2 ${className}`}>
      {categorias.map((c) => (
        <button
          key={c}
          type="button"
          onClick={() => onEscolher(c)}
          aria-pressed={ativa === c}
          className={`inline-flex min-h-12 items-center gap-2 rounded-full px-5 text-base font-semibold transition focus-visible:outline focus-visible:outline-4 focus-visible:outline-brand-300 ${
            ativa === c ? 'bg-brand-600 text-white shadow' : 'bg-stone-100 text-slate-700 hover:bg-stone-200'
          }`}
        >
          {iconesCategorias[c] && <span aria-hidden>{iconesCategorias[c]}</span>}
          {c}
        </button>
      ))}
    </div>
  )
}

const SEGUNDOS_POR_PRODUTO = 4

function Carrossel({ itens, onAbrir }: { itens: Produto[]; onAbrir: (p: Produto) => void }) {
  const [pausado, setPausado] = useState(false)
  if (itens.length === 0) return null

  // Repete a lista para preencher telas largas; a trilha tem duas metades iguais para o loop não dar salto.
  const metade = Array.from({ length: Math.ceil(8 / itens.length) }, () => itens).flat()
  const trilha = [...metade, ...metade]

  return (
    <div className="mt-4">
      <div className="group overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_2%,black_98%,transparent)] motion-reduce:overflow-x-auto">
        <ul
          className={`flex w-max items-start animate-carrossel py-2 group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused] motion-reduce:animate-none ${
            pausado ? '[animation-play-state:paused]' : ''
          }`}
          style={{ animationDuration: `${metade.length * SEGUNDOS_POR_PRODUTO}s` }}
        >
          {trilha.map((p, i) => {
            const copia = i >= itens.length
            return (
              <li key={i} aria-hidden={copia || undefined} className={`pl-4 ${copia ? 'motion-reduce:hidden' : ''}`}>
                <button
                  type="button"
                  tabIndex={copia ? -1 : undefined}
                  onClick={() => onAbrir(p)}
                  aria-label={`${p.nome}${p.preco ? `, ${formatarPreco(p.preco)}` : ''}. Ver detalhes`}
                  className="flex w-52 flex-col overflow-hidden rounded-3xl bg-stone-50 text-left ring-1 ring-stone-200 transition hover:-translate-y-1 hover:shadow-lg focus-visible:outline focus-visible:outline-4 focus-visible:outline-brand-300 sm:w-60"
                >
                  <span className="relative block h-52 w-full shrink-0 overflow-hidden bg-white sm:h-60">
                    {p.fotos?.[0] ? (
                      <img src={`${base}produtos/${p.fotos[0]}`} alt="" loading="lazy" className="h-full w-full object-cover" />
                    ) : (
                      <span className="flex h-full items-center justify-center text-7xl" aria-hidden>{p.emoji ?? '📦'}</span>
                    )}
                    <SeloDesconto produto={p} className="absolute right-3 top-3 text-sm" />
                  </span>
                  <span className="block p-4">
                    <span className="line-clamp-2 min-h-[3rem] text-base font-bold leading-6 text-slate-900">{p.nome}</span>
                    {p.preco ? (
                      <span className="mt-2 flex flex-wrap items-baseline gap-x-2">
                        {temPrecosDiferentes(p) && <span className="w-full text-sm font-semibold text-slate-600">A partir de</span>}
                        <span className="text-2xl font-extrabold text-slate-900">{formatarPreco(p.preco)}</span>
                        {percentualDesconto(p) > 0 && <s className="text-base text-slate-500">{formatarPreco(p.precoOriginal!)}</s>}
                      </span>
                    ) : (
                      <span className="mt-2 block text-xl font-extrabold text-slate-500">Sob consulta</span>
                    )}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
      <div className="mx-auto mt-1 flex max-w-6xl justify-end px-4 motion-reduce:hidden">
        <button
          type="button"
          onClick={() => setPausado((v) => !v)}
          aria-pressed={pausado}
          className="inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-base font-semibold text-slate-600 underline-offset-4 hover:text-slate-900 hover:underline focus-visible:outline focus-visible:outline-4 focus-visible:outline-slate-400"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="h-4 w-4">
            {pausado ? <path d="M7 4.5v15l13-7.5z" /> : <path d="M6 4h4v16H6zM14 4h4v16h-4z" />}
          </svg>
          {pausado ? 'Continuar' : 'Pausar'}
        </button>
      </div>
    </div>
  )
}
