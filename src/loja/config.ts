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
  /** Links deste produto nos marketplaces (opcional). */
  links?: { nome: string; url: string }[]
}

export const loja = {
  nome: 'Minha Loja 3D',
  slogan: 'Peças impressas em 3D com carinho, do jeitinho que você precisa.',
  /** Número com código do país e DDD, só números. Ex.: 55 + 11 + 912345678 */
  whatsapp: '5511999999999',
  cidade: 'Enviamos para todo o Brasil',
  instagram: '', // ex.: 'https://instagram.com/minhaloja3d'
  marketplaces: [
    { nome: 'Shopee', url: 'https://shopee.com.br/', cor: 'bg-orange-500 hover:bg-orange-600' },
    { nome: 'Mercado Livre', url: 'https://www.mercadolivre.com.br/', cor: 'bg-yellow-400 hover:bg-yellow-500 !text-slate-900' },
    { nome: 'Elo7', url: 'https://www.elo7.com.br/', cor: 'bg-teal-600 hover:bg-teal-700' },
  ],
}

export const produtos: Produto[] = [
  {
    id: 'vaso-geometrico',
    nome: 'Vaso Geométrico',
    descricao: 'Ideal para suculentas e pequenas plantas. Várias cores.',
    categoria: 'Decoração',
    preco: 34.9,
    emoji: '🪴',
  },
  {
    id: 'chaveiro-personalizado',
    nome: 'Chaveiro Personalizado',
    descricao: 'Com o nome ou a logo que você quiser.',
    categoria: 'Personalizados',
    preco: 12.9,
    emoji: '🔑',
  },
  {
    id: 'suporte-celular',
    nome: 'Suporte para Celular',
    descricao: 'Firme e leve, perfeito para mesa de trabalho ou cozinha.',
    categoria: 'Utilidades',
    preco: 24.9,
    emoji: '📱',
  },
  {
    id: 'organizador-mesa',
    nome: 'Organizador de Mesa',
    descricao: 'Para canetas, clipes e objetos pequenos. Tudo no lugar.',
    categoria: 'Utilidades',
    preco: 39.9,
    emoji: '🗂️',
  },
  {
    id: 'miniatura',
    nome: 'Miniatura Colecionável',
    descricao: 'Personagens e bonecos com acabamento caprichado.',
    categoria: 'Decoração',
    preco: 49.9,
    emoji: '🧸',
  },
  {
    id: 'topo-de-bolo',
    nome: 'Topo de Bolo',
    descricao: 'Com nome e idade, para deixar a festa ainda mais especial.',
    categoria: 'Personalizados',
    preco: 29.9,
    emoji: '🎂',
  },
  {
    id: 'brinde-empresa',
    nome: 'Brinde com a Logo da Empresa',
    descricao: 'Chaveiros, porta-cartões e peças com a sua marca.',
    categoria: 'Personalizados',
    emoji: '🏢',
  },
  {
    id: 'peca-sob-medida',
    nome: 'Peça Sob Medida',
    descricao: 'Precisa de uma peça de reposição ou um projeto único? Fale com a gente.',
    categoria: 'Sob medida',
    emoji: '🛠️',
  },
]
