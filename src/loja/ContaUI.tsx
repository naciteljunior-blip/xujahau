import { useEffect, useRef, useState } from 'react'
import { Campo } from './componentes'
import { loja } from './config'
import { atualizarNome, criarConta, entrar, entrarComGoogle, listarPedidos, mensagemDeErro, recuperarSenha, sair, useConta, type Pedido, type Usuario } from './conta'
import { digitosCep, enderecoEmTexto, formatarCep, useEntrega, type Entrega } from './entrega'
import { formatarPreco, linkWhatsApp } from './util'

export function Avatar({ usuario, className = 'h-8 w-8' }: { usuario: Usuario; className?: string }) {
  return usuario.foto ? (
    <img src={usuario.foto} alt="" referrerPolicy="no-referrer" className={`${className} rounded-full ring-2 ring-pessego`} />
  ) : (
    <span className={`${className} flex shrink-0 items-center justify-center rounded-full bg-vinho text-sm font-extrabold text-pessego`} aria-hidden>
      {usuario.nome.charAt(0).toUpperCase()}
    </span>
  )
}

function IconeGoogle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden className={className}>
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
    </svg>
  )
}

/** Janela modal da loja (fecha no ✕, no Esc ou tocando fora). */
function Janela({ titulo, onFechar, children }: { titulo: string; onFechar: () => void; children: React.ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    if (!ref.current?.open) ref.current?.showModal()
  }, [])
  const fechar = () => ref.current?.close()
  return (
    <dialog
      ref={ref}
      aria-label={titulo}
      onClose={onFechar}
      onClick={(e) => e.target === e.currentTarget && fechar()}
      className="m-auto max-h-[92dvh] w-[calc(100%-2rem)] max-w-lg rounded-3xl bg-creme p-0 font-marca text-lg text-chocolate shadow-2xl backdrop:bg-chocolate/60"
    >
      <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-chocolate/10 bg-creme px-6 py-3">
        <h2 className="whitespace-nowrap text-2xl font-extrabold tracking-[-0.03em] sm:text-3xl">{titulo}</h2>
        <button
          type="button"
          onClick={fechar}
          className="min-h-12 shrink-0 whitespace-nowrap rounded-full bg-pessego px-4 font-semibold text-chocolate/85 hover:bg-pessego-escuro focus-visible:outline focus-visible:outline-4 focus-visible:outline-magenta sm:px-5"
        >
          ✕ Fechar
        </button>
      </div>
      <div className="px-6 pb-6 pt-4">{children}</div>
    </dialog>
  )
}

const botaoPrimario =
  'inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-vinho px-5 text-lg font-semibold text-pessego transition hover:bg-vinho-escuro disabled:opacity-60 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-magenta'

