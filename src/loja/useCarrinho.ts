import { useRef } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { produtos } from './config'
import { centavos, chaveCarrinho, QTD_MAXIMA, type ItemCarrinho } from './util'

export function useCarrinho() {
  const [carrinho, setCarrinho] = useLocalStorage<Record<string, number>>('thinklab-carrinho', {})
  const dialogRef = useRef<HTMLDialogElement>(null)

  const itens: ItemCarrinho[] = produtos
    .flatMap((p) =>
      p.variacoes
        ? p.variacoes.map((v) => ({ chave: chaveCarrinho(p, v), produto: p, variacao: v, preco: v.preco }))
        : p.preco
          ? [{ chave: chaveCarrinho(p), produto: p, preco: p.preco }]
          : [],
    )
    .filter((i) => Number.isInteger(carrinho[i.chave]) && carrinho[i.chave] > 0)
    .map((i) => ({ ...i, quantidade: Math.min(carrinho[i.chave], QTD_MAXIMA) }))

  const alterarQuantidade = (chave: string, delta: number) =>
    setCarrinho((atual) => {
      const nova = Math.min((Number.isInteger(atual[chave]) ? atual[chave] : 0) + delta, QTD_MAXIMA)
      const copia = { ...atual }
      if (nova > 0) copia[chave] = nova
      else delete copia[chave]
      return copia
    })

  return {
    dialogRef,
    itens,
    totalItens: itens.reduce((soma, i) => soma + i.quantidade, 0),
    totalCentavos: itens.reduce((soma, i) => soma + centavos(i.preco) * i.quantidade, 0),
    alterarQuantidade,
    esvaziar: () => setCarrinho({}),
    abrir: () => dialogRef.current?.showModal(),
    noCarrinho: (id: string) => itens.filter((i) => i.produto.id === id).reduce((soma, i) => soma + i.quantidade, 0),
  }
}
