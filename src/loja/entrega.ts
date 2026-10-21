import { useLocalStorage } from '../hooks/useLocalStorage'

/** Dados de entrega do cliente, lembrados no aparelho e compartilhados entre o carrinho e "minha conta". */
export type Entrega = {
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

export const entregaVazia: Entrega = {
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

export const digitosCep = (cep: string) => cep.replace(/\D/g, '')

export function formatarCep(valor: string) {
  const d = digitosCep(valor).slice(0, 8)
  return d.length > 5 ? `${d.slice(0, 5)}-${d.slice(5)}` : d
}

export function useEntrega() {
  const [entrega, setEntrega] = useLocalStorage<Entrega>('thinklab-entrega', entregaVazia)
  return [{ ...entregaVazia, ...entrega }, setEntrega] as const
}

/** Endereço em uma linha, para mostrar ou guardar no pedido. */
export function enderecoEmTexto(e: Entrega) {
  if (!e.rua.trim()) return ''
  const complemento = e.complemento.trim() ? ` - ${e.complemento.trim()}` : ''
  return `${e.rua.trim()}, ${e.numero.trim()}${complemento} · ${e.bairro.trim()} - ${e.cidade.trim()}/${e.uf.trim().toUpperCase()} · CEP ${formatarCep(e.cep)}`
}