/** Login, criação de conta e recuperação de senha. Fecha sozinho quando o cliente entra. */
export function DialogoLogin({ modo: modoInicial = 'entrar', onFechar }: { modo?: 'entrar' | 'criar'; onFechar: () => void }) {
  const [modo, setModo] = useState<'entrar' | 'criar' | 'senha'>(modoInicial)
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [aviso, setAviso] = useState('')
  const [enviando, setEnviando] = useState(false)
  const { usuario } = useConta()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (usuario) ref.current?.closest('dialog')?.close()
  }, [usuario])

  const trocar = (novo: typeof modo) => {
    setModo(novo)
    setErro('')
    setAviso('')
  }

  async function enviar(e: React.FormEvent) {
    e.preventDefault()
    setErro('')
    setAviso('')
    if (modo === 'criar' && !nome.trim()) return setErro('Digite o seu nome.')
    if (!email.trim()) return setErro('Digite o seu e-mail.')
    setEnviando(true)
    try {
      if (modo === 'entrar') await entrar(email, senha)
      else if (modo === 'criar') await criarConta(nome, email, senha)
      else {
        await recuperarSenha(email)
        setAviso('Pronto! Enviamos um link para criar uma senha nova. Confira o seu e-mail (e a caixa de spam).')
      }
    } catch (falha) {
      setErro(mensagemDeErro(falha))
    } finally {
      setEnviando(false)
    }
  }

  async function google() {
    setErro('')
    try {
      await entrarComGoogle()
    } catch (falha) {
      setErro(mensagemDeErro(falha))
    }
  }

  const titulo = modo === 'criar' ? 'criar conta.' : modo === 'senha' ? 'nova senha.' : 'entrar.'

  return (
    <Janela titulo={titulo} onFechar={onFechar}>
      <div ref={ref}>
        {modo !== 'senha' && (
          <div role="tablist" aria-label="Entrar ou criar conta" className="mb-5 grid grid-cols-2 gap-1 rounded-full bg-pessego p-1">
            {(['entrar', 'criar'] as const).map((m) => (
              <button
                key={m}
                type="button"
                role="tab"
                aria-selected={modo === m}
                onClick={() => trocar(m)}
                className={`min-h-11 rounded-full font-semibold transition ${modo === m ? 'bg-vinho text-pessego' : 'text-chocolate/80 hover:text-chocolate'}`}
              >
                {m === 'entrar' ? 'Entrar' : 'Criar conta'}
              </button>
            ))}
          </div>
        )}

        <form onSubmit={enviar} className="space-y-4" noValidate>
          {modo === 'senha' && (
            <p className="text-base text-chocolate/80">Digite o e-mail da sua conta. Vamos enviar um link para você criar uma senha nova.</p>
          )}
          {modo === 'criar' && <Campo id="conta-nome" label="Seu nome" autoComplete="name" value={nome} onChange={setNome} />}
          <Campo id="conta-email" label="E-mail" type="email" autoComplete="email" inputMode="email" value={email} onChange={setEmail} />
          {modo !== 'senha' && (
            <div>
              <Campo
                id="conta-senha"
                label="Senha"
                type="password"
                autoComplete={modo === 'criar' ? 'new-password' : 'current-password'}
                value={senha}
                onChange={setSenha}
              />
              {modo === 'criar' && <p className="mt-1 text-base text-chocolate/70">Pelo menos 6 caracteres.</p>}
              {modo === 'entrar' && (
                <button type="button" onClick={() => trocar('senha')} className="mt-2 min-h-10 text-base font-semibold text-vinho underline underline-offset-4">
                  Esqueci minha senha
                </button>
              )}
            </div>
          )}

          {erro && (
            <p role="alert" className="rounded-2xl bg-red-50 px-4 py-3 text-base font-semibold text-red-800">
              {erro}
            </p>
          )}
          {aviso && (
            <p role="status" className="rounded-2xl bg-salvia/20 px-4 py-3 text-base font-semibold text-chocolate">
              {aviso}
            </p>
          )}

          <button type="submit" disabled={enviando} className={botaoPrimario}>
            {enviando ? 'Aguarde…' : modo === 'entrar' ? 'Entrar' : modo === 'criar' ? 'Criar minha conta' : 'Enviar link'}
          </button>
          {modo === 'senha' && (
            <button type="button" onClick={() => trocar('entrar')} className="min-h-11 w-full font-semibold text-vinho underline underline-offset-4">
              ← Voltar para entrar
            </button>
          )}
        </form>

        {modo !== 'senha' && loja.loginComGoogle && (
          <>
            <p className="my-4 flex items-center gap-3 text-base text-chocolate/60">
              <span className="h-px flex-1 bg-chocolate/15" /> ou <span className="h-px flex-1 bg-chocolate/15" />
            </p>
            <button
              type="button"
              onClick={google}
              className="inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-full border-[1.5px] border-chocolate/25 bg-creme px-5 font-semibold text-chocolate hover:bg-pessego"
            >
              <IconeGoogle className="h-6 w-6" /> Continuar com o Google
            </button>
          </>
        )}
      </div>
    </Janela>
  )
}

const formatarData = (iso: string) =>
  new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })

