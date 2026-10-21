import { loja, type Produto } from './config'

/** Tema de Natal: liga e desliga em config.ts (`temaNatal`). */
export const temaNatal = loja.temaNatal

export const ehNatal = (p: Produto) => /natal|noel|neve/i.test(p.nome)

/** Dias até 25/12 deste ano (0 no próprio dia; depois do Natal, null). */
export function diasParaNatal(hoje = new Date()) {
  const natal = new Date(hoje.getFullYear(), 11, 25)
  const inicio = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate())
  const dias = Math.round((natal.getTime() - inicio.getTime()) / 86_400_000)
  return dias >= 0 ? dias : null
}
