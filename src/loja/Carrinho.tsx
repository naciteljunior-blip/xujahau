import { useEffect, useRef, useState } from 'react'
import { BotaoWhatsApp, Campo, IconeCarrinho, SeletorQuantidade } from './componentes'
import { loja } from './config'
import { digitosCep, enderecoEmTexto, entregaVazia, formatarCep, useEntrega, type Entrega } from './entrega'
import { Avatar } from './ContaUI'
import { contasAtivas, salvarPedido, sair, useConta } from './conta'
import { base, centavos, formatarPreco, linkWhatsApp, type ItemCarrinho } from './util'

type StatusCep = 'ocioso' | 'buscando' | 'encontrado' | 'nao-encontrado' | 'erro'

const taxaCentavos = centavos(loja.taxaEntrega)
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

function mensagemPedido(itens: ItemCarrinho[], subtotalCentavos: number, e: Entrega, email?: string) {
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

*Nome:* ${e.nome.trim()}${email ? `\n*E-mail:* ${email}` : ''}
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
  onEntrar,
}: {
  dialogRef: React.RefObject<HTMLDialogElement>
  itens: ItemCarrinho[]
  subtotalCentavos: number
  onAlterar: (id: string, delta: number) => void
  onEsvaziar: () => void
  /** Abre a janela de login / criar conta. */
  onEntrar: () => void
}) {
  const [etapa, setEtapa] = useState<'itens' | 'dados'>('itens')
  const [dados, setEntrega] = useEntrega()
  const [tentouEnviar, setTentouEnviar] = useState(false)
  const [statusCep, setStatusCep] = useState<StatusCep>('ocioso')
  const { usuario } = useConta()
  const buscaAtual = useRef(0)
  const corpoRef = useRef<HTMLDivElement>(null)

  const faltando = camposFaltando(dados)
  const erroDe = (campo: keyof Entrega) => tentouEnviar && faltando.some(([c]) => c === campo)
  const totalCentavos = subtotalCentavos + taxaCentavos

  const fechar = () => dialogRef.current?.close()
  const irPara = (nova: 'itens' | 'dados') => {
    setEtapa(nova)
    corpoRef.current?.scrollTo({ top: 0 })
  }
  const alterar = (campo: keyof Entrega, valor: string) => setEntrega((e) => ({ ...entregaVazia, ...e, [campo]: valor }))

  // Ao entrar na conta, o nome vem preenchido (sem apagar um nome que o cliente já tenha digitado).
  useEffect(() => {
    if (usuario) setEntrega((e) => (e?.nome?.trim() ? e : { ...entregaVazia, ...e, nome: usuario.nome }))
  }, [usuario, setEntrega])

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
    if (faltando.length === 0) {
      if (usuario) {
        // Guarda no histórico da conta; se falhar, o pedido pelo WhatsApp segue normalmente.
        salvarPedido({
          data: new Date().toISOString(),
          itens: itens.map((i) => ({
            produtoId: i.produto.id,
            nome: i.produto.nome,
            ...(i.variacao ? { variacao: i.variacao.nome } : {}),
            quantidade: i.quantidade,
            preco: i.preco,
          })),
          subtotal: subtotalCentavos / 100,
          taxaEntrega: taxaCentavos / 100,
          total: (subtotalCentavos + taxaCentavos) / 100,
          pagamento: dados.pagamento,
          endereco: enderecoEmTexto(dados),
          mensagem: mensagemPedido(itens, subtotalCentavos, dados, usuario.email),
        }).catch(() => {})
      }
      return
    }
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

              {contasAtivas &&
                (usuario ? (
                  <div className="flex items-center gap-3 rounded-2xl bg-pessego/60 p-3">
                    <Avatar usuario={usuario} className="h-10 w-10 shrink-0" />
                    <p className="min-w-0 flex-1 text-base leading-snug">
                      Comprando como <strong className="font-semibold">{usuario.nome}</strong>
                      <span className="block truncate text-chocolate/75">{usuario.email}</span>
                    </p>
                    <button type="button" onClick={() => sair()} className="min-h-11 shrink-0 px-2 text-base font-semibold text-vinho underline underline-offset-4">
                      Sair
                    </button>
                  </div>
                ) : (
                  <div className="rounded-2xl bg-pessego/60 p-4">
                    <p className="font-semibold text-chocolate">Como você quer comprar?</p>
                    <p className="mt-1 text-base text-chocolate/75">Com uma conta, seus dados já vêm preenchidos e você acompanha seus pedidos.</p>
                    <button
                      type="button"
                      onClick={onEntrar}
                      className="mt-3 inline-flex min-h-12 items-center justify-center rounded-full bg-vinho px-6 font-semibold text-pessego hover:bg-vinho-escuro"
                    >
                      Login / Criar conta
                    </button>
                    <p className="mt-3 text-base text-chocolate/75">
                      Ou <strong className="font-semibold text-chocolate">continue sem login</strong>: é só preencher os dados abaixo.
                    </p>
                  </div>
                ))}

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
              <BotaoWhatsApp href={linkWhatsApp(mensagemPedido(itens, subtotalCentavos, dados, usuario?.email))} onClick={aoEnviar} className="mt-3 w-full">
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
