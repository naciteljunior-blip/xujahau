import { loja, type Produto } from './config'

export type ItemCarrinho = { produto: Produto; quantidade: number }

export const base = import.meta.env.BASE_URL
export const QTD_MAXIMA = 99

export const centavos = (valor: number) => Math.round(valor * 100)

export const formatarPreco = (valor: number) =>
  valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

export function linkWhatsApp(mensagem: string) {
  return `https://wa.me/${loja.whatsapp}?text=${encodeURIComponent(mensagem)}`
}
