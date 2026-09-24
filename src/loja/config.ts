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
// Marca: sempre N97 em todos os produtos.
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
    preco: 34.95,
    precoOriginal: 69.9,
    fotos: ['boneco-neve-1.jpg', 'boneco-neve-2.jpg', 'boneco-neve-3.jpg', 'boneco-neve-4.jpg'],
    detalhes: `Boneco de Neve Decorativo Natalino Estilo Crochê em 3D

O que você recebe: 1 Peça decorativa de Boneco de Neve com design exclusivo simulando a textura de crochê.

Indicação de Uso: Peça perfeita para agregar charme, originalidade e um toque divertido e acolhedor à sua decoração natalina.

Material: Fabricado em plástico PETG de alta qualidade por meio de impressão 3D, garantindo resistência mecânica e durabilidade à peça.

Características da Impressão 3D (Aviso Importante): Por se tratar de um produto produzido com tecnologia de impressão 3D, podem ocorrer sutis variações de tonalidade, textura superficial, mínimos detalhes de acabamento e marcas (linhas) características do processo de fabricação. Tais particularidades são exclusividades da tecnologia 3D e não configuram defeito.

Manutenção e Limpeza: Para preservar a integridade da peça, realize a limpeza apenas com um pano seco, levemente umedecido ou espanador. Não utilize produtos químicos, não mergulhe em água e evite a exposição direta e prolongada ao sol ou a altas temperaturas.`,
    caracteristicas: [
      ['Marca', 'N97'],
      ['Cor', 'Branco'],
      ['Material', 'PETG'],
    ],
  },
  {
    id: 'fantasminha-coracao',
    nome: 'Enfeite Fantasminha Com Coração Para Decoração',
    descricao: 'Fantasminha com textura de tricô segurando um coração. Fofo para enfeitar qualquer cantinho.',
    categoria: 'Decoração',
    preco: 32.9,
    precoOriginal: 69.9,
    fotos: ['fantasminha-1.jpg', 'fantasminha-2.jpg', 'fantasminha-3.jpg'],
    detalhes: `Enfeite Fantasminha com Coração Estilo Tricô em 3D

O que você recebe: 1 Peça decorativa de Fantasminha segurando um coração, com design exclusivo simulando a textura de tricô.

Indicação de Uso: Peça perfeita para deixar estantes, mesas, escrivaninhas e prateleiras mais fofas e aconchegantes. Também é uma ótima opção de presente.

Tamanho: Aproximadamente 5,6 cm x 5,8 cm x 6 cm (comprimento x largura x altura).

Material: Fabricado em plástico PLA por meio de impressão 3D.

Características da Impressão 3D (Aviso Importante): Por se tratar de um produto produzido com tecnologia de impressão 3D, podem ocorrer sutis variações de tonalidade, textura superficial, mínimos detalhes de acabamento e marcas (linhas) características do processo de fabricação. Tais particularidades são exclusividades da tecnologia 3D e não configuram defeito.

Manutenção e Limpeza: Para preservar a integridade da peça, realize a limpeza apenas com um pano seco, levemente umedecido ou espanador. Não utilize produtos químicos, não mergulhe em água e evite a exposição direta e prolongada ao sol ou a altas temperaturas.`,
    caracteristicas: [
      ['Marca', 'N97'],
      ['Modelo', 'Escultura'],
      ['Personagem', 'Fantasminha'],
      ['Cor', 'Branco'],
      ['Comprimento x Largura x Altura', '5,6 cm x 5,8 cm x 6 cm'],
      ['Temática da escultura', 'Fantasma'],
      ['Material', 'PLA'],
    ],
  },
  {
    id: 'jesus-cristo-miniatura',
    nome: 'Jesus Cristo Miniatura Decorativa',
    descricao: 'Miniatura com traço delicado para mesas, prateleiras, nichos e cantinhos de oração.',
    categoria: 'Decoração',
    preco: 25.9,
    precoOriginal: 49.9,
    fotos: ['jesus-miniatura-1.jpg', 'jesus-miniatura-2.jpg', 'jesus-miniatura-3.jpg'],
    detalhes: `Esta miniatura decorativa de Jesus Cristo foi pensada para compor ambientes com um toque religioso e sereno. A peça em plástico, na cor branca, valoriza a decoração com uma presença discreta e respeitosa.

Por não exigir montagem, o uso é simples e direto, ideal para quem deseja incluir um elemento de devoção em mesas, prateleiras, nichos ou espaços de oração. Como não segue um realismo detalhado, o visual favorece uma leitura mais leve e decorativa.

É uma escolha interessante para casas, capelas particulares, cantos de oração e ambientes que pedem um detalhe de fé com visual limpo. Também pode atender pessoas que buscam uma miniatura decorativa com temática cristã e presença visual delicada.`,
    caracteristicas: [
      ['Marca', 'N97'],
      ['Cor', 'Branco'],
    ],
  },
]