/** "minha conta.": pedidos feitos e dados do cliente. */
export function MinhaConta({
  aba: abaInicial = 'pedidos',
  onFechar,
  onPedirDeNovo,
}: {
  aba?: 'pedidos' | 'dados'
  onFechar: () => void
  onPedirDeNovo: (pedido: Pedido) => void
}) {
  const [aba, setAba] = useState(abaInicial)
  const { usuario } = useConta()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!usuario) ref.current?.closest('dialog')?.close()
  }, [usuario])

  if (!usuario) return null

  return (
    <Janela titulo="minha conta." onFechar={onFechar}>
      <div ref={ref}>
        <div className="mb-5 flex items-center gap-3">
          <Avatar usuario={usuario} className="h-12 w-12" />
          <div className="min-w-0">
            <p className="truncate font-semibold">{usuario.nome}</p>
            <p className="truncate text-base text-chocolate/75">{usuario.email}</p>
          </div>
        </div>
        <div role="tablist" aria-label="Minha conta" className="mb-5 grid grid-cols-2 gap-1 rounded-full bg-pessego p-1">
          {(['pedidos', 'dados'] as const).map((a) => (
            <button
              key={a}
              type="button"
              role="tab"
              aria-selected={aba === a}
              onClick={() => setAba(a)}
              className={`min-h-11 rounded-full font-semibold transition ${aba === a ? 'bg-vinho text-pessego' : 'text-chocolate/80 hover:text-chocolate'}`}
            >
              {a === 'pedidos' ? 'Meus pedidos' : 'Meus dados'}
            </button>
          ))}
        </div>
        {aba === 'pedidos' ? (
          <ListaPedidos
            onPedirDeNovo={(p) => {
              ref.current?.closest('dialog')?.close()
              onPedirDeNovo(p)
            }}
          />
        ) : (
          <MeusDados usuario={usuario} />
        )}
        <button
          type="button"
          onClick={() => sair()}
          className="mt-6 min-h-12 w-full rounded-full border-[1.5px] border-vinho font-semibold text-vinho hover:bg-vinho hover:text-pessego"
        >
          Sair da conta
        </button>
      </div>
    </Janela>
  )
}

