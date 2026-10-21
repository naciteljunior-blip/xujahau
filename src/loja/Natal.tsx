/** Enfeites animados do tema de Natal. Quem pede menos movimento no aparelho vê tudo parado. */

// Posições fixas (não aleatórias) para a neve não "pular" a cada renderização.
const flocos = Array.from({ length: 28 }, (_, i) => ({
  esquerda: (i * 37) % 100,
  tamanho: 3 + ((i * 7) % 5),
  duracao: 7 + ((i * 13) % 8),
  atraso: -((i * 11) % 14),
  deriva: ((i % 2 ? 1 : -1) * (10 + ((i * 5) % 25))),
}))

export function Neve() {
  return (
    <div aria-hidden className="natal-anim pointer-events-none absolute inset-0 overflow-hidden">
      {flocos.map((f, i) => (
        <span
          key={i}
          className="natal-floco absolute -top-3 rounded-full bg-pessego"
          style={
            {
              left: `${f.esquerda}%`,
              width: f.tamanho,
              height: f.tamanho,
              opacity: 0.35 + (f.tamanho - 3) * 0.12,
              animationDuration: `${f.duracao}s`,
              animationDelay: `${f.atraso}s`,
              '--deriva': `${f.deriva}px`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  )
}

const cores = ['#D4336C', '#F3E3D3', '#7FA89A']

/** Varal de luzinhas piscando, preso no alto do banner. */
export function Luzinhas() {
  const n = 18
  return (
    <div aria-hidden className="natal-anim pointer-events-none absolute inset-x-0 top-0 h-12">
      <svg viewBox="0 0 1000 40" preserveAspectRatio="none" className="absolute inset-x-0 top-0 h-8 w-full">
        <path d="M0 6 Q 27.8 30 55.6 6 T 111 6 T 167 6 T 222 6 T 278 6 T 333 6 T 389 6 T 444 6 T 500 6 T 556 6 T 611 6 T 667 6 T 722 6 T 778 6 T 833 6 T 889 6 T 944 6 T 1000 6" fill="none" stroke="#2B1418" strokeOpacity="0.55" strokeWidth="2" />
      </svg>
      {Array.from({ length: n }, (_, i) => (
        <span
          key={i}
          className="natal-luz absolute h-3.5 w-2.5 rounded-b-full rounded-t-[40%]"
          style={{
            left: `calc(${((i + 0.5) * 100) / n}% - 5px)`,
            top: 18,
            background: cores[i % 3],
            color: cores[i % 3],
            animationDelay: `${(i % 3) * 0.5}s`,
          }}
        />
      ))}
    </div>
  )
}

/** Estrelinhas de 4 pontas cintilando. Posições em % dentro do elemento pai. */
export function Brilhos({ pontos }: { pontos: [number, number, number][] }) {
  return (
    <div aria-hidden className="natal-anim pointer-events-none absolute inset-0">
      {pontos.map(([x, y, tamanho], i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className="natal-brilho absolute text-pessego"
          style={{ left: `${x}%`, top: `${y}%`, width: tamanho, height: tamanho, animationDelay: `${(i * 0.37) % 2}s` }}
        >
          <path fill="currentColor" d="M12 0c.6 6.2 5.8 11.4 12 12-6.2.6-11.4 5.8-12 12-.6-6.2-5.8-11.4-12-12C6.2 11.4 11.4 6.2 12 0z" />
        </svg>
      ))}
    </div>
  )
}

/** Estourinho de brilhos em volta do botão quando o produto entra no carrinho. */
export function EstouroBrilhos() {
  return (
    <span aria-hidden className="natal-anim pointer-events-none absolute inset-0">
      {[0, 60, 120, 180, 240, 300].map((angulo, i) => (
        <span key={angulo} className="natal-estouro absolute left-1/2 top-1/2 text-magenta" style={{ '--angulo': `${angulo}deg`, animationDelay: `${i * 0.02}s` } as React.CSSProperties}>
          ✦
        </span>
      ))}
    </span>
  )
}
