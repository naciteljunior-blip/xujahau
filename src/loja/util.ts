import { loja, type Produto, type Variacao } from './config'

export type ItemCarrinho = { chave: string; produto: Produto; variacao?: Variacao; preco: number; quantidade: number }

export const chaveCarrinho = (p: Produto, v?: Variacao) => (v ? `${p.id}::${v.nome}` : p.id)

export const base = import.meta.env.BASE_URL
export const QTD_MAXIMA = 99

export const centavos = (valor: number) => Math.round(valor * 100)

export const formatarPreco = (valor: number) =>
  valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

export function linkWhatsApp(mensagem: string) {
  return `https://wa.me/${loja.whatsapp}?text=${encodeURIComponent(mensagem)}`
}

export const mensagemGeral = `Olá! Vim pelo site da ${loja.nome} e gostaria de mais informações.`

export const percentualDesconto = (p: Produto) =>
  p.preco && p.precoOriginal && p.precoOriginal > p.preco
    ? Math.floor((1 - p.preco / p.precoOriginal) * 100 + 1e-9)
    : 0

export const mensagemProduto = (p: Produto) =>
  `Olá! Tenho interesse no produto *${p.nome}*${p.preco ? ` (${formatarPreco(p.preco)})` : ''}. Pode me passar mais informações?`

export const temPrecosDiferentes = (p: Produto) => new Set(p.variacoes?.map((v) => v.preco)).size > 1

export const comVariacao = (p: Produto, v: Variacao | null): Produto =>
  v ? { ...p, preco: v.preco, precoOriginal: v.precoOriginal ?? p.precoOriginal, variacoes: undefined } : p

export const duvidas: [string, string][] = [
  ['Como faço para pagar?', 'Você escolhe Pix, cartão de crédito ou boleto ao finalizar o pedido no carrinho. Depois confirmamos tudo pelo WhatsApp, com calma.'],
  ['Quanto tempo demora?', 'A maioria das peças fica pronta em poucos dias. O prazo exato informamos no atendimento.'],
  ['Vocês entregam na minha cidade?', `Enviamos para todo o Brasil. A entrega custa ${formatarPreco(loja.taxaEntrega)}, valor fixo.`],
  ['Posso escolher a cor ou personalizar?', 'Sim! Temos várias cores e fazemos peças com nome, logo ou do tamanho que você precisar.'],
]
