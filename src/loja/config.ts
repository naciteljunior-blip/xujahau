// ✏️ Edite este arquivo para personalizar a sua loja.

export type Produto = {
  id: string
  nome: string
  descricao: string
  categoria: string
  /** Preço em reais. Deixe `undefined` para mostrar "Sob consulta". */
  preco?: number
  /** Nome do arquivo dentro de `public/produtos/` (ex.: 'vaso.jpg'). Sem foto, usa o emoji. */
  imagem?: string
  emoji: string
  /** Links deste produto em outros sites (opcional). */
  links?: { nome: string; url: string }[]
}

export type Marketplace = { nome: string; url: string; cor: string }

export const loja = {
  nome: 'Think Lab',
  slogan: 'Peças impressas em 3D com carinho, do jeitinho que você precisa.',
  /** Número com código do país e DDD, só números. */
  whatsapp: '5511916133318',
  cidade: 'Enviamos para todo o Brasil',
  instagram: '', // ex.: 'https://instagram.com/thinklab'
  /** Vazio = a seção de marketplaces não aparece. Ex.: { nome: 'Shopee', url: '...', cor: 'bg-orange-500 hover:bg-orange-600' } */
  marketplaces: [] as Marketplace[],
}

/*
  Enquanto a lista estiver vazia, a página mostra um aviso convidando o cliente a chamar no WhatsApp.
  Exemplo de produto:
  {
    id: 'vaso-geometrico',
    nome: 'Vaso Geométrico',
    descricao: 'Ideal para suculentas e pequenas plantas. Várias cores.',
    categoria: 'Decoração',
    preco: 34.9,          // sem preço = "Sob consulta"
    imagem: 'vaso.jpg',   // arquivo em public/produtos/ (opcional)
    emoji: '🪴',
  },
*/
export const produtos: Produto[] = []
