import { useRef, useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { BotaoWhatsApp, IconeCarrinho, SeletorQuantidade } from './componentes'
import { loja } from './config'
import { base, centavos, formatarPreco, linkWhatsApp, type ItemCarrinho } from './util'

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
    ({ produto, variacao, preco, quantidade }) =>
      `• ${quantidade}x ${produto.nome}${variacao ? ` (${variacao.nome})` : ''} — ${formatarPreco((centavos(preco) * quantidade) / 100)}`,
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
      className="my-0 ml-auto mr-0 h-dvh max-h-dvh w-full max-w-md bg-creme p-0 text-lg text-chocolate shadow-2xl backdrop:bg-chocolate/60 sm:rounded-l-3xl"
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between gap-3 border-b border-chocolate/10 px-5 py-3">
          <h2 id="titulo-carrinho" className="flex items-center gap-2 text-3xl font-extrabold tracking-[-0.03em] text-chocolate">
            <IconeCarrinho className="h-7 w-7" /> {etapa === 'itens' ? 'seu carrinho.' : 'entrega.'}
          </h2>
          <button
            type="button"
            onClick={fechar}
            className="min-h-12 rounded-full bg-pessego px-5 font-semibold text-chocolate/85 hover:bg-pessego-escuro focus-visible:outline focus-visible:outline-4 focus-visible:outline-magenta"
          >
            ✕ Fechar
          </button>
        </div>

        {itens.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
            <span className="text-6xl" aria-hidden>🛒</span>
            <p className="text-xl font-bold text-chocolate">Seu carrinho está vazio</p>
            <p className="text-chocolate/75">Toque em “Adicionar ao carrinho” nos produtos que você gostar.</p>
            <a
              href="#produtos"
              onClick={fechar}
              className="mt-2 inline-flex min-h-14 items-center justify-center rounded-full bg-vinho px-8 font-semibold text-pessego hover:bg-vinho-escuro focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-magenta"
            >
              Ver produtos
            </a>
          </div>
        ) : etapa === 'itens' ? (
          <>
            <div ref={corpoRef} className="flex-1 overflow-y-auto px-5">
              <ul className="divide-y divide-chocolate/10">
                {itens.map((item) => (
                  <LinhaCarrinho key={item.chave} {...item} onAlterar={onAlterar} />
                ))}
              </ul>
            </div>

            <div className="border-t border-chocolate/10 bg-pessego/50 px-5 py-4">
              <Resumo subtotalCentavos={subtotalCentavos} />
              <button
                type="button"
                onClick={() => irPara('dados')}
                className="mt-4 inline-flex min-h-14 w-full items-center justify-center rounded-full bg-vinho px-5 text-lg font-semibold text-pessego transition hover:bg-vinho-escuro focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-magenta"
              >
                Continuar →
              </button>
              <div className="mt-3 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={fechar}
                  className="min-h-12 rounded-full border-[1.5px] border-vinho px-4 font-semibold text-vinho hover:bg-vinho hover:text-pessego focus-visible:outline focus-visible:outline-4 focus-visible:outline-magenta"
                >
                  Continuar comprando
                </button>
                <button
                  type="button"
                  onClick={() => window.confirm('Tirar todos os produtos do carrinho?') && onEsvaziar()}
                  className="min-h-12 px-2 text-base font-semibold text-chocolate/70 underline underline-offset-4 hover:text-chocolate"
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
                className="min-h-12 font-bold text-chocolate/85 underline underline-offset-4 hover:text-chocolate"
              >
                ← Voltar ao carrinho
              </button>

              <fieldset className="space-y-4">
                <legend className="text-xl font-extrabold text-chocolate">Para quem vamos entregar?</legend>
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
                    {statusCep === 'buscando' && <span className="text-chocolate/75">Buscando endereço…</span>}
                    {statusCep === 'encontrado' && <span className="font-semibold text-vinho">✓ Endereço encontrado. Confira e coloque o número.</span>}
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
                <legend className="text-xl font-extrabold text-chocolate">Como você quer pagar?</legend>
                <div className="mt-3 grid gap-2" role="radiogroup" aria-invalid={erroDe('pagamento') || undefined}>
                  {loja.formasPagamento.map((forma, i) => (
                    <label
                      key={forma}
                      className={`flex min-h-14 cursor-pointer items-center gap-3 rounded-2xl px-4 font-bold ring-2 transition has-[:focus-visible]:outline has-[:focus-visible]:outline-4 has-[:focus-visible]:outline-magenta ${
                        dados.pagamento === forma
                          ? 'bg-salvia/15 text-vinho-escuro ring-vinho'
                          : erroDe('pagamento')
                            ? 'ring-red-400'
                            : 'ring-chocolate/10 hover:ring-chocolate/30'
                      }`}
                    >
                      <input
                        id={`entrega-pagamento-${i}`}
                        type="radio"
                        name="pagamento"
                        value={forma}
                        checked={dados.pagamento === forma}
                        onChange={() => alterar('pagamento', forma)}
                        className="h-6 w-6 accent-vinho"
                      />
                      {forma}
                    </label>
                  ))}
                </div>
                {erroDe('pagamento') && <p className="mt-2 text-base font-semibold text-red-700">Escolha uma forma de pagamento.</p>}
              </fieldset>

              <div>
                <label htmlFor="entrega-observacoes" className="block font-bold text-chocolate">
                  Observações <span className="font-normal text-chocolate/70">(opcional)</span>
                </label>
                <textarea
                  id="entrega-observacoes"
                  rows={3}
                  value={dados.observacoes}
                  onChange={(e) => alterar('observacoes', e.target.value)}
                  placeholder="Ex.: é para presente, entregar à tarde…"
                  className="mt-2 w-full rounded-2xl border-2 border-chocolate/20 px-4 py-3 text-lg focus:border-vinho focus:outline-none focus:ring-4 focus:ring-vinho/15"
                />
              </div>
            </div>

            <div className="border-t border-chocolate/10 bg-pessego/50 px-5 py-4">
              <div className="flex items-baseline justify-between">
                <span className="text-xl font-bold text-chocolate">Total</span>
                <span className="text-3xl font-extrabold text-chocolate">{formatarPreco(totalCentavos / 100)}</span>
              </div>
              <p className="text-base text-chocolate/75">Inclui {formatarPreco(taxaCentavos / 100)} de entrega.</p>
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
      <div className="flex justify-between text-base text-chocolate/75">
        <dt>Produtos</dt>
        <dd>{formatarPreco(subtotalCentavos / 100)}</dd>
      </div>
      <div className="flex justify-between text-base text-chocolate/75">
        <dt>Entrega</dt>
        <dd>{formatarPreco(taxaCentavos / 100)}</dd>
      </div>
      <div className="flex items-baseline justify-between pt-1">
        <dt className="text-xl font-bold text-chocolate">Total</dt>
        <dd className="text-3xl font-extrabold text-chocolate">{formatarPreco((subtotalCentavos + taxaCentavos) / 100)}</dd>
      </div>
    </dl>
  )
}

