// ✏️ Edite este arquivo para personalizar a sua loja.

export type Produto = {
  id: string
  nome: string
  /** Texto curto que aparece no cartão do produto. */
  descricao: string
  categoria: string
  /** Preço em reais. Deixe `undefined` para mostrar "Sob consulta". */
  preco?: number
  /** Preço antes do desconto. Quando preenchido, aparece riscado com o selo "% OFF". */
  precoOriginal?: number
  /** Arquivos dentro de `public/produtos/` (ex.: ['vaso.jpg']). A primeira é a capa. Sem foto, usa o emoji. */
  fotos?: string[]
  emoji?: string
  /** Descrição completa, mostrada em "Ver detalhes". Separe parágrafos com uma linha em branco. */
  detalhes?: string
  /** Tabela de características, mostrada em "Ver detalhes". */
  caracteristicas?: [string, string][]
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

/* Enquanto a lista estiver vazia, a página mostra um aviso convidando o cliente a chamar no WhatsApp. */
// Carimbos: a cor é sempre aleatória (descrição e característica 'Cor e padrão: Aleatório').
export const produtos: Produto[] = [
  {
    id: 'kit-carimbos-hanami',
    nome: 'Kit Carimbos Brigadeiro Docinho Cerejeira Hanami Cereja',
    descricao: '6 carimbos para personalizar brigadeiros e doces finos no tema Cerejeira/Hanami.',
    categoria: 'Confeitaria',
    preco: 21.9,
    precoOriginal: 32,
    fotos: ['kit-hanami-1.jpg', 'kit-hanami-2.jpg', 'kit-hanami-3.jpg', 'kit-hanami-4.jpg'],
    detalhes: `Kit Carimbos Marcadores para Doces Tema Cerejeira Hanami (6 Unidades)

O que você recebe: 1 Kit contendo 6 carimbos com estampas diferentes no tema Cerejeira/Hanami (Cereja, Flor de Cerejeira, Laço, Árvore, Cesta e Corações) em cor aleatória.

Indicação de Uso: Ferramenta ideal para personalizar brigadeiros, doces finos, pasta americana, lembrancinhas e produções artesanais temáticas.

Benefícios para a Produção: Estrutura firme e de fácil manuseio que assegura marcações precisas e uniformes, facilitando a padronização e elevando o nível de acabamento profissional da sua vitrine de doces.

Manutenção e Limpeza: Superfície com acabamento impecável, facilitando a higienização. Recomenda-se lavar exclusivamente com água fria e sabão neutro para preservar a integridade dos detalhes.

Aviso legal
É livre de BPA.`,
    caracteristicas: [
      ['Marca', 'N97'],
      ['Modelo', 'Marcador Doce'],
      ['Formato de venda', 'Kit'],
      ['Quantidade de carimbos', '6'],
      ['Cor e padrão', 'Aleatório'],
      ['Material do cabo', 'Plástico'],
      ['Material do carimbo', 'Plástico'],
      ['É para uso de forma quente', 'Não'],
      ['É livre de BPA', 'Sim'],
    ],
  },
  {
    id: 'boneco-de-neve-croche',
    nome: 'Boneco De Neve Estilo Crochê Decoração Natal',
    descricao: 'Peça decorativa com textura que imita crochê. Charme e aconchego para o seu Natal.',
    categoria: 'Decoração',
    preco: 23.9,
    fotos: ['boneco-neve-1.jpg', 'boneco-neve-2.jpg', 'boneco-neve-3.jpg', 'boneco-neve-4.jpg'],
    detalhes: `Boneco de Neve Decorativo Natalino Estilo Crochê em 3D

O que você recebe: 1 Peça decorativa de Boneco de Neve com design exclusivo simulando a textura de crochê.

Indicação de Uso: Peça perfeita para agregar charme, originalidade e um toque divertido e acolhedor à sua decoração natalina.

Material: Fabricado em plástico PETG de alta qualidade por meio de impressão 3D, garantindo resistência mecânica e durabilidade à peça.

Características da Impressão 3D (Aviso Importante): Por se tratar de um produto produzido com tecnologia de impressão 3D, podem ocorrer sutis variações de tonalidade, textura superficial, mínimos detalhes de acabamento e marcas (linhas) características do processo de fabricação. Tais particularidades são exclusividades da tecnologia 3D e não configuram defeito.

Manutenção e Limpeza: Para preservar a integridade da peça, realize a limpeza apenas com um pano seco, levemente umedecido ou espanador. Não utilize produtos químicos, não mergulhe em água e evite a exposição direta e prolongada ao sol ou a altas temperaturas.`,
    caracteristicas: [['Cor', 'Branco']],
  },
]
