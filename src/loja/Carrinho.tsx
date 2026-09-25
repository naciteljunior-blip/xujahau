import { useRef, useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { BotaoWhatsApp, IconeCarrinho } from './componentes'
import { loja } from './config'
import { base, centavos, formatarPreco, linkWhatsApp, QTD_MAXIMA, type ItemCarrinho } from './util'

type Entrega = {
  nome: string
  cep: string
  rua: string
  numero: string
  complemento: string
  bairro: string
  cidade: string
  uf: string
  pagamento: string
  observacoes: string
}

type StatusCep = 'ocioso' | 'buscando' | 'encontrado' | 'nao-encontrado' | 'erro'

const entregaVazia: Entrega = {
  nome: '',
  cep: '',
  rua: '',
  numero: '',
  complemento: '',
  bairro: '',
  cidade: '',
  uf: '',
  pagamento: '',
  observacoes: '',
}

const taxaCentavos = centavos(loja.taxaEntrega)
const digitosCep = (cep: string) => cep.replace(/\D/g, '')

function formatarCep(valor: string) {
  const d = digitosCep(valor).slice(0, 8)
  return d.length > 5 ? `${d.slice(0, 5)}-${d.slice(5)}` : d
}

const obrigatorios: [keyof Entrega, string, (v: string) => boolean][] = [
  ['nome', 'seu nome', (v) => v.trim().length > 0],
  ['cep', 'o CEP', (v) => digitosCep(v).length === 8],
  ['rua', 'a rua', (v) => v.trim().length > 0],
  ['numero', 'o número', (v) => v.trim().length > 0],
  ['bairro', 'o bairro', (v) => v.trim().length > 0],
  ['cidade', 'a cidade', (v) => v.trim().length > 0],
  ['uf', 'o estado', (v) => /^[A-Za-z]{2}$/.test(v.trim())],
  ['pagamento', 'a forma de pagamento', (v) => v.length > 0],
]

const camposFaltando = (e: Entrega) => obrigatorios.filter(([campo, , valido]) => !valido(e[campo]))

function mensagemPedido(itens: ItemCarrinho[], subtotalCentavos: number, e: Entrega) {
  const linhas = itens.map(
    ({ produto, quantidade }) =>
      `• ${quantidade}x ${produto.nome} — ${formatarPreco((centavos(produto.preco!) * quantidade) / 100)}`,
  )
  const complemento = e.complemento.trim() ? ` - ${e.complemento.trim()}` : ''
  const observacoes = e.observacoes.trim() ? `\n*Observações:* ${e.observacoes.trim()}` : ''
  return `Olá! Quero fazer este pedido na ${loja.nome}:

${linhas.join('\n')}

Subtotal: ${formatarPreco(subtotalCentavos / 100)}
Entrega: ${formatarPreco(taxaCentavos / 100)}
*Total: ${formatarPreco((subtotalCentavos + taxaCentavos) / 100)}*

*Nome:* ${e.nome.trim()}
*Endereço:*
${e.rua.trim()}, ${e.numero.trim()}${complemento}
${e.bairro.trim()} - ${e.cidade.trim()}/${e.uf.trim().toUpperCase()}
CEP: ${formatarCep(e.cep)}

*Pagamento:* ${e.pagamento}${observacoes}`
}

export default function Carrinho({
  dialogRef,
  itens,
  subtotalCentavos,
  onAlterar,
  onEsvaziar,
}: {
  dialogRef: React.RefObject<HTMLDialogElement>
  itens: ItemCarrinho[]
  subtotalCentavos: number
  onAlterar: (id: string, delta: number) => void
  onEsvaziar: () => void
}) {
  const [etapa, setEtapa] = useState<'itens' | 'dados'>('itens')
  const [entrega, setEntrega] = useLocalStorage<Entrega>('thinklab-entrega', entregaVazia)
  const [tentouEnviar, setTentouEnviar] = useState(false)
  const [statusCep, setStatusCep] = useState<StatusCep>('ocioso')
  const buscaAtual = useRef(0)
  const corpoRef = useRef<HTMLDivElement>(null)

  const dados = { ...entregaVazia, ...entrega }
  const faltando = camposFaltando(dados)
  const erroDe = (campo: keyof Entrega) => tentouEnviar && faltando.some(([c]) => c === campo)
  const totalCentavos = subtotalCentavos + taxaCentavos

  const fechar = () => dialogRef.current?.close()
  const irPara = (nova: 'itens' | 'dados') => {
    setEtapa(nova)
    corpoRef.current?.scrollTo({ top: 0 })
  }
  const alterar = (campo: keyof Entrega, valor: string) => setEntrega((e) => ({ ...entregaVazia, ...e, [campo]: valor }))

  async function buscarCep(cep: string) {
    const id = ++buscaAtual.current
    setStatusCep('buscando')
    try {
      const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
      const d = await resposta.json()
      if (id !== buscaAtual.current) return
      if (!resposta.ok || d.erro) {
        setStatusCep('nao-encontrado')
        return
      }
      setEntrega((e) => ({
        ...entregaVazia,
        ...e,
        rua: d.logradouro ?? '',
        bairro: d.bairro ?? '',
        cidade: d.localidade ?? '',
        uf: d.uf ?? '',
      }))
      setStatusCep('encontrado')
      document.getElementById(d.logradouro ? 'entrega-numero' : 'entrega-rua')?.focus()
    } catch {
      if (id === buscaAtual.current) setStatusCep('erro')
    }
  }

  function aoDigitarCep(valor: string) {
    const formatado = formatarCep(valor)
    alterar('cep', formatado)
    const d = digitosCep(formatado)
    if (d.length === 8 && d !== digitosCep(dados.cep)) buscarCep(d)
    else if (d.length < 8) {
      buscaAtual.current++
      setStatusCep('ocioso')
    }
  }

  function aoEnviar(e: React.MouseEvent) {
    if (faltando.length === 0) return
    e.preventDefault()
    setTentouEnviar(true)
    const primeiro = faltando[0][0]
    document.getElementById(primeiro === 'pagamento' ? 'entrega-pagamento-0' : `entrega-${primeiro}`)?.focus()
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="titulo-carrinho"
      onClick={(e) => e.target === e.currentTarget && fechar()}
      onClose={() => {
        setEtapa('itens')
        setTentouEnviar(false)
      }}
      className="my-0 ml-auto mr-0 h-dvh max-h-dvh w-full max-w-md bg-white p-0 text-lg text-slate-800 shadow-2xl backdrop:bg-slate-900/60 sm:rounded-l-3xl"
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between gap-3 border-b border-stone-200 px-5 py-3">
          <h2 id="titulo-carrinho" className="flex items-center gap-2 text-2xl font-extrabold text-slate-900">
            <IconeCarrinho className="h-7 w-7" /> {etapa === 'itens' ? 'Seu carrinho' : 'Entrega'}
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
        ) : etapa === 'itens' ? (
          <>
            <div ref={corpoRef} className="flex-1 overflow-y-auto px-5">
              <ul className="divide-y divide-stone-200">
                {itens.map(({ produto: p, quantidade }) => (
                  <LinhaCarrinho key={p.id} produto={p} quantidade={quantidade} onAlterar={onAlterar} />
                ))}
              </ul>
            </div>

            <div className="border-t border-stone-200 bg-stone-50 px-5 py-4">
              <Resumo subtotalCentavos={subtotalCentavos} />
              <button
                type="button"
                onClick={() => irPara('dados')}
                className="mt-4 inline-flex min-h-14 w-full items-center justify-center rounded-2xl bg-slate-900 px-5 text-lg font-bold text-white shadow-md transition hover:bg-slate-700 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-slate-400"
              >
                Continuar →
              </button>
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
        ) : (
          <>
            <div ref={corpoRef} className="flex-1 space-y-6 overflow-y-auto px-5 py-4">
              <button
                type="button"
                onClick={() => irPara('itens')}
                className="min-h-12 font-bold text-slate-700 underline underline-offset-4 hover:text-slate-900"
              >
                ← Voltar ao carrinho
              </button>

              <fieldset className="space-y-4">
                <legend className="text-xl font-extrabold text-slate-900">Para quem vamos entregar?</legend>
                <Campo id="entrega-nome" label="Seu nome" autoComplete="name" value={dados.nome} onChange={(v) => alterar('nome', v)} erro={erroDe('nome')} />
                <div>
                  <Campo
                    id="entrega-cep"
                    label="CEP"
                    autoComplete="postal-code"
                    inputMode="numeric"
                    placeholder="00000-000"
                    value={dados.cep}
                    onChange={aoDigitarCep}
                    erro={erroDe('cep')}
                    className="max-w-[12rem]"
                  />
                  <p className="mt-2 min-h-6 text-base" role="status">
                    {statusCep === 'buscando' && <span className="text-slate-600">Buscando endereço…</span>}
                    {statusCep === 'encontrado' && <span className="font-semibold text-brand-700">✓ Endereço encontrado. Confira e coloque o número.</span>}
                    {statusCep === 'nao-encontrado' && <span className="font-semibold text-red-700">CEP não encontrado. Confira o número ou preencha o endereço abaixo.</span>}
                    {statusCep === 'erro' && <span className="font-semibold text-red-700">Não conseguimos buscar o CEP agora. Preencha o endereço abaixo.</span>}
                  </p>
                </div>
                <Campo id="entrega-rua" label="Rua" autoComplete="address-line1" value={dados.rua} onChange={(v) => alterar('rua', v)} erro={erroDe('rua')} />
                <div className="grid grid-cols-2 gap-3">
                  <Campo id="entrega-numero" label="Número" value={dados.numero} onChange={(v) => alterar('numero', v)} erro={erroDe('numero')} />
                  <Campo id="entrega-complemento" label="Complemento" opcional autoComplete="address-line2" placeholder="Apto, bloco…" value={dados.complemento} onChange={(v) => alterar('complemento', v)} />
                </div>
                <Campo id="entrega-bairro" label="Bairro" value={dados.bairro} onChange={(v) => alterar('bairro', v)} erro={erroDe('bairro')} />
                <div className="grid grid-cols-[1fr_6rem] gap-3">
                  <Campo id="entrega-cidade" label="Cidade" autoComplete="address-level2" value={dados.cidade} onChange={(v) => alterar('cidade', v)} erro={erroDe('cidade')} />
                  <Campo id="entrega-uf" label="Estado" autoComplete="address-level1" placeholder="SP" maxLength={2} value={dados.uf} onChange={(v) => alterar('uf', v.toUpperCase())} erro={erroDe('uf')} />
                </div>
              </fieldset>

              <fieldset>
                <legend className="text-xl font-extrabold text-slate-900">Como você quer pagar?</legend>
                <div className="mt-3 grid gap-2" role="radiogroup" aria-invalid={erroDe('pagamento') || undefined}>
                  {loja.formasPagamento.map((forma, i) => (
                    <label
                      key={forma}
                      className={`flex min-h-14 cursor-pointer items-center gap-3 rounded-2xl px-4 font-bold ring-2 transition has-[:focus-visible]:outline has-[:focus-visible]:outline-4 has-[:focus-visible]:outline-slate-400 ${
                        dados.pagamento === forma
                          ? 'bg-brand-50 text-brand-900 ring-brand-600'
                          : erroDe('pagamento')
                            ? 'ring-red-400'
                            : 'ring-stone-200 hover:ring-stone-400'
                      }`}
                    >
                      <input
                        id={`entrega-pagamento-${i}`}
                        type="radio"
                        name="pagamento"
                        value={forma}
                        checked={dados.pagamento === forma}
                        onChange={() => alterar('pagamento', forma)}
                        className="h-6 w-6 accent-brand-600"
                      />
                      {forma}
                    </label>
                  ))}
                </div>
                {erroDe('pagamento') && <p className="mt-2 text-base font-semibold text-red-700">Escolha uma forma de pagamento.</p>}
              </fieldset>

              <div>
                <label htmlFor="entrega-observacoes" className="block font-bold text-slate-900">
                  Observações <span className="font-normal text-slate-500">(opcional)</span>
                </label>
                <textarea
                  id="entrega-observacoes"
                  rows={3}
                  value={dados.observacoes}
                  onChange={(e) => alterar('observacoes', e.target.value)}
                  placeholder="Ex.: é para presente, entregar à tarde…"
                  className="mt-2 w-full rounded-2xl border-2 border-stone-300 px-4 py-3 text-lg focus:border-brand-600 focus:outline-none focus:ring-4 focus:ring-brand-100"
                />
              </div>
            </div>

            <div className="border-t border-stone-200 bg-stone-50 px-5 py-4">
              <div className="flex items-baseline justify-between">
                <span className="text-xl font-bold text-slate-900">Total</span>
                <span className="text-3xl font-extrabold text-slate-900">{formatarPreco(totalCentavos / 100)}</span>
              </div>
              <p className="text-base text-slate-600">Inclui {formatarPreco(taxaCentavos / 100)} de entrega.</p>
              {tentouEnviar && faltando.length > 0 && (
                <p className="mt-2 text-base font-semibold text-red-700" role="alert">
                  Falta preencher: {faltando.map(([, nome]) => nome).join(', ')}.
                </p>
              )}
              <BotaoWhatsApp href={linkWhatsApp(mensagemPedido(itens, subtotalCentavos, dados))} onClick={aoEnviar} className="mt-3 w-full">
                Enviar pedido pelo WhatsApp
              </BotaoWhatsApp>
            </div>
          </>
        )}
      </div>
    </dialog>
  )
}