function LinhaCarrinho({
  chave,
  produto: p,
  variacao,
  preco,
  quantidade,
  onAlterar,
}: ItemCarrinho & { onAlterar: (id: string, delta: number) => void }) {
  return (
    <li className="flex gap-4 py-4">
      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl ring-1 ring-chocolate/10">
        {variacao?.foto ?? p.fotos?.[0] ? (
          <img src={`${base}produtos/${variacao?.foto ?? p.fotos![0]}`} alt="" className="h-full w-full bg-creme object-cover" />
        ) : (
          <span className="flex h-full items-center justify-center text-4xl" aria-hidden>{p.emoji ?? '📦'}</span>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-bold leading-snug text-chocolate">{p.nome}</p>
        {variacao && <p className="mt-1 text-base font-semibold text-chocolate/85">Opção: {variacao.nome}</p>}
        <p className="mt-1 text-base text-chocolate/75">{formatarPreco(preco)} cada</p>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <SeletorQuantidade
            quantidade={quantidade}
            nome={`${p.nome}${variacao ? `, ${variacao.nome}` : ''}`}
            onAlterar={(delta) => onAlterar(chave, delta)}
            minimo={0}
          />
          <p className="text-xl font-extrabold text-chocolate">{formatarPreco((centavos(preco) * quantidade) / 100)}</p>
        </div>
        <button
          type="button"
          onClick={() => onAlterar(chave, -quantidade)}
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
      <label htmlFor={id} className="block font-bold text-chocolate">
        {label} {opcional && <span className="font-normal text-chocolate/70">(opcional)</span>}
      </label>
      <input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={erro || undefined}
        className={`mt-2 min-h-14 w-full rounded-2xl border-2 px-4 text-lg focus:outline-none focus:ring-4 ${
          erro ? 'border-red-500 focus:ring-red-100' : 'border-chocolate/20 focus:border-vinho focus:ring-vinho/15'
        } ${className}`}
        {...props}
      />
      {erro && <p className="mt-1 text-base font-semibold text-red-700">Preencha este campo.</p>}
    </div>
  )
}
