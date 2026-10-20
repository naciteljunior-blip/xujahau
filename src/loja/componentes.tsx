import { formatarPreco, linkWhatsApp, mensagemGeral, QTD_MAXIMA } from './util'

/**
 * Logo "plissê lab": "plissê" listrado (as camadas) e "lab" menor em magenta.
 * As listras seguem o guia: faixa ≈ 6% do tamanho da fonte e espaço ≈ 2,5%; abaixo de 28px o logo fica sólido.
 */
export function Logomarca({ tamanho = 32, claro = false, className = '' }: { tamanho?: number; claro?: boolean; className?: string }) {
  const cor = claro ? '#F3E3D3' : '#7A1030'
  const faixa = Math.max(2, Math.round(tamanho * 0.06))
  const espaco = Math.max(1, Math.round(tamanho * 0.025))
  const listras = tamanho >= 28
  return (
    <span
      className={`whitespace-nowrap font-marca font-extrabold ${className}`}
      style={{
        fontSize: tamanho,
        lineHeight: 0.9,
        letterSpacing: '-0.04em',
        ...(listras
          ? {
              background: `repeating-linear-gradient(to bottom, ${cor} 0 ${faixa}px, transparent ${faixa}px ${faixa + espaco}px)`,
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }
          : { color: cor }),
      }}
    >
      plissê
      <span className="text-magenta" style={{ WebkitTextFillColor: '#D4336C', fontSize: '0.46em', letterSpacing: '-0.02em', marginLeft: '0.12em' }}>
        {' '}
        lab
      </span>
    </span>
  )
}

/** Monograma "pl." listrado em pêssego sobre vinho, com o ponto em magenta. */
export function Monograma({ tamanho = 40, className = '' }: { tamanho?: number; className?: string }) {
  const fonte = Math.round(tamanho * 0.47)
  const faixa = Math.max(2, Math.round(fonte * 0.07))
  return (
    <span
      aria-hidden
      className={`flex shrink-0 items-center justify-center rounded-full bg-vinho ${className}`}
      style={{ width: tamanho, height: tamanho }}
    >
      <span
        className="font-marca font-extrabold"
        style={{
          fontSize: fonte,
          lineHeight: 1,
          letterSpacing: '-0.06em',
          background: `repeating-linear-gradient(to bottom, #F3E3D3 0 ${faixa}px, transparent ${faixa}px ${faixa + 1}px)`,
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
        }}
      >
        pl<b style={{ WebkitTextFillColor: '#D4336C', color: '#D4336C' }}>.</b>
      </span>
    </span>
  )
}

/** Botões − e + em volta da quantidade. `nome` completa o texto lido pelo leitor de tela. */
export function SeletorQuantidade({
  quantidade,
  nome,
  onAlterar,
  minimo = 1,
  maximo = QTD_MAXIMA,
  tamanho = 'grande',
  className = '',
}: {
  quantidade: number
  nome: string
  onAlterar: (delta: number) => void
  minimo?: number
  maximo?: number
  tamanho?: 'grande' | 'pequeno'
  className?: string
}) {
  const botao = `${tamanho === 'grande' ? 'h-12 w-12 text-2xl' : 'h-11 w-11 text-xl'} font-bold text-chocolate/85 hover:bg-pessego focus-visible:outline focus-visible:outline-4 focus-visible:outline-magenta disabled:opacity-40`
  return (
    <div className={`flex items-center justify-between rounded-full bg-creme ring-2 ring-chocolate/10 ${className}`}>
      <button
        type="button"
        onClick={() => onAlterar(-1)}
        disabled={quantidade <= minimo}
        aria-label={`Diminuir quantidade de ${nome}`}
        className={`${botao} rounded-l-full`}
      >
        −
      </button>
      <span className="min-w-10 text-center text-xl font-extrabold" aria-live="polite" aria-label={`Quantidade: ${quantidade}`}>
        {quantidade}
      </span>
      <button
        type="button"
        onClick={() => onAlterar(1)}
        disabled={quantidade >= maximo}
        aria-label={`Aumentar quantidade de ${nome}`}
        className={`${botao} rounded-r-full`}
      >
        +
      </button>
    </div>
  )
}

export function BotaoWhatsApp({
  href,
  children,
  className = '',
  tamanho = 'grande',
  onClick,
}: {
  href: string
  children: React.ReactNode
  className?: string
  tamanho?: 'grande' | 'pequeno'
  onClick?: (e: React.MouseEvent) => void
}) {
  const tam = tamanho === 'grande' ? 'min-h-14 px-5 text-lg gap-2.5' : 'min-h-11 px-4 text-base gap-2'
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className={`inline-flex items-center justify-center rounded-full bg-[#25D366] text-center leading-tight font-bold text-chocolate shadow-sm transition hover:bg-[#1ebe5a] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-vinho ${tam} ${className}`}
    >
      <IconeWhatsApp className={`shrink-0 ${tamanho === 'grande' ? 'h-7 w-7' : 'h-5 w-5'}`} />
      <span>{children}</span>
    </a>
  )
}

export function IconeWhatsApp({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

export function IconeCarrinho({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
      <circle cx="9" cy="20" r="1.5" />
      <circle cx="18" cy="20" r="1.5" />
      <path d="M2.5 3h2.6l2.4 11.2a1.5 1.5 0 0 0 1.5 1.2h8.6a1.5 1.5 0 0 0 1.5-1.1L21 7H6" />
    </svg>
  )
}

export function BarraCarrinho({ totalItens, totalCentavos, onAbrir }: { totalItens: number; totalCentavos: number; onAbrir: () => void }) {
  return totalItens > 0 ? (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-chocolate/10 bg-creme/95 p-3 backdrop-blur">
      <button
        type="button"
        onClick={onAbrir}
        className="mx-auto flex min-h-14 w-full max-w-xl items-center justify-between gap-3 rounded-full bg-vinho px-5 text-lg font-bold text-pessego shadow-lg transition hover:bg-vinho-escuro focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-magenta"
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
      href={linkWhatsApp(mensagemGeral)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar no WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-pessego shadow-xl ring-4 ring-creme transition hover:scale-105 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-vinho"
    >
      <IconeWhatsApp className="h-9 w-9" />
    </a>
  )
}