function ListaPedidos({ onPedirDeNovo }: { onPedirDeNovo: (p: Pedido) => void }) {
  const [pedidos, setPedidos] = useState<Pedido[] | null>(null)
  const [erro, setErro] = useState(false)

  useEffect(() => {
    // Sem internet o Firebase fica tentando; depois de 15 s mostramos o aviso.
    const limite = setTimeout(() => setErro(true), 15000)
    listarPedidos()
      .then(setPedidos)
      .catch(() => setErro(true))
      .finally(() => clearTimeout(limite))
    return () => clearTimeout(limite)
  }, [])

  if (erro && !pedidos) return <p className="rounded-2xl bg-red-50 px-4 py-3 text-base font-semibold text-red-800">Não conseguimos carregar os seus pedidos agora. Tente de novo mais tarde.</p>
  if (!pedidos) return <p className="py-6 text-center text-chocolate/70" role="status">Carregando seus pedidos…</p>
  if (pedidos.length === 0)
    return (
      <div className="rounded-2xl bg-pessego/60 p-5 text-center">
        <p className="font-semibold">Você ainda não fez nenhum pedido.</p>
        <p className="mt-1 text-base text-chocolate/75">Quando enviar um pedido pelo WhatsApp com a conta aberta, ele aparece aqui.</p>
      </div>
    )

  return (
    <ul className="space-y-3">
      {pedidos.map((p) => (
        <li key={p.id ?? p.data} className="rounded-2xl bg-pessego/60 p-4">
          <div className="flex items-baseline justify-between gap-3">
            <p className="text-base font-semibold">{formatarData(p.data)}</p>
            <p className="font-extrabold text-magenta">{formatarPreco(p.total)}</p>
          </div>
          <ul className="mt-2 space-y-0.5 text-base text-chocolate/85">
            {p.itens.map((i, n) => (
              <li key={n}>
                {i.quantidade}x {i.nome}
                {i.variacao ? ` (${i.variacao})` : ''}
              </li>
            ))}
          </ul>
          {p.pagamento && <p className="mt-2 text-sm text-chocolate/70">Pagamento: {p.pagamento} · Enviado pelo WhatsApp</p>}
          <div className="mt-3 grid grid-cols-2 gap-2">
            <button type="button" onClick={() => onPedirDeNovo(p)} className="min-h-11 rounded-full bg-vinho px-3 text-base font-semibold text-pessego hover:bg-vinho-escuro">
              Pedir de novo
            </button>
            <a
              href={linkWhatsApp(p.mensagem)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center rounded-full border-[1.5px] border-vinho px-3 text-base font-semibold text-vinho hover:bg-vinho hover:text-pessego"
            >
              Reenviar no WhatsApp
            </a>
          </div>
        </li>
      ))}
    </ul>
  )
}

function MeusDados({ usuario }: { usuario: Usuario }) {
  const [entrega, setEntrega] = useEntrega()
  const [nome, setNome] = useState(usuario.nome)
  const [salvo, setSalvo] = useState(false)
  const alterar = (campo: keyof Entrega, valor: string) => {
    setSalvo(false)
    setEntrega((e) => ({ ...e, [campo]: valor }))
  }

  return (
    <form
      className="space-y-4"
      onSubmit={async (e) => {
        e.preventDefault()
        if (nome.trim() && nome.trim() !== usuario.nome) await atualizarNome(nome).catch(() => {})
        if (nome.trim()) setEntrega((d) => ({ ...d, nome: nome.trim() }))
        setSalvo(true)
      }}
    >
      <Campo id="dados-nome" label="Nome" autoComplete="name" value={nome} onChange={(v) => (setSalvo(false), setNome(v))} />
      <div>
        <p className="block font-bold text-chocolate">E-mail</p>
        <p className="mt-2 min-h-14 rounded-2xl bg-pessego/60 px-4 py-3.5 text-chocolate/80">{usuario.email}</p>
      </div>
      <fieldset className="space-y-4">
        <legend className="text-xl font-extrabold">Endereço de entrega</legend>
        {enderecoEmTexto(entrega) ? null : <p className="text-base text-chocolate/75">Preencha uma vez e ele já vem pronto nas próximas compras.</p>}
        <Campo
          id="dados-cep"
          label="CEP"
          inputMode="numeric"
          autoComplete="postal-code"
          placeholder="00000-000"
          value={entrega.cep}
          onChange={(v) => alterar('cep', formatarCep(v))}
          className="max-w-[12rem]"
        />
        <Campo id="dados-rua" label="Rua" autoComplete="address-line1" value={entrega.rua} onChange={(v) => alterar('rua', v)} />
        <div className="grid grid-cols-2 gap-3">
          <Campo id="dados-numero" label="Número" value={entrega.numero} onChange={(v) => alterar('numero', v)} />
          <Campo id="dados-complemento" label="Complemento" opcional autoComplete="address-line2" value={entrega.complemento} onChange={(v) => alterar('complemento', v)} />
        </div>
        <Campo id="dados-bairro" label="Bairro" value={entrega.bairro} onChange={(v) => alterar('bairro', v)} />
        <div className="grid grid-cols-[1fr_6rem] gap-3">
          <Campo id="dados-cidade" label="Cidade" autoComplete="address-level2" value={entrega.cidade} onChange={(v) => alterar('cidade', v)} />
          <Campo id="dados-uf" label="UF" maxLength={2} autoComplete="address-level1" value={entrega.uf} onChange={(v) => alterar('uf', v.toUpperCase())} />
        </div>
        {digitosCep(entrega.cep).length > 0 && digitosCep(entrega.cep).length < 8 && <p className="text-base text-chocolate/70">O CEP tem 8 números.</p>}
      </fieldset>
      <button type="submit" className={botaoPrimario}>
        Salvar
      </button>
      <p role="status" className="min-h-6 text-center text-base font-semibold text-vinho">
        {salvo && '✓ Dados salvos. O endereço também fica lembrado no carrinho.'}
      </p>
    </form>
  )
}
