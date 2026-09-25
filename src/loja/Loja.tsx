import { useEffect, useMemo, useRef, useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { loja, produtos, type Produto } from './config'

type ItemCarrinho = { produto: Produto; quantidade: number }

const QTD_MAXIMA = 99
const centavos = (valor: number) => Math.round(valor * 100)

const base = import.meta.env.BASE_URL

function linkWhatsApp(mensagem: string) {
  return `https://wa.me/${loja.whatsapp}?text=${encodeURIComponent(mensagem)}`
}

const formatarPreco = (valor: number) =>
  valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

const msgGeral = `Olá! Vim pelo site da ${loja.nome} e gostaria de mais informações.`
const msgEncomenda = `Olá! Vim pelo site da ${loja.nome} e gostaria de encomendar uma peça 3D.`
const msgEmpresa = `Olá! Vim pelo site da ${loja.nome} e gostaria de um orçamento para a minha empresa.

Empresa:
Produto desejado:
Quantidade:
Prazo:`

function mensagemPedido(itens: ItemCarrinho[], totalCentavos: number) {
  const linhas = itens.map(
    ({ produto, quantidade }) =>
      `• ${quantidade}x ${produto.nome} — ${formatarPreco((centavos(produto.preco!) * quantidade) / 100)}`,
  )
  return `Olá! Quero fazer este pedido na ${loja.nome}:

${linhas.join('\n')}

*Total: ${formatarPreco(totalCentavos / 100)}*

Pode me passar o frete e as formas de pagamento?`
}

export default function Loja() {
  const [categoria, setCategoria] = useState('Todos')
  const categorias = useMemo(() => ['Todos', ...new Set(produtos.map((p) => p.categoria))], [])
  const visiveis = categoria === 'Todos' ? produtos : produtos.filter((p) => p.categoria === categoria)

  const [carrinho, setCarrinho] = useLocalStorage<Record<string, number>>('thinklab-carrinho', {})
  const carrinhoRef = useRef<HTMLDialogElement>(null)
  const itens: ItemCarrinho[] = produtos
    .filter((p) => p.preco && Number.isInteger(carrinho[p.id]) && carrinho[p.id] > 0)
    .map((p) => ({ produto: p, quantidade: Math.min(carrinho[p.id], QTD_MAXIMA) }))
  const totalItens = itens.reduce((soma, i) => soma + i.quantidade, 0)
  const totalCentavos = itens.reduce((soma, i) => soma + centavos(i.produto.preco!) * i.quantidade, 0)

  const alterarQuantidade = (id: string, delta: number) =>
    setCarrinho((atual) => {
      const nova = Math.min((Number.isInteger(atual[id]) ? atual[id] : 0) + delta, QTD_MAXIMA)
      const copia = { ...atual }
      if (nova > 0) copia[id] = nova
      else delete copia[id]
      return copia
    })
  const abrirCarrinho = () => carrinhoRef.current?.showModal()

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
                <div role="group" aria-label="Filtrar por categoria" className="mt-8 flex flex-wrap justify-center gap-2">
                  {categorias.map((c) => (
                    <button
                      key={c}
                      onClick={() => setCategoria(c)}
                      aria-pressed={categoria === c}
                      className={`min-h-12 rounded-full px-5 text-base font-semibold transition focus-visible:outline focus-visible:outline-4 focus-visible:outline-brand-300 ${
                        categoria === c
                          ? 'bg-brand-600 text-white shadow'
                          : 'bg-stone-100 text-slate-700 hover:bg-stone-200'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
                )}

                <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {visiveis.map((p) => (
                    <CartaoProduto
                      key={p.id}
                      produto={p}
                      noCarrinho={itens.find((i) => i.produto.id === p.id)?.quantidade ?? 0}
                      onAdicionar={() => alterarQuantidade(p.id, 1)}
                      onVerCarrinho={abrirCarrinho}
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
              {[
                ['Como faço para pagar?', 'Aceitamos Pix, cartão e boleto. Combinamos tudo pelo WhatsApp, com calma.'],
                ['Quanto tempo demora?', 'A maioria das peças fica pronta em poucos dias. O prazo exato informamos no atendimento.'],
                ['Vocês entregam na minha cidade?', 'Enviamos para todo o Brasil pelos Correios ou transportadora.'],
                ['Posso escolher a cor ou personalizar?', 'Sim! Temos várias cores e fazemos peças com nome, logo ou do tamanho que você precisar.'],
              ].map(([pergunta, resposta]) => (
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

      {totalItens > 0 ? (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-stone-200 bg-white/95 p-3 backdrop-blur">
          <button
            type="button"
            onClick={abrirCarrinho}
            className="mx-auto flex min-h-14 w-full max-w-xl items-center justify-between gap-3 rounded-2xl bg-slate-900 px-5 text-lg font-bold text-white shadow-lg transition hover:bg-slate-700 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-slate-400"
          >
            <span className="flex items-center gap-3">
              <IconeCarrinho className="h-6 w-6" />
              <span>
                Ver carrinho ({totalItens})<span className="sr-only"> {totalItens === 1 ? 'item' : 'itens'}</span>
              </span>
            </span>
            <span>{formatarPreco(totalCentavos / 100)}</span>
          </button>
        </div>
      ) : (
        <a
          href={linkWhatsApp(msgGeral)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Conversar no WhatsApp"
          className="fixed bottom-5 right-5 z-40 flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl ring-4 ring-white transition hover:scale-105 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
        >
          <IconeWhatsApp className="h-9 w-9" />
        </a>
      )}

      <Carrinho
        dialogRef={carrinhoRef}
        itens={itens}
        totalCentavos={totalCentavos}
        onAlterar={alterarQuantidade}
        onEsvaziar={() => setCarrinho({})}
      />
    </div>
  )
}

function Carrinho({
  dialogRef,
  itens,
  totalCentavos,
  onAlterar,
  onEsvaziar,
}: {
  dialogRef: React.RefObject<HTMLDialogElement>
  itens: ItemCarrinho[]
  totalCentavos: number
  onAlterar: (id: string, delta: number) => void
  onEsvaziar: () => void
}) {
  const fechar = () => dialogRef.current?.close()

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="titulo-carrinho"
      onClick={(e) => e.target === e.currentTarget && fechar()}
      className="my-0 ml-auto mr-0 h-dvh max-h-dvh w-full max-w-md bg-white p-0 text-lg text-slate-800 shadow-2xl backdrop:bg-slate-900/60 sm:rounded-l-3xl"
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between gap-3 border-b border-stone-200 px-5 py-3">
          <h2 id="titulo-carrinho" className="flex items-center gap-2 text-2xl font-extrabold text-slate-900">
            <IconeCarrinho className="h-7 w-7" /> Seu carrinho
          </h2>
          <button
            type="button"
            onClick={fechar}
            className="min-h-12 rounded-2xl bg-stone-100 px-5 font-bold text-slate-700 hover:bg-stone-200 focus-visible:outline focus-visible:outline-4 focus-visible:outline-slate-400"
          >
            ✕ Fechar
          </button>
        </div>

        {itens.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
            <span className="text-6xl" aria-hidden>🛒</span>
            <p className="text-xl font-bold text-slate-900">Seu carrinho está vazio</p>
            <p className="text-slate-600">Toque em “Adicionar ao carrinho” nos produtos que você gostar.</p>
            <a
              href="#produtos"
              onClick={fechar}
              className="mt-2 inline-flex min-h-14 items-center justify-center rounded-2xl bg-slate-900 px-8 font-bold text-white hover:bg-slate-700 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-slate-400"
            >
              Ver produtos
            </a>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-stone-200 overflow-y-auto px-5">
              {itens.map(({ produto: p, quantidade }) => (
                <li key={p.id} className="flex gap-4 py-4">
                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl ring-1 ring-stone-200">
                    {p.fotos?.[0] ? (
                      <img src={`${base}produtos/${p.fotos[0]}`} alt="" className="h-full w-full bg-white object-cover" />
                    ) : (
                      <span className="flex h-full items-center justify-center text-4xl" aria-hidden>{p.emoji ?? '📦'}</span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold leading-snug text-slate-900">{p.nome}</p>
                    <p className="mt-1 text-base text-slate-600">{formatarPreco(p.preco!)} cada</p>
                    <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center rounded-2xl ring-2 ring-stone-200">
                        <button
                          type="button"
                          onClick={() => onAlterar(p.id, -1)}
                          aria-label={`Diminuir quantidade de ${p.nome}`}
                          className="h-12 w-12 rounded-l-2xl text-2xl font-bold text-slate-700 hover:bg-stone-100 focus-visible:outline focus-visible:outline-4 focus-visible:outline-slate-400"
                        >
                          −
                        </button>
                        <span className="w-10 text-center text-xl font-extrabold" aria-live="polite" aria-label={`Quantidade: ${quantidade}`}>
                          {quantidade}
                        </span>
                        <button
                          type="button"
                          onClick={() => onAlterar(p.id, 1)}
                          disabled={quantidade >= QTD_MAXIMA}
                          aria-label={`Aumentar quantidade de ${p.nome}`}
                          className="h-12 w-12 rounded-r-2xl text-2xl font-bold text-slate-700 hover:bg-stone-100 focus-visible:outline focus-visible:outline-4 focus-visible:outline-slate-400 disabled:opacity-40"
                        >
                          +
                        </button>
                      </div>
                      <p className="text-xl font-extrabold text-slate-900">
                        {formatarPreco((centavos(p.preco!) * quantidade) / 100)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onAlterar(p.id, -quantidade)}
                      className="mt-2 min-h-10 text-base font-semibold text-red-700 underline underline-offset-4 hover:text-red-900"
                    >
                      Remover
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-stone-200 bg-stone-50 px-5 py-4">
              <div className="flex items-baseline justify-between">
                <span className="text-xl font-bold text-slate-900">Total</span>
                <span className="text-3xl font-extrabold text-slate-900">{formatarPreco(totalCentavos / 100)}</span>
              </div>
              <p className="mt-1 text-base text-slate-600">O frete e a forma de pagamento são combinados pelo WhatsApp.</p>
              <BotaoWhatsApp href={linkWhatsApp(mensagemPedido(itens, totalCentavos))} className="mt-4 w-full">
                Enviar pedido pelo WhatsApp
              </BotaoWhatsApp>
              <div className="mt-3 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={fechar}
                  className="min-h-12 rounded-2xl border-2 border-slate-300 px-4 font-bold text-slate-700 hover:border-slate-500 focus-visible:outline focus-visible:outline-4 focus-visible:outline-slate-400"
                >
                  Continuar comprando
                </button>
                <button
                  type="button"
                  onClick={() => window.confirm('Tirar todos os produtos do carrinho?') && onEsvaziar()}
                  className="min-h-12 px-2 text-base font-semibold text-slate-500 underline underline-offset-4 hover:text-slate-800"
                >
                  Esvaziar
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </dialog>
  )
}

function BotaoAdicionar({
  produto,
  noCarrinho,
  onAdicionar,
  onVerCarrinho,
  className = '',
}: {
  produto: Produto
  noCarrinho: number
  onAdicionar: () => void
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

  return (
    <div className={className}>
      <button
        type="button"
        onClick={() => {
          onAdicionar()
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
      <p className="mt-2 min-h-7 text-center text-base" aria-live="polite">
        {noCarrinho > 0 && (
          <button type="button" onClick={onVerCarrinho} className="font-semibold text-brand-700 underline underline-offset-4 hover:text-brand-900">
            {noCarrinho} no carrinho · Ver carrinho
          </button>
        )}
      </p>
    </div>
  )
}

function IconeCarrinho({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
      <circle cx="9" cy="20" r="1.5" />
      <circle cx="18" cy="20" r="1.5" />
      <path d="M2.5 3h2.6l2.4 11.2a1.5 1.5 0 0 0 1.5 1.2h8.6a1.5 1.5 0 0 0 1.5-1.1L21 7H6" />
    </svg>
  )
}

const percentualDesconto = (p: Produto) =>
  p.preco && p.precoOriginal && p.precoOriginal > p.preco
    ? Math.floor((1 - p.preco / p.precoOriginal) * 100 + 1e-9)
    : 0

const mensagemProduto = (p: Produto) =>
  `Olá! Tenho interesse no produto *${p.nome}*${p.preco ? ` (${formatarPreco(p.preco)})` : ''}. Pode me passar mais informações?`

type PropsCarrinho = { noCarrinho: number; onAdicionar: () => void; onVerCarrinho: () => void }

function CartaoProduto({ produto: p, ...carrinho }: { produto: Produto } & PropsCarrinho) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const temDetalhes = Boolean(p.detalhes || p.caracteristicas?.length || (p.fotos?.length ?? 0) > 1)

  return (
    <li className="flex flex-col overflow-hidden rounded-3xl bg-stone-50 ring-1 ring-stone-200 transition hover:-translate-y-1 hover:shadow-xl">
      <button
        type="button"
        onClick={() => temDetalhes && dialogRef.current?.showModal()}
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
        <BotaoAdicionar produto={p} {...carrinho} className="mt-4" />
        {temDetalhes && (
          <button
            type="button"
            onClick={() => dialogRef.current?.showModal()}
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
      {temDetalhes && <DetalhesProduto produto={p} dialogRef={dialogRef} {...carrinho} />}
    </li>
  )
}

function FotoProduto({ produto: p, foto }: { produto: Produto; foto?: string }) {
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

function SeloDesconto({ produto, className = '' }: { produto: Produto; className?: string }) {
  const pct = percentualDesconto(produto)
  if (!pct) return null
  return (
    <span className={`rounded-full bg-brand-600 px-3 py-1 text-base font-extrabold text-white shadow ${className}`}>
      {pct}% OFF
    </span>
  )
}

function Preco({ produto: p, className = '' }: { produto: Produto; className?: string }) {
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
      <p className="text-3xl font-extrabold text-slate-900">{formatarPreco(p.preco)}</p>
    </div>
  )
}

function DetalhesProduto({
  produto: p,
  dialogRef,
  onVerCarrinho,
  ...carrinho
}: { produto: Produto; dialogRef: React.RefObject<HTMLDialogElement> } & PropsCarrinho) {
  const [fotoAtual, setFotoAtual] = useState(0)
  const fotos = p.fotos ?? []
  const fechar = () => dialogRef.current?.close()

  return (
    <dialog
      ref={dialogRef}
      aria-label={p.nome}
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
            <SeloDesconto produto={p} className="absolute right-3 top-3" />
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
          <Preco produto={p} className="mt-4" />
          <BotaoAdicionar
            produto={p}
            {...carrinho}
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

function BotaoWhatsApp({
  href,
  children,
  className = '',
  tamanho = 'grande',
}: {
  href: string
  children: React.ReactNode
  className?: string
  tamanho?: 'grande' | 'pequeno'
}) {
  const tam = tamanho === 'grande' ? 'min-h-14 px-5 text-lg gap-2.5' : 'min-h-11 px-4 text-base gap-2'
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center rounded-2xl bg-[#25D366] text-center leading-tight font-bold text-white shadow-md transition hover:bg-[#1ebe5a] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-brand-700 ${tam} ${className}`}
    >
      <IconeWhatsApp className={`shrink-0 ${tamanho === 'grande' ? 'h-7 w-7' : 'h-5 w-5'}`} />
      <span>{children}</span>
    </a>
  )
}

function IconeWhatsApp({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
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