function Resumo({ subtotalCentavos }: { subtotalCentavos: number }) {
  return (
    <dl className="space-y-1">
      <div className="flex justify-between text-base text-slate-600">
        <dt>Produtos</dt>
        <dd>{formatarPreco(subtotalCentavos / 100)}</dd>
      </div>
      <div className="flex justify-between text-base text-slate-600">
        <dt>Entrega</dt>
        <dd>{formatarPreco(taxaCentavos / 100)}</dd>
      </div>
      <div className="flex items-baseline justify-between pt-1">
        <dt className="text-xl font-bold text-slate-900">Total</dt>
        <dd className="text-3xl font-extrabold text-slate-900">{formatarPreco((subtotalCentavos + taxaCentavos) / 100)}</dd>
      </div>
    </dl>
  )
}

function LinhaCarrinho({
  produto: p,
  quantidade,
  onAlterar,
}: ItemCarrinho & { onAlterar: (id: string, delta: number) => void }) {
  return (
    <li className="flex gap-4 py-4">
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
          <p className="text-xl font-extrabold text-slate-900">{formatarPreco((centavos(p.preco!) * quantidade) / 100)}</p>
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
  )
}

function Campo({
  id,
  label,
  value,
  onChange,
  erro,
  opcional,
  className = '',
  ...props
}: {
  id: string
  label: string
  value: string
  onChange: (valor: string) => void
  erro?: boolean
  opcional?: boolean
  className?: string
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'id' | 'className'>) {
  return (
    <div>
      <label htmlFor={id} className="block font-bold text-slate-900">
        {label} {opcional && <span className="font-normal text-slate-500">(opcional)</span>}
      </label>
      <input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={erro || undefined}
        className={`mt-2 min-h-14 w-full rounded-2xl border-2 px-4 text-lg focus:outline-none focus:ring-4 ${
          erro ? 'border-red-500 focus:ring-red-100' : 'border-stone-300 focus:border-brand-600 focus:ring-brand-100'
        } ${className}`}
        {...props}
      />
      {erro && <p className="mt-1 text-base font-semibold text-red-700">Preencha este campo.</p>}
    </div>
  )
}
