import { useEffect, useMemo, useState } from 'react'
import { loja, produtos, type Produto } from './config'

const base = import.meta.env.BASE_URL

function linkWhatsApp(mensagem: string) {
  return `https://wa.me/${loja.whatsapp}?text=${encodeURIComponent(mensagem)}`
}

const formatarPreco = (valor: number) =>
  valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

const msgGeral = `Olá! Vim pelo site da ${loja.nome} e gostaria de mais informações.`
const msgEmpresa = `Olá! Vim pelo site da ${loja.nome} e gostaria de um orçamento para a minha empresa.

Empresa:
Produto desejado:
Quantidade:
Prazo:`

export default function Loja() {
  const [categoria, setCategoria] = useState('Todos')
  const categorias = useMemo(() => ['Todos', ...new Set(produtos.map((p) => p.categoria))], [])
  const visiveis = categoria === 'Todos' ? produtos : produtos.filter((p) => p.categoria === categoria)

  useEffect(() => {
    document.documentElement.classList.remove('dark')
    document.title = `${loja.nome} — Produtos impressos em 3D`
  }, [])

  return (
    <div className="min-h-screen bg-stone-50 text-lg text-slate-800">
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
          <BotaoWhatsApp href={linkWhatsApp(msgGeral)} tamanho="pequeno">
            WhatsApp
          </BotaoWhatsApp>
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
              ['👀', 'Escolha', 'Veja os produtos abaixo e escolha o que você gostou.'],
              ['💬', 'Chame no WhatsApp', 'Toque no botão verde. A mensagem já vai pronta.'],
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
            <p className="mt-2 text-center text-slate-600">Não achou o que procura? Fazemos sob encomenda!</p>

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

            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visiveis.map((p) => (
                <CartaoProduto key={p.id} produto={p} />
              ))}
            </ul>
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

      <a
        href={linkWhatsApp(msgGeral)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Conversar no WhatsApp"
        className="fixed bottom-5 right-5 z-40 flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl ring-4 ring-white transition hover:scale-105 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
      >
        <IconeWhatsApp className="h-9 w-9" />
      </a>
    </div>
  )
}

function CartaoProduto({ produto: p }: { produto: Produto }) {
  const mensagem = `Olá! Tenho interesse no produto *${p.nome}*${
    p.preco ? ` (${formatarPreco(p.preco)})` : ''
  }. Pode me passar mais informações?`

  return (
    <li className="flex flex-col overflow-hidden rounded-3xl bg-stone-50 ring-1 ring-stone-200 transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-brand-100 via-white to-amber-100">
        {p.imagem ? (
          <img src={`${base}produtos/${p.imagem}`} alt={p.nome} loading="lazy" className="h-full w-full object-cover" />
        ) : (
          <span className="text-8xl drop-shadow-sm" role="img" aria-label={p.nome}>
            {p.emoji}
          </span>
        )}
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-sm font-semibold text-slate-700 shadow-sm">
          {p.categoria}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-2xl font-bold text-slate-900">{p.nome}</h3>
        <p className="mt-2 flex-1 text-slate-600">{p.descricao}</p>
        <p className="mt-4 text-3xl font-extrabold text-slate-900">
          {p.preco ? formatarPreco(p.preco) : <span className="text-2xl text-slate-500">Sob consulta</span>}
        </p>
        <BotaoWhatsApp href={linkWhatsApp(mensagem)} className="mt-4 w-full">
          {p.preco ? 'Comprar pelo WhatsApp' : 'Pedir orçamento'}
        </BotaoWhatsApp>
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
