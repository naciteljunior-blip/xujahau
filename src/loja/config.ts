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

/** Ícone de cada categoria nos botões de filtro. Categoria sem ícone aparece só com o nome. */
export const iconesCategorias: Record<string, string> = {
  Confeitaria: '🧁',
  Decoração: '🎄',
  'Utensílios Domésticos': '🏠',
}

export const loja = {
  nome: 'Think Lab',
  slogan: 'Peças impressas em 3D com carinho, do jeitinho que você precisa.',
  /** Número com código do país e DDD, só números. */
  whatsapp: '5511916133318',
  cidade: 'Enviamos para todo o Brasil',
  instagram: '', // ex.: 'https://instagram.com/thinklab'
  /** Taxa fixa de entrega em reais, somada ao total do carrinho. */
  taxaEntrega: 10,
  formasPagamento: ['Pix', 'Cartão de crédito', 'Boleto'],
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
    preco: 21,
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
  {
    id: 'papai-noel-croche',
    nome: 'Papai Noel Decorativo Natal Enfeite Estilo Crochê Natalino',
    descricao: 'Papai Noel com textura de crochê e tamanho compacto. O mais esperado do Natal!',
    categoria: 'Decoração',
    preco: 32.9,
    precoOriginal: 59.9,
    fotos: ['papai-noel-1.jpg', 'papai-noel-2.jpg', 'papai-noel-3.jpg'],
    detalhes: `Papai Noel Decorativo Natalino Estilo Crochê em 3D

O que você recebe: 1 Peça decorativa de Papai Noel com acabamento texturizado inspirado no efeito de crochê, embalada cuidadosamente em plástico-bolha e caixa para máxima proteção durante o transporte. (Atenção: O produto é estritamente decorativo e não possui nenhum componente elétrico ou eletrônico.)

Indicação de Uso: Com design de tamanho compacto, é a escolha perfeita para agregar charme, elegância e o espírito natalino a mesas, aparadores, estantes, prateleiras, escritórios e demais composições temáticas.

Dimensões e Cores: A peça possui aproximadamente 7 cm de altura e 5 cm de largura. Produzida na paleta clássica (vermelho, branco, bege e preto), não havendo opção de personalização de cores.

Material: Fabricado em plástico PETG de alta qualidade por meio de impressão 3D, garantindo maior resistência mecânica e longa durabilidade à peça.

Características da Impressão 3D (Aviso Importante): Por se tratar de um produto fabricado com tecnologia de impressão 3D, podem ocorrer sutis linhas ou variações características do processo produtivo. Esses detalhes não configuram defeito, mas sim particularidades que compõem o acabamento exclusivo da peça.

Manutenção e Cuidados: Para conservar o seu produto por mais tempo, evite quedas e impactos. Realize a limpeza delicadamente utilizando apenas um pano seco ou levemente úmido. Não exponha a peça à luz solar direta ou a altas temperaturas.`,
    caracteristicas: [
      ['Marca', 'N97'],
      ['Modelo', 'Papai Noel'],
      ['Cor', 'Vermelho'],
      ['Altura x Largura x Comprimento', '7 cm x 5 cm x 4 cm'],
      ['Tipo', 'Boneco de plástico estilo crochê'],
      ['Material', 'PETG'],
    ],
  },
  {
    id: 'kit-6-carimbos-de-brigadeiro-religioso-batizado-marcado-doce',
    nome: 'Kit 6 Carimbos De Brigadeiro Religioso Batizado Marcado Doce Kit 6',
    descricao: 'Kit Carimbos Marcadores para Doces Tema Religioso (6 Unidades).',
    categoria: 'Confeitaria',
    preco: 17.57,
    precoOriginal: 32,
    fotos: ['kit-6-carimbos-de-brigadeiro-religioso-batizado-marcado-doce-1.jpg', 'kit-6-carimbos-de-brigadeiro-religioso-batizado-marcado-doce-2.jpg', 'kit-6-carimbos-de-brigadeiro-religioso-batizado-marcado-doce-3.jpg', 'kit-6-carimbos-de-brigadeiro-religioso-batizado-marcado-doce-4.jpg', 'kit-6-carimbos-de-brigadeiro-religioso-batizado-marcado-doce-5.jpg'],
    detalhes: `Kit Carimbos Marcadores para Doces Tema Religioso (6 Unidades)

O que você recebe: 1 Kit contendo 6 carimbos com estampas diferentes no tema Religioso (Batizado, Crisma e Primeira Comunhão).

Indicação de Uso: Ferramenta ideal para a personalização de brigadeiros, doces finos, lembrancinhas e produções artesanais para datas comemorativas.

Dimensões da Peça: Altura total de 3,5 cm, diâmetro de 2,2 cm e relevo da estampa com 0,5 cm de altura (tamanho perfeitamente ajustado para doces padrão).

Benefícios para a Produção: Estrutura firme e de fácil manuseio que assegura marcações precisas e uniformes, facilitando a padronização e elevando o nível de acabamento profissional dos doces.

Garantia: Este produto não possui garantia.`,
    caracteristicas: [
      ['Marca', 'N97'],
      ['Cor e padrão', 'Aleatório'],
      ['Formato de venda', 'Kit'],
      ['Quantidade de carimbos', '6'],
      ['Material do carimbo', 'Plástico'],
      ['Altura', '3.5 cm'],
      ['Diâmetro', '2 cm'],
      ['É para uso de forma quente', 'Não'],
    ],
  },
  {
    id: 'carimbo-brigadeiro-marcador-doces-personalizado-5-unidades',
    nome: 'Carimbo Brigadeiro Marcador Doces Personalizado 5 Unidades',
    descricao: 'Kit Carimbos Modeladores para Doces Tema Batizado (6 Unidades).',
    categoria: 'Confeitaria',
    preco: 19,
    precoOriginal: 38,
    fotos: ['carimbo-brigadeiro-marcador-doces-personalizado-5-unidades-1.jpg', 'carimbo-brigadeiro-marcador-doces-personalizado-5-unidades-2.jpg', 'carimbo-brigadeiro-marcador-doces-personalizado-5-unidades-3.jpg', 'carimbo-brigadeiro-marcador-doces-personalizado-5-unidades-4.jpg', 'carimbo-brigadeiro-marcador-doces-personalizado-5-unidades-5.jpg'],
    detalhes: `Kit Carimbos Modeladores para Doces Tema Batizado (6 Unidades)

O que você recebe: 1 Kit contendo 6 carimbos com estampas temáticas de Batizado.

Dimensões da Peça: Cada modelo possui 3 cm de altura por 2 cm de largura, proporcionando marcações nítidas e bem definidas.

Indicação de Uso: Ferramenta ideal para personalizar brigadeiros, doces finos, pasta americana, biscuit, argila fria e massas artesanais.

Material e Segurança: Estrutura durável, projetada para uso contínuo (reutilizável) e 100% Livre de BPA, garantindo total segurança no manuseio alimentar.

Manutenção e Limpeza: Higienização simples, devendo ser feita exclusivamente com água fria e sabão neutro (não submeter a máquinas lava-louças).

Aviso Visual: As imagens são ilustrativas. As cores do produto podem apresentar sutis variações de acordo com as configurações de tela.

Garantia: 3 meses de garantia oferecida pelo vendedor.`,
    caracteristicas: [
      ['Marca', 'N97'],
      ['Cor e padrão', 'Aleatório'],
      ['Formato de venda', 'Kit'],
      ['Quantidade de carimbos', '6'],
      ['Material do carimbo', 'Plástico'],
      ['Material do cabo', 'Plástico'],
      ['Altura', '3 cm'],
      ['Largura', '3 cm'],
      ['Comprimento', '3 cm'],
      ['Diâmetro', '2 cm'],
      ['É livre de BPA', 'Sim'],
      ['É para uso de forma quente', 'Não'],
    ],
  },
  {
    id: 'kit-4-carimbos-brigadeiro-docinho-frutas-marcador-aleatorio',
    nome: 'Kit 4 Carimbos Brigadeiro Docinho Frutas Marcador Aleatório',
    descricao: 'Kit Carimbos Marcadores para Doces Tema Frutas V2 (4 Unidades).',
    categoria: 'Confeitaria',
    preco: 19,
    precoOriginal: 22,
    fotos: ['kit-4-carimbos-brigadeiro-docinho-frutas-marcador-aleatorio-1.jpg', 'kit-4-carimbos-brigadeiro-docinho-frutas-marcador-aleatorio-2.jpg', 'kit-4-carimbos-brigadeiro-docinho-frutas-marcador-aleatorio-3.jpg'],
    detalhes: `Kit Carimbos Marcadores para Doces Tema Frutas V2 (4 Unidades)

O que você recebe: 1 Kit contendo 4 carimbos com estampas exclusivas no tema Frutas (Banana, Morango, Melancia, Cítrico, Cereja e Uva) em cor aleatória.

Indicação de Uso: Ferramenta ideal para personalizar brigadeiros, doces gourmet, pasta americana, lembrancinhas e produções artesanais temáticas.

Benefícios para a Produção: Possui estrutura firme e cabo ergonômico de fácil manuseio que assegura marcações precisas e uniformes, facilitando a padronização e elevando o nível de acabamento profissional da sua vitrine de doces.

Material e Segurança: Fabricado em plástico de alta qualidade e resistência. Produto totalmente seguro para o contato direto com alimentos e 100% Livre de BPA.

Manutenção e Limpeza: Superfície projetada para higienização rápida. Recomenda-se lavar exclusivamente com água fria e sabão neutro para preservar a integridade dos detalhes e a durabilidade da peça.`,
    caracteristicas: [
      ['Marca', 'N97'],
      ['Cor e padrão', 'Aleatório'],
      ['Formato de venda', 'Kit'],
      ['Unidades por kit', '4'],
      ['Material do carimbo', 'Plástico'],
      ['Material do cabo', 'Plástico'],
      ['É livre de BPA', 'Sim'],
      ['É para uso de forma quente', 'Não'],
    ],
  },
  {
    id: 'kit-5-marcador-cortador-homem-aranha-biscoito-cookie-aleator',
    nome: 'Kit 5 Marcador Cortador Homem Aranha Biscoito Cookie Aleatório',
    descricao: 'Kit Cortador e Marcador de Biscoitos Homem-Aranha (5 Peças).',
    categoria: 'Confeitaria',
    preco: 33.87,
    precoOriginal: 37.5,
    fotos: ['kit-5-marcador-cortador-homem-aranha-biscoito-cookie-aleator-1.jpg', 'kit-5-marcador-cortador-homem-aranha-biscoito-cookie-aleator-2.jpg', 'kit-5-marcador-cortador-homem-aranha-biscoito-cookie-aleator-3.jpg'],
    detalhes: `Kit Cortador e Marcador de Biscoitos Homem-Aranha (5 Peças)
Impressão 3D Premium | Material Atóxico e Seguro

O Que Está Incluso
5 modelos completos com a temática Homem-Aranha.

Cada modelo contém 1 Cortador estrutural e 1 Marcador para os detalhes.

Especificações do Produto
Tamanho: 7cm (referente à maior dimensão do desenho).

Material: Plástico PLA Premium.

Segurança: Produto biodegradável, 100% atóxico e próprio para contato com alimentos.

Cor: Aleatória, enviada conforme a disponibilidade do estoque.

Aplicações: Ideal para biscoitos, pasta americana, biscuit e artesanato em geral.

Cuidados e Conservação
Lavar exclusivamente com água em temperatura ambiente e detergente neutro.

Utilizar apenas uma escova de cerdas macias para a higienização.

Não utilizar água fervente, morna ou máquina lava-louças.

Não expor as peças ao sol forte, fornos ou qualquer fonte de calor.

Sobre a Nossa Produção
Operação independente focada em impressão 3D de alta precisão.

Trabalho honesto e dedicado para entregar a melhor qualidade para as suas criações.`,
    caracteristicas: [
      ['Marca', 'N97'],
      ['Cor', 'Aleatório'],
      ['Formato de venda', 'Kit'],
      ['Unidades por kit', '5'],
      ['Unidades por embalagem', '5'],
      ['Altura', '7 cm'],
      ['Largura', '4.5 cm'],
      ['É apto para lava-louças', 'Não'],
    ],
  },
  {
    id: 'kit-6-prendedores-de-embalagem-alimento-astheric-minimalista',
    nome: 'Kit 6 Prendedores De Embalagem Alimento Astheric Minimalista Bege',
    descricao: 'Ideal para quem busca organização sem abrir mão da estética, este suporte geométrico transforma a disposição dos seus objetos na…',
    categoria: 'Utensílios Domésticos',
    preco: 19,
    precoOriginal: 38,
    fotos: ['kit-6-prendedores-de-embalagem-alimento-astheric-minimalista-1.jpg', 'kit-6-prendedores-de-embalagem-alimento-astheric-minimalista-2.jpg', 'kit-6-prendedores-de-embalagem-alimento-astheric-minimalista-3.jpg', 'kit-6-prendedores-de-embalagem-alimento-astheric-minimalista-4.jpg'],
    detalhes: `Ideal para quem busca organização sem abrir mão da estética, este suporte geométrico transforma a disposição dos seus objetos na mesa ou bancada. Com linhas minimalistas e formato simétrico, ele se integra perfeitamente a diferentes estilos de ambiente, mantendo o visual limpo e moderno.

Destaques do Produto

Design funcional pensado para otimizar o espaço e manter itens de uso diário acessíveis.

Estrutura leve e de alta estabilidade, garantindo suporte seguro para os objetos.

Acabamento texturizado que confere um toque contemporâneo e sofisticado à peça.

Versatilidade de uso: atende perfeitamente como organizador prático ou como elemento decorativo.`,
    caracteristicas: [
      ['Marca', 'N97'],
      ['Cor', 'Bege'],
      ['Formato de venda', 'Kit'],
      ['Quantidade de mini', '6'],
    ],
  },
  {
    id: 'suporte-parede-mangueira-grande-pequena-universal-premium',
    nome: 'Suporte Parede Mangueira Grande Pequena Universal Premium',
    descricao: 'Mantenha seu espaço organizado, seguro e livre de tropeços. Este suporte de parede protege sua mangueira contra desgastes e…',
    categoria: 'Decoração',
    preco: 79,
    precoOriginal: 158,
    fotos: ['suporte-parede-mangueira-grande-pequena-universal-premium-1.jpg', 'suporte-parede-mangueira-grande-pequena-universal-premium-2.jpg', 'suporte-parede-mangueira-grande-pequena-universal-premium-3.jpg', 'suporte-parede-mangueira-grande-pequena-universal-premium-4.jpg', 'suporte-parede-mangueira-grande-pequena-universal-premium-5.jpg'],
    detalhes: `SUPORTE DE PAREDE PARA MANGUEIRA DE JARDIM

Mantenha seu espaço organizado, seguro e livre de tropeços. Este suporte de parede protege sua mangueira contra desgastes e otimiza a organização de quintais, garagens e áreas de serviço.

CAPACIDADE POR MEDIDA
• Mangueira de 1/2": até 20 metros
• Mangueira de 5/8": até 15 metros
• Mangueira de 3/4": até 10 metros

PRINCIPAIS VANTAGENS
• Proteção para a mangueira: evita dobras, nós e vincos que provocam rachaduras com o tempo
• Mais segurança no ambiente: tira a mangueira do chão, eliminando riscos de tropeços
• Design compacto: ocupa o mínimo de espaço na parede
• Instalação rápida e prática: fixação direta na parede
• Versatilidade de uso: indicado para quintais, garagens, varandas, lavanderias e jardins

ESPECIFICAÇÕES TÉCNICAS
• Material: PETG de alta durabilidade (resistente a sol, chuva e variações climáticas)
• Dimensões: 9 cm de comprimento x 11 cm de largura x 7,5 cm de altura
• Peso: 100 g
• Tipo de fixação: parede

CONTEÚDO DA EMBALAGEM
• 1x Suporte de parede para mangueira

ENVIO E ENTREGA
• Produto a pronta entrega, com envio imediato e frete Mercado Envios para todo o Brasil.`,
    caracteristicas: [
      ['Marca', 'N97'],
      ['Formato de venda', 'Unidade'],
      ['Quantidade de suportes para mangueiras', '1'],
      ['Material', 'Plástico'],
      ['Altura', '7.5 cm'],
      ['Largura', '9 cm'],
    ],
  },
  {
    id: 'carimbo-decoracao-brigadeiro-doces-docinho-confeitaria',
    nome: 'Carimbo Decoração Brigadeiro Doces Docinho Confeitaria',
    descricao: 'Eleve o padrão dos seus doces com marcações delicadas, precisas e profissionais. Desenvolvido para confeiteiras que buscam…',
    categoria: 'Confeitaria',
    preco: 19.99,
    precoOriginal: 29,
    fotos: ['carimbo-decoracao-brigadeiro-doces-docinho-confeitaria-1.jpg', 'carimbo-decoracao-brigadeiro-doces-docinho-confeitaria-2.jpg', 'carimbo-decoracao-brigadeiro-doces-docinho-confeitaria-3.jpg', 'carimbo-decoracao-brigadeiro-doces-docinho-confeitaria-4.jpg', 'carimbo-decoracao-brigadeiro-doces-docinho-confeitaria-5.jpg'],
    detalhes: `KIT DE CARIMBOS PARA DOCES E CONFEITARIA

Eleve o padrão dos seus doces com marcações delicadas, precisas e profissionais. Desenvolvido para confeiteiras que buscam transformar brigadeiros, pastas americanas e biscoitos em criações personalizadas que encantam os clientes e agregam valor às vendas.

MODO DE USO

Encaixe o bastão na base do carimbo desejado

Pressione suavemente sobre o doce, pasta americana ou massa

Em poucos segundos a marcação fica nítida, uniforme e com excelente acabamento

PRINCIPAIS VANTAGENS

Acabamento profissional: marcações detalhadas que valorizam a apresentação dos doces

Agilidade na produção: padronização rápida para grandes encomendas

Segurança alimentar: material atóxico e livre de BPA

Fácil higienização: superfície lisa que facilita a limpeza após o uso

Versatilidade: excelente para doces temáticos, lembrancinhas e kits para festas

ESPECIFICAÇÕES TÉCNICAS

Material: Plástico resistente de alta durabilidade, próprio para contato com alimentos (Livre de BPA)

Quantidade: 8 carimbos

Diâmetro do carimbo: 2 cm

Profundidade da marcação: 0,3 cm

Altura total: 3,5 cm

Uso indicado: brigadeiros gourmet, doces finos, pasta americana, biscuit e massas leves

CONTEÚDO DA EMBALAGEM

1x Kit com 8 carimbos para confeitaria

INFORMAÇÕES ADICIONAIS

Garantia de fábrica: 7 dias

Produto livre de BPA`,
    caracteristicas: [
      ['Marca', 'N97'],
      ['Cor e padrão', 'Aleatório'],
      ['Formato de venda', 'Unidade'],
      ['Quantidade de carimbos', '1'],
      ['Material do carimbo', 'Plástico'],
      ['Material do cabo', 'Plástico'],
      ['Altura', '3 mm'],
      ['Largura', '2 cm'],
      ['Comprimento', '3 cm'],
      ['Diâmetro', '2 cm'],
      ['É livre de BPA', 'Sim'],
      ['É para uso de forma quente', 'Não'],
    ],
  },
  {
    id: 'kit-5-marcador-cortador-toy-story-biscoito-cookie',
    nome: 'Kit 5 Marcador Cortador Toy Story Biscoito Cookie',
    descricao: 'Kit Cortador e Marcador de Biscoitos Toy Story (5 Peças).',
    categoria: 'Confeitaria',
    preco: 37.5,
    precoOriginal: 75,
    fotos: ['kit-5-marcador-cortador-toy-story-biscoito-cookie-1.jpg', 'kit-5-marcador-cortador-toy-story-biscoito-cookie-2.jpg', 'kit-5-marcador-cortador-toy-story-biscoito-cookie-3.jpg'],
    detalhes: `Kit Cortador e Marcador de Biscoitos Toy Story (5 Peças)
Impressão 3D Premium | Material Atóxico e Seguro

O Que Está Incluso
5 modelos completos com a temática Toy Story.

Cada modelo contém 1 Cortador estrutural e 1 Marcador para os detalhes.

Especificações do Produto
Tamanho: 7cm (referente à maior dimensão do desenho).

Material: Plástico PLA Premium.

Segurança: Produto biodegradável, 100% atóxico e próprio para contato com alimentos.

Cor: Aleatória, enviada conforme a disponibilidade do estoque.

Aplicações: Ideal para biscoitos, pasta americana, biscuit e artesanato em geral.

Cuidados e Conservação
Lavar exclusivamente com água em temperatura ambiente e detergente neutro.

Utilizar apenas uma escova de cerdas macias para a higienização.

Não utilizar água fervente, morna ou máquina lava-louças.

Não expor as peças ao sol forte, fornos ou qualquer fonte de calor.`,
    caracteristicas: [
      ['Marca', 'N97'],
      ['Formato de venda', 'Kit'],
      ['Unidades por kit', '5'],
      ['Unidades por embalagem', '5'],
      ['Altura', '7 cm'],
      ['Largura', '4.5 cm'],
      ['É apto para lava-louças', 'Não'],
    ],
  },
  {
    id: 'carimbo-de-decoracao-doces-docinho-confeitaria-cha-revelacao',
    nome: 'Carimbo De Decoração Doces Docinho Confeitaria Chá Revelação',
    descricao: '1 Kit contendo 8 carimbos temáticos com marcação de até 2 cm.',
    categoria: 'Confeitaria',
    preco: 18.9,
    precoOriginal: 32,
    fotos: ['carimbo-de-decoracao-doces-docinho-confeitaria-cha-revelacao-1.jpg', 'carimbo-de-decoracao-doces-docinho-confeitaria-cha-revelacao-2.jpg', 'carimbo-de-decoracao-doces-docinho-confeitaria-cha-revelacao-3.jpg', 'carimbo-de-decoracao-doces-docinho-confeitaria-cha-revelacao-4.jpg', 'carimbo-de-decoracao-doces-docinho-confeitaria-cha-revelacao-5.jpg'],
    detalhes: `Kit Carimbos Decorativos para Doces (8 Peças)

O que você recebe: 1 Kit contendo 8 carimbos temáticos com marcação de até 2 cm.

Indicação de Uso: Ferramenta ideal para personalizar brigadeiros, pasta americana e biscoitos, agregando valor e charme à sua produção confeiteira.

Modo de Usar: Prático e rápido. Basta encaixar o bastão na base e pressionar suavemente sobre o doce para obter uma marcação delicada e perfeita.

Material e Segurança: Fabricado em plástico resistente de alta qualidade, totalmente seguro para contato com alimentos e 100% Livre de BPA.

Dimensões da Peça: Altura total de 3,5 cm, diâmetro de 2 cm e profundidade da marcação de 0,3 cm.

Manutenção: Superfície com acabamento impecável, facilitando a higienização e garantindo alta durabilidade para uso profissional ou doméstico.

Garantia: 7 dias de garantia de fábrica.`,
    caracteristicas: [
      ['Marca', 'N97'],
      ['Cor e padrão', 'Aleatório'],
      ['Formato de venda', 'Unidade'],
      ['Quantidade de carimbos', '1'],
      ['Material do carimbo', 'Plástico'],
      ['Material do cabo', 'Plástico'],
      ['Altura', '3 mm'],
      ['Largura', '2 cm'],
      ['Comprimento', '3 cm'],
      ['Diâmetro', '2 cm'],
      ['É livre de BPA', 'Sim'],
      ['É para uso de forma quente', 'Não'],
    ],
  },
  {
    id: 'kit-6-carimbos-brigadeiro-docinho-frutas-marcador-aleatorio',
    nome: 'Kit 6 Carimbos Brigadeiro Docinho Frutas Marcador Aleatório',
    descricao: 'Kit Carimbos Marcadores para Doces Tema Frutas V2 (6 Unidades).',
    categoria: 'Confeitaria',
    preco: 21,
    precoOriginal: 29,
    fotos: ['kit-6-carimbos-brigadeiro-docinho-frutas-marcador-aleatorio-1.jpg', 'kit-6-carimbos-brigadeiro-docinho-frutas-marcador-aleatorio-2.jpg', 'kit-6-carimbos-brigadeiro-docinho-frutas-marcador-aleatorio-3.jpg'],
    detalhes: `Kit Carimbos Marcadores para Doces Tema Frutas V2 (6 Unidades)

O que você recebe: 1 Kit contendo 6 carimbos com estampas exclusivas no tema Frutas (Banana, Morango, Melancia, Cítrico, Cereja e Uva) em cor aleatória.

Indicação de Uso: Ferramenta ideal para personalizar brigadeiros, doces gourmet, pasta americana, lembrancinhas e produções artesanais temáticas.

Benefícios para a Produção: Possui estrutura firme e cabo ergonômico de fácil manuseio que assegura marcações precisas e uniformes, facilitando a padronização e elevando o nível de acabamento profissional da sua vitrine de doces.

Material e Segurança: Fabricado em plástico de alta qualidade e resistência. Produto totalmente seguro para o contato direto com alimentos e 100% Livre de BPA.

Manutenção e Limpeza: Superfície projetada para higienização rápida. Recomenda-se lavar exclusivamente com água fria e sabão neutro para preservar a integridade dos detalhes e a durabilidade da peça.`,
    caracteristicas: [
      ['Marca', 'N97'],
      ['Cor e padrão', 'Aleatório'],
      ['Formato de venda', 'Kit'],
      ['Unidades por kit', '6'],
      ['Material do carimbo', 'Plástico'],
      ['Material do cabo', 'Plástico'],
      ['É livre de BPA', 'Sim'],
      ['É para uso de forma quente', 'Não'],
    ],
  },
  {
    id: 'kit-4-carimbos-brigadeiro-docinho-capivara',
    nome: 'Kit 4 Carimbos Brigadeiro Docinho Capivara',
    descricao: '4 carimbos para personalizar brigadeiros e doces no tema Capivara.',
    categoria: 'Confeitaria',
    preco: 16.34,
    precoOriginal: 25,
    fotos: ['kit-4-carimbos-brigadeiro-docinho-capivara-1.jpg', 'kit-4-carimbos-brigadeiro-docinho-capivara-2.jpg', 'kit-4-carimbos-brigadeiro-docinho-capivara-3.jpg', 'kit-4-carimbos-brigadeiro-docinho-capivara-4.jpg', 'kit-4-carimbos-brigadeiro-docinho-capivara-5.jpg'],
    detalhes: `Kit Carimbos e Modeladores para Doces

O que você recebe: 1 Kit de carimbos/modeladores (a quantidade de peças e o tema correspondem exatamente ao título do anúncio).

Indicação de Uso: Ferramenta perfeita para personalizar brigadeiros, doces artesanais e pasta americana, elevando o nível de lembrancinhas e encomendas para festas.

Modo de Usar: Processo prático e rápido. Basta preparar o doce, posicionar o carimbo sobre a superfície e pressionar com cuidado para transferir o desenho de forma nítida.

Benefícios para a Produção: Facilita a padronização visual da sua confeitaria, garantindo um acabamento charmoso e profissional em todas as peças.

Material e Segurança: Desenvolvido com material de alta qualidade, seguro para o contato alimentar e 100% Livre de BPA.

Manutenção e Limpeza: Estrutura desenvolvida para higienização simples e rápida após a finalização do trabalho.

Aviso Visual: As cores dos carimbos podem variar de acordo com a disponibilidade do nosso estoque no momento da separação.

Garantia: 30 dias de garantia de fábrica.`,
    caracteristicas: [
      ['Marca', 'N97'],
      ['Cor e padrão', 'Aleatório'],
      ['Formato de venda', 'Kit'],
      ['Quantidade de carimbos', '4'],
      ['Material do carimbo', 'PLA'],
      ['Material do cabo', 'PLA'],
      ['É livre de BPA', 'Sim'],
      ['É para uso de forma quente', 'Não'],
    ],
  },
  {
    id: 'kit-6-marcadores-carimbos-brigadeiro-festa-aniversario-doce',
    nome: 'Kit 6 Marcadores Carimbos Brigadeiro Festa Aniversário Doce Kit 6',
    descricao: 'Kit com 6 carimbos marcadores para brigadeiros e doces, desenvolvido para personalização no tema Aniversários- Balão, Bolo,…',
    categoria: 'Confeitaria',
    preco: 17,
    precoOriginal: 29,
    fotos: ['kit-6-marcadores-carimbos-brigadeiro-festa-aniversario-doce-1.jpg', 'kit-6-marcadores-carimbos-brigadeiro-festa-aniversario-doce-2.jpg', 'kit-6-marcadores-carimbos-brigadeiro-festa-aniversario-doce-3.jpg', 'kit-6-marcadores-carimbos-brigadeiro-festa-aniversario-doce-4.jpg', 'kit-6-marcadores-carimbos-brigadeiro-festa-aniversario-doce-5.jpg'],
    detalhes: `Kit com 6 carimbos marcadores para brigadeiros e doces, desenvolvido para personalização no tema Aniversários- Balão, Bolo, Bexigas, Confetes, Presente e Parabéns

Indicado para uso em brigadeiros, doces gourmet e produções artesanais, proporcionando acabamento mais profissional e diferenciado.

Especificações Técnicas

- Altura total: 3,5 cm
- Diâmetro: 2,2 c
- Altura do relevo (desenho): 0,5 cm
- Cor: Aleatória
- Estrutura firme e de fácil manuseio

Aplicações: Brigadeiros, doces finos, produção para venda, lembrancinhas e datas comemorativas.

Diferenciais
- Marcação precisa e uniforme
- Tamanho ideal para doces padrão
- Facilita a padronização da produção
- Melhora a apresentação final do produto

Conteúdo do Kit: 6 carimbos com estampas diferentes, tema: Aniversários- Balão, Bolo, Bexigas, Confetes, Presente e Parabéns

Sem garantia`,
    caracteristicas: [
      ['Marca', 'N97'],
      ['Cor e padrão', 'Aleatório'],
      ['Formato de venda', 'Kit'],
      ['Quantidade de carimbos', '6'],
      ['Material do carimbo', 'Plástico'],
      ['Altura', '3.5 cm'],
      ['É para uso de forma quente', 'Não'],
    ],
  },
  {
    id: 'kit-3-marcadores-de-pagina-livro-tema-rosas-vazado-preto-cin',
    nome: 'Kit 3 Marcadores De Pagina Livro Tema Rosas Vazado Preto Cinza Bege Florido',
    descricao: 'Apresentamos o Kit de Marcadores de Página Coleção Rosas. Desenvolvido para leitores que valorizam sofisticação em cada detalhe,…',
    categoria: 'Decoração',
    preco: 29.9,
    precoOriginal: 59.8,
    fotos: ['kit-3-marcadores-de-pagina-livro-tema-rosas-vazado-preto-cin-1.jpg', 'kit-3-marcadores-de-pagina-livro-tema-rosas-vazado-preto-cin-2.jpg', 'kit-3-marcadores-de-pagina-livro-tema-rosas-vazado-preto-cin-3.jpg'],
    detalhes: `Kit 3 Marcadores de Página Premium Coleção Rosas
*Produto Exclusivo | Acabamento Refinado*

Apresentamos o Kit de Marcadores de Página Coleção Rosas. Desenvolvido para leitores que valorizam sofisticação em cada detalhe, este conjunto une funcionalidade e alta estética, garantindo um toque de luxo aos seus momentos de leitura.

---

### O Que Está Incluso
• 1x Marcador de Página Rosas (Preto)
• 1x Marcador de Página Rosas (Prata Texturizado)
• 1x Marcador de Página Rosas (Champagne/Pérola)

 Atenção: As bases de suporte exibidas nas imagens são meramente ilustrativas. Este produto NÃO acompanha bases.

### Destaques e Especificações
• Design Exclusivo: Padrão floral vazado de alta precisão, destacando uma elegante ramificação de rosas e folhas.
• Acabamento Premium: Superfície com textura refinada e leve brilho, conferindo um aspecto luxuoso e imponente a cada peça.
• Estrutura Segura: Material leve e com espessura perfeitamente calibrada, projetado para marcar suas leituras sem amassar ou danificar as páginas dos seus livros.

### Cuidados e Conservação
• Higienizar apenas com um pano macio e seco.
• Evitar lavagem com água ou produtos químicos abrasivos.
• Manter em locais arejados e evitar a exposição prolongada a fontes diretas de calor para preservar a integridade estrutural das peças.
• Manusear com delicadeza para preservar os finos detalhes do design vazado.`,
    caracteristicas: [
      ['Marca', 'N97'],
      ['Cor', 'Preto Cinza Bege'],
      ['Formato de venda', 'Kit'],
      ['Quantidade de marcadores', '3'],
      ['Material', 'PLA'],
      ['Largura', '5 cm'],
      ['Comprimento', '18 cm'],
    ],
  },
  {
    id: '10-marcadores-carimbos-doces-brigadeiros-numeros-idade-aleat',
    nome: '10 Marcadores Carimbos Doces Brigadeiros Números Idade Aleatória Números Aleatória',
    descricao: 'Kit Carimbos Marcadores para Doces Tema Números (9 Unidades).',
    categoria: 'Confeitaria',
    preco: 29,
    precoOriginal: 58,
    fotos: ['10-marcadores-carimbos-doces-brigadeiros-numeros-idade-aleat-1.jpg', '10-marcadores-carimbos-doces-brigadeiros-numeros-idade-aleat-2.jpg', '10-marcadores-carimbos-doces-brigadeiros-numeros-idade-aleat-3.jpg', '10-marcadores-carimbos-doces-brigadeiros-numeros-idade-aleat-4.jpg', '10-marcadores-carimbos-doces-brigadeiros-numeros-idade-aleat-5.jpg'],
    detalhes: `Kit Carimbos Marcadores para Doces Tema Números (9 Unidades)

O que você recebe: 1 Kit contendo 9 carimbos numéricos de 0 a 9 (a peça do número 6 é reversível e também é utilizada como o número 9).

Indicação de Uso: Ferramenta ideal para personalizar brigadeiros, doces gourmet, pasta americana e massas de modelar artesanais, garantindo marcações precisas e um visual exclusivo para aniversários.

Dimensões da Peça: Estrutura de base com 2 cm (comprimento e largura), altura total de 3,1 cm e profundidade de marcação de 0,5 cm.

Material e Segurança: Fabricado em plástico PLA (biodegradável). Produto 100% Livre de BPA, oferecendo total segurança para o contato direto com alimentos.

Cuidados e Conservação: O material PLA possui sensibilidade térmica e deve ser utilizado apenas em massas frias. Higienize exclusivamente com água em temperatura ambiente e sabão neutro. Não utilize água quente, não leve a máquinas lava-louças e evite a exposição ao sol ou a altas temperaturas.

Aviso Visual: A cor das peças será enviada de forma aleatória, de acordo com a disponibilidade do nosso estoque no momento da separação do pedido.

Garantia: 7 dias de garantia oferecida pelo vendedor.`,
    caracteristicas: [
      ['Marca', 'N97'],
      ['Cor e padrão', 'Aleatório'],
      ['Material do carimbo', 'PLA'],
      ['Material do cabo', 'PLA'],
      ['Altura', '3.1 cm'],
      ['Diâmetro', '2 cm'],
      ['É livre de BPA', 'Sim'],
      ['É para uso de forma quente', 'Não'],
    ],
  },
  {
    id: 'kit-5-carimbos-marcadores-doces-brigadeiros-homem-aranha-ale',
    nome: 'Kit 5 Carimbos Marcadores Doces Brigadeiros Homem Aranha Aleatória Homem Aranha Aleatória',
    descricao: 'Kit Carimbos Marcadores para Doces Tema Homem-Aranha (5 Unidades).',
    categoria: 'Confeitaria',
    preco: 21,
    precoOriginal: 29,
    fotos: ['kit-5-carimbos-marcadores-doces-brigadeiros-homem-aranha-ale-1.jpg', 'kit-5-carimbos-marcadores-doces-brigadeiros-homem-aranha-ale-2.jpg', 'kit-5-carimbos-marcadores-doces-brigadeiros-homem-aranha-ale-3.jpg'],
    detalhes: `Kit Carimbos Marcadores para Doces Tema Homem-Aranha (5 Unidades)

O que você recebe: 1 Kit contendo 5 carimbos com estampas temáticas exclusivas do Homem-Aranha.

Indicação de Uso: Ferramenta ideal para personalizar brigadeiros, doces gourmet, pasta americana e massas de modelar artesanais, garantindo um visual divertido e bem definido.

Dimensões da Peça: Estrutura de base com 2 cm (comprimento e largura), altura total de 3,1 cm e profundidade de marcação de 0,5 cm.

Material e Segurança: Fabricado em plástico PLA (biodegradável). Produto 100% Livre de BPA, oferecendo total segurança para o contato direto com alimentos.

Cuidados e Conservação: O material PLA possui sensibilidade térmica e deve ser utilizado apenas em massas frias. Higienize exclusivamente com água em temperatura ambiente e sabão neutro. Não utilize água quente, máquinas lava-louças e evite a exposição ao sol ou a altas temperaturas.

Aviso Visual: A cor das peças será enviada de forma aleatória, de acordo com a disponibilidade do nosso estoque no momento da separação.

Garantia: 7 dias de garantia oferecida pelo vendedor.`,
    caracteristicas: [
      ['Marca', 'N97'],
      ['Cor e padrão', 'Aleatório'],
      ['Material do carimbo', 'PLA'],
      ['Material do cabo', 'PLA'],
      ['Altura', '3.1 cm'],
      ['Diâmetro', '2 cm'],
      ['É livre de BPA', 'Sim'],
      ['É para uso de forma quente', 'Não'],
    ],
  },
  {
    id: 'suporte-para-garrafa-coracao-namorados',
    nome: 'Suporte Para Garrafa Coração Namorados',
    descricao: 'Suporte de garrafa em formato de coração. Presente criativo para o Dia dos Namorados.',
    categoria: 'Decoração',
    preco: 19.9,
    precoOriginal: 39.8,
    fotos: ['suporte-para-garrafa-coracao-namorados-1.jpg', 'suporte-para-garrafa-coracao-namorados-2.jpg', 'suporte-para-garrafa-coracao-namorados-3.jpg', 'suporte-para-garrafa-coracao-namorados-4.jpg', 'suporte-para-garrafa-coracao-namorados-5.jpg'],
    detalhes: `Surpreenda Quem Você Ama com um Presente Inesquecível

Transforme um simples momento a dois em uma lembrança especial com este elegante Suporte para Garrafa de Vinho em formato de coração.

Com design moderno e romântico, ele acomoda a garrafa de forma criativa, criando um efeito visual impressionante que chama a atenção e deixa qualquer ambiente mais sofisticado.

Perfeito para quem deseja presentear no Dia dos Namorados e tornar um jantar, comemoração ou encontro ainda mais especial.

Um presente que demonstra carinho nos detalhes

Mais do que um suporte para garrafas, esta peça decorativa representa amor, conexão e momentos compartilhados.

Ideal para:

Dia dos Namorados
Aniversário de namoro
Aniversário de casamento
Noivado
Casais apaixonados
Decoração romântica
Destaques do Produto
Design exclusivo em formato de coração
Visual moderno e elegante
Decoração perfeita para salas, adegas e áreas gourmet
Suporte estável para garrafas de vinho
Excelente opção para presentear
Crie momentos especiais

Imagine preparar um jantar à luz de velas, servir um bom vinho e complementar a decoração com uma peça que simboliza o amor. Este suporte transforma qualquer ocasião em uma experiência mais acolhedora e memorável.

Características
Formato: Coração
Material: Plástico resistente
Cor: Vermelho
Uso: Suporte decorativo para garrafas
Estilo: Romântico e moderno
Conteúdo da Embalagem
1 Suporte para Garrafa em Formato de Coração

Observação: Garrafa de vinho utilizada nas imagens apenas para demonstração e não acompanha o produto.

Garanta o seu e surpreenda quem você ama com um presente criativo, elegante e cheio de significado neste Dia dos Namorados.

Garantia de fábrica: 7 dias`,
    caracteristicas: [
      ['Marca', 'N97'],
      ['Material', 'Plástico'],
    ],
  },
  {
    id: 'suporte-organizador-universal-parede-secador-de-cabelo',
    nome: 'Suporte Organizador Universal Parede Secador De Cabelo',
    descricao: 'Suporte de parede que deixa o secador de cabelo organizado e sempre à mão.',
    categoria: 'Decoração',
    preco: 22.99,
    precoOriginal: 45.98,
    fotos: ['suporte-organizador-universal-parede-secador-de-cabelo-1.jpg', 'suporte-organizador-universal-parede-secador-de-cabelo-2.jpg', 'suporte-organizador-universal-parede-secador-de-cabelo-3.jpg', 'suporte-organizador-universal-parede-secador-de-cabelo-4.jpg', 'suporte-organizador-universal-parede-secador-de-cabelo-5.jpg'],
    detalhes: `Atenção ao Encaixe (Medida Importante): O diâmetro interno do suporte é de 8,5 cm. Meça o corpo do seu secador e compare antes de finalizar a compra para garantir a compatibilidade exata com o seu equipamento.

Otimização de Espaço: Libera a área útil de bancadas, pias e armários. Um organizador de parede discreto e sofisticado, ideal para banheiros, lavabos, penteadeiras, salões de beleza e barbearias.

Material de Alta Performance: Fabricado em PETG, assegurando resistência térmica ao calor do secador e durabilidade contra a umidade constante do ambiente.

Instalação Segura: Fixação resistente e definitiva na parede através de buchas e parafusos, garantindo estabilidade contínua sem danificar a estrutura.

Especificações Técnicas:

Comprimento: 12 cm.

Largura: 11 cm.

Altura: 6,5 cm.

Diâmetro Interno: 8,5 cm.

Opções de Embalagem (Selecione a Versão Desejada):

Versão COM Parafuso: Inclui 1 Suporte, 2 Parafusos e 2 Buchas.

Versão SEM Parafuso: Inclui apenas 1 Suporte (ferragens não inclusas).

Envio e Condições: Estoque a pronta entrega com envio imediato via Mercado Envios para todo o Brasil. (Atenção: Este produto não possui garantia).`,
    caracteristicas: [
      ['Marca', 'N97'],
      ['Material', 'PETG'],
    ],
  },
  {
    id: 'esqueleto-dancante-caveira-aquario-decoracao-bolha-danca-beg',
    nome: 'Esqueleto Dançante Caveira Aquário Decoração Bolha Dança Bege',
    descricao: 'Enfeite Decorativo Esqueleto Dançante para Aquário.',
    categoria: 'Decoração',
    preco: 24.15,
    precoOriginal: 24.9,
    fotos: ['esqueleto-dancante-caveira-aquario-decoracao-bolha-danca-beg-1.jpg', 'esqueleto-dancante-caveira-aquario-decoracao-bolha-danca-beg-2.jpg', 'esqueleto-dancante-caveira-aquario-decoracao-bolha-danca-beg-3.jpg'],
    detalhes: `Enfeite Decorativo Esqueleto Dançante para Aquário

O que você recebe: 1 Enfeite Esqueleto Dançante.

Efeito Divertido: O esqueleto se movimenta ("dança") impulsionado pelo fluxo das bolhas de ar.

Dupla Função: Decora o ambiente e auxilia na distribuição da oxigenação da água.

Material Seguro: Fabricado em plástico PETG, 100% atóxico e inofensivo para os peixes.

Compatibilidade: Perfeito para aquários de água doce ou salgada, de todos os tamanhos.

Manutenção: Limpeza simples apenas com água corrente (nunca utilize sabão ou produtos químicos).

Aviso Importante: Para o funcionamento do movimento, é necessário conectá-lo a uma bomba de ar com mangueira de silicone (itens NÃO inclusos).`,
    caracteristicas: [
      ['Marca', 'N97'],
      ['Cor', 'Bege'],
      ['Material', 'PETG'],
      ['Altura', '16 cm'],
      ['Largura', '5 cm'],
    ],
  },
  {
    id: 'carimbos-brigadeiro-idade-1-a-9-anos-marcador-doce-tematico',
    nome: 'Carimbos Brigadeiro Idade 1 A 9 Anos Marcador Doce Temático 1 A 9 Anos',
    descricao: 'Kit Carimbos Marcadores para Doces Tema Idade 1 a 9 Anos.',
    categoria: 'Confeitaria',
    preco: 35,
    precoOriginal: 70,
    fotos: ['carimbos-brigadeiro-idade-1-a-9-anos-marcador-doce-tematico-1.jpg', 'carimbos-brigadeiro-idade-1-a-9-anos-marcador-doce-tematico-2.jpg', 'carimbos-brigadeiro-idade-1-a-9-anos-marcador-doce-tematico-3.jpg', 'carimbos-brigadeiro-idade-1-a-9-anos-marcador-doce-tematico-4.jpg', 'carimbos-brigadeiro-idade-1-a-9-anos-marcador-doce-tematico-5.jpg'],
    detalhes: `Kit Carimbos Marcadores para Doces Tema Idade 1 a 9 Anos

O que você recebe: 1 Kit contendo carimbos com estampas de numerais (1 a 9) em cor aleatória.

Indicação de Uso: Ferramenta ideal para personalizar brigadeiros, doces gourmet, lembrancinhas e produções artesanais para aniversários e datas comemorativas.

Dimensões da Peça: Altura total de 3,5 cm, diâmetro de 2,2 cm e relevo da estampa com 0,5 cm de altura (tamanho perfeitamente ajustado para doces padrão).

Benefícios para a Produção: Possui estrutura firme e de fácil manuseio que assegura marcações precisas e uniformes, facilitando a padronização e elevando o nível de acabamento profissional.

Material e Segurança: Produto 100% Livre de BPA, garantindo total segurança no manuseio e contato com alimentos.

Garantia: Este produto não possui garantia.`,
    caracteristicas: [
      ['Marca', 'N97'],
      ['Cor e padrão', 'Aleatório'],
      ['Formato de venda', 'Kit'],
      ['Quantidade de carimbos', '9'],
      ['Material do carimbo', 'Plástico'],
      ['Material do cabo', 'Plástico'],
      ['Altura', '3.5 cm'],
      ['Largura', '2.2 cm'],
      ['Comprimento', '3.5 cm'],
      ['Diâmetro', '2 cm'],
      ['É livre de BPA', 'Sim'],
    ],
  },
  {
    id: 'carimbos-brigadeiro-alfabeto-inicial-nome-26-letras-marcador',
    nome: 'Carimbos Brigadeiro Alfabeto Inicial Nome 26 Letras Marcador Letras',
    descricao: 'Kit Carimbos Marcadores para Doces Alfabeto Cursivo (26 Unidades).',
    categoria: 'Confeitaria',
    preco: 37.9,
    precoOriginal: 39.9,
    fotos: ['carimbos-brigadeiro-alfabeto-inicial-nome-26-letras-marcador-1.jpg', 'carimbos-brigadeiro-alfabeto-inicial-nome-26-letras-marcador-2.jpg', 'carimbos-brigadeiro-alfabeto-inicial-nome-26-letras-marcador-3.jpg', 'carimbos-brigadeiro-alfabeto-inicial-nome-26-letras-marcador-4.jpg'],
    detalhes: `Kit Carimbos Marcadores para Doces Alfabeto Cursivo (26 Unidades)

O que você recebe: 1 Kit completo contendo 26 carimbos correspondentes a todas as letras do alfabeto (do A ao Z) em fonte cursiva.

Indicação de Uso: Ferramenta ideal para personalizar brigadeiros, beijinhos, doces finos e fondants para eventos como maternidade, casamentos, batizados, aniversários e brindes corporativos.

Dimensões da Peça: Altura total de 3,5 cm, diâmetro da base de 2,2 cm (tamanho perfeito para doces a partir de 15g) e relevo da letra com 0,5 cm de altura.

Benefícios para a Produção: Apresenta design elegante com fonte cursiva delicada (estilo hand lettering). Possui formato anatômico com pegada ergonômica que garante conforto e firmeza, permitindo carimbar centenas de doces com rapidez. O relevo é perfeitamente calculado para deixar a letra bem definida e legível, sem amassar ou deformar a sua produção.

Dica de Uso: Para um acabamento impecável e para evitar que a massa grude, passe a ponta do carimbo levemente no leite em pó, açúcar de confeiteiro, glitter comestível ou em um pouco de desmoldante antes de pressionar sobre o doce.

Material e Segurança: Fabricado em plástico de alta resistência e durabilidade. Produto totalmente seguro para uso culinário, atóxico e 100% Livre de BPA.

Manutenção e Limpeza: Para preservar a integridade das peças, lave delicadamente com água fria ou morna, utilizando sabão neutro e o lado macio da esponja. Não utilize máquinas lava-louças e não exponha o material a altas temperaturas.`,
    caracteristicas: [
      ['Marca', 'N97'],
      ['Cor e padrão', 'Aleatório'],
      ['Formato de venda', 'Kit'],
      ['Quantidade de carimbos', '26'],
      ['Material do carimbo', 'PLA'],
      ['Material do cabo', 'Plástico'],
      ['Altura', '3.5 cm'],
      ['Largura', '2.2 cm'],
      ['Comprimento', '0.5 mm'],
      ['É livre de BPA', 'Sim'],
      ['É para uso de forma quente', 'Não'],
    ],
  },
  {
    id: 'kit-5-carimbos-tema-fundo-do-mar-brigadeiros-massas',
    nome: 'Kit 5 Carimbos Tema Fundo Do Mar Brigadeiros Massas',
    descricao: 'Kit Carimbos Marcadores para Doces Tema Fundo do Mar (5 Unidades).',
    categoria: 'Confeitaria',
    preco: 19.99,
    precoOriginal: 30,
    fotos: ['kit-5-carimbos-tema-fundo-do-mar-brigadeiros-massas-1.jpg', 'kit-5-carimbos-tema-fundo-do-mar-brigadeiros-massas-2.jpg', 'kit-5-carimbos-tema-fundo-do-mar-brigadeiros-massas-3.jpg', 'kit-5-carimbos-tema-fundo-do-mar-brigadeiros-massas-4.jpg', 'kit-5-carimbos-tema-fundo-do-mar-brigadeiros-massas-5.jpg'],
    detalhes: `Kit Carimbos Marcadores para Doces Tema Fundo do Mar (5 Unidades)

O que você recebe: 1 Kit contendo 5 carimbos com estampas temáticas exclusivas referentes ao tema Fundo do Mar.

Indicação de Uso: Ferramenta ideal para decorar brigadeiros, docinhos gourmet, biscoitos, pasta americana e biscuit, garantindo um acabamento sofisticado e profissional para a sua produção.

Modo de Usar: Processo prático e rápido. Basta encaixar o bastão no desenho desejado e pressionar levemente sobre o doce ou massa para obter uma marcação nítida e personalizada.

Material e Segurança: Fabricado em plástico resistente de alta qualidade. Produto com acabamento estético impecável e totalmente seguro para o contato direto com alimentos.

Manutenção e Limpeza: Para preservar a integridade e durabilidade das peças, higienize exclusivamente com água em temperatura ambiente e sabão neutro. Não utilize água quente, máquinas lava-louças ou produtos abrasivos.`,
    caracteristicas: [
      ['Marca', 'N97'],
      ['Cor e padrão', 'Aleatório'],
      ['É livre de BPA', 'Não'],
      ['É para uso de forma quente', 'Não'],
    ],
  },
  {
    id: 'modelador-ejetor-patinha-modelar-doces-brigadeiro',
    nome: 'Modelador Ejetor Patinha Modelar Doces Brigadeiro',
    descricao: 'O Modelador de Brigadeiro Ursinho é a ferramenta perfeita para quem trabalha com brigadeiros e deseja resultados profissionais.…',
    categoria: 'Confeitaria',
    preco: 22,
    precoOriginal: 32,
    fotos: ['modelador-ejetor-patinha-modelar-doces-brigadeiro-1.jpg', 'modelador-ejetor-patinha-modelar-doces-brigadeiro-2.jpg', 'modelador-ejetor-patinha-modelar-doces-brigadeiro-3.jpg', 'modelador-ejetor-patinha-modelar-doces-brigadeiro-4.jpg', 'modelador-ejetor-patinha-modelar-doces-brigadeiro-5.jpg'],
    detalhes: `MODELADOR PATINHA
O Modelador de Brigadeiro Ursinho é a ferramenta perfeita para quem trabalha com brigadeiros e deseja resultados profissionais. Suas aplicações em alta definição garantem um acabamento impecável, elevando a qualidade do seu trabalho.
Versátil, pode ser utilizado não apenas para brigadeiros, mas também na produção de biscoitos, salgados e massas decorativas em geral. Fabricado com material atóxico e totalmente seguro para uso alimentício, proporciona tranquilidade ao criar delícias para seus clientes.
Além de resistente, é super prático e fácil de usar, tornando-se uma ferramenta quase indispensável na decoração de bolos e doces. Fácil de limpar, é um item que une eficiência e praticidade no seu dia a dia na confeitaria.

Quantidade: 2 peças
Composição: PLA

Somos a LOJA DA CONFEITEIRA CRIATIVA.
Aqui você vai encontrar moldes, ejetores, corantes, formas, ferramentas e utensílios. Tudo reunido em um só lugar e com o melhor preço da internet!

Garantia do vendedor: 3 meses`,
    caracteristicas: [
      ['Marca', 'N97'],
    ],
  },
  {
    id: 'kit-5-carimbos-fazendinha-p-doces-brigadeiro',
    nome: 'Kit 5 Carimbos Fazendinha P/ Doces Brigadeiro',
    descricao: 'Kit Carimbos Marcadores para Doces Tema Fazendinha (5 Unidades).',
    categoria: 'Confeitaria',
    preco: 32,
    precoOriginal: 64,
    fotos: ['kit-5-carimbos-fazendinha-p-doces-brigadeiro-1.jpg', 'kit-5-carimbos-fazendinha-p-doces-brigadeiro-2.jpg', 'kit-5-carimbos-fazendinha-p-doces-brigadeiro-3.jpg', 'kit-5-carimbos-fazendinha-p-doces-brigadeiro-4.jpg', 'kit-5-carimbos-fazendinha-p-doces-brigadeiro-5.jpg'],
    detalhes: `Kit Carimbos Marcadores para Doces Tema Fazendinha (5 Unidades)

O que você recebe: 1 Kit contendo 5 carimbos com estampas temáticas exclusivas referentes ao tema Fazendinha.

Indicação de Uso: Ferramenta ideal para personalizar brigadeiros, docinhos gourmet, biscoitos, pasta americana e biscuit, garantindo um acabamento sofisticado e profissional para a sua produção.

Modo de Usar: Processo prático e rápido. Basta encaixar o bastão no desenho desejado e pressionar suavemente sobre o doce ou massa para obter uma marcação nítida.

Material e Segurança: Fabricado em plástico resistente de alta qualidade. Produto com acabamento estético impecável e totalmente seguro para o contato direto com alimentos.

Manutenção e Limpeza: Para preservar a integridade e durabilidade das peças, higienize exclusivamente com água em temperatura ambiente e sabão neutro. Não utilize água quente, máquinas lava-louças ou produtos abrasivos.`,
    caracteristicas: [
      ['Marca', 'N97'],
      ['Cor e padrão', 'Aleatório'],
      ['É livre de BPA', 'Não'],
      ['É para uso de forma quente', 'Não'],
    ],
  },
  {
    id: 'marcado-fatias-perfeitas-festival-bolo-cake-30x10x2-5cm',
    nome: 'Marcado Fatias Perfeitas Festival Bolo Cake 30x10x2,5cm',
    descricao: 'Marcador para Fatias de Bolo Slice Cake 30x10x2,5cm (1 Unidade).',
    categoria: 'Confeitaria',
    preco: 69,
    precoOriginal: 138,
    fotos: ['marcado-fatias-perfeitas-festival-bolo-cake-30x10x2-5cm-1.jpg', 'marcado-fatias-perfeitas-festival-bolo-cake-30x10x2-5cm-2.jpg', 'marcado-fatias-perfeitas-festival-bolo-cake-30x10x2-5cm-3.jpg', 'marcado-fatias-perfeitas-festival-bolo-cake-30x10x2-5cm-4.jpg', 'marcado-fatias-perfeitas-festival-bolo-cake-30x10x2-5cm-5.jpg'],
    detalhes: `Marcador para Fatias de Bolo Slice Cake 30x10x2,5cm (1 Unidade)

O que você recebe: 1 Marcador de fatias (forma) no formato retangular, com as dimensões de 30 cm x 10 cm x 2,5 cm.

Indicação de Uso: Ferramenta ideal para o porcionamento padronizado de bolos tipo slice cake, sendo perfeita para uso comercial por confeiteiros e padarias, bem como para uso doméstico.

Benefícios para a Produção: O design funcional adapta-se perfeitamente ao formato do bolo, auxiliando no alinhamento correto do corte. Permite dividir as fatias de forma uniforme, rápida e prática, garantindo máxima precisão e uma apresentação com padrão de acabamento profissional.

Material e Segurança: Fabricado com material de alta resistência e durabilidade, projetado para o uso contínuo nas preparações.

Manutenção e Limpeza: Para preservar a integridade da peça, recomenda-se a higienização simples com água em temperatura ambiente e sabão neutro.

Garantia: 3 meses de garantia oferecida pelo vendedor.`,
    caracteristicas: [
      ['Marca', 'N97'],
      ['Material', 'Plástico'],
      ['Diâmetro', '10 cm'],
    ],
  },
  {
    id: 'kit-6-carimbos-p-brigadeiro-super-herois-marcador-aleatorio',
    nome: 'Kit 6 Carimbos P Brigadeiro Super Herois Marcador Aleatório Super-heróis',
    descricao: 'Kit Carimbos Marcadores para Doces Tema Super-Heróis (6 Unidades).',
    categoria: 'Confeitaria',
    preco: 19.02,
    precoOriginal: 29,
    fotos: ['kit-6-carimbos-p-brigadeiro-super-herois-marcador-aleatorio-1.jpg', 'kit-6-carimbos-p-brigadeiro-super-herois-marcador-aleatorio-2.jpg', 'kit-6-carimbos-p-brigadeiro-super-herois-marcador-aleatorio-3.jpg'],
    detalhes: `Kit Carimbos Marcadores para Doces Tema Super-Heróis (6 Unidades)

O que você recebe: 1 Kit contendo 6 carimbos com estampas exclusivas de heróis (Superman, Homem-Aranha, Batman, Capitão América, Homem de Ferro e Lanterna Verde).

Indicação de Uso: Ferramenta ideal para personalizar brigadeiros e doces em geral, agregando um visual divertido e elegante para festas infantis e eventos temáticos.

Dimensões da Peça: O desenho possui medida entre 1,5 cm e 1,9 cm, com profundidade máxima de marcação de 0,5 cm (tamanho perfeitamente ajustado para doces padrão).

Benefícios para a Produção: Conta com cabo ergonômico que facilita o manuseio, tornando o processo de decoração simples, rápido e garantindo marcações precisas.

Material e Segurança: Fabricado em plástico PLA premium, que oferece alta resistência e durabilidade. Produto 100% Livre de BPA, garantindo total segurança no contato direto com os alimentos.

Aviso Visual: A cor dos carimbos pode variar de acordo com a disponibilidade do nosso estoque no momento da separação.`,
    caracteristicas: [
      ['Marca', 'N97'],
      ['Cor e padrão', 'Aleatório'],
      ['Formato de venda', 'Unidade'],
      ['Quantidade de carimbos', '1'],
      ['Material do carimbo', 'Plástico'],
      ['Material do cabo', 'Plástico'],
      ['Largura', '1.9 cm'],
      ['Comprimento', '1.9 cm'],
      ['É livre de BPA', 'Sim'],
      ['É para uso de forma quente', 'Não'],
    ],
  },
  {
    id: 'kit-7-carimbos-princesas-brigadeiro-doces-personagens-aleato',
    nome: 'Kit 7 Carimbos Princesas Brigadeiro Doces Personagens Aleatório Princesa',
    descricao: 'Kit Carimbos Marcadores para Doces Tema Princesas (7 Unidades).',
    categoria: 'Confeitaria',
    preco: 19.04,
    precoOriginal: 34,
    fotos: ['kit-7-carimbos-princesas-brigadeiro-doces-personagens-aleato-1.jpg', 'kit-7-carimbos-princesas-brigadeiro-doces-personagens-aleato-2.jpg', 'kit-7-carimbos-princesas-brigadeiro-doces-personagens-aleato-3.jpg', 'kit-7-carimbos-princesas-brigadeiro-doces-personagens-aleato-4.jpg', 'kit-7-carimbos-princesas-brigadeiro-doces-personagens-aleato-5.jpg'],
    detalhes: `Kit Carimbos Marcadores para Doces Tema Princesas (7 Unidades)

O que você recebe: 1 Kit contendo 7 carimbos com estampas temáticas exclusivas referentes ao tema Princesas.

Indicação de Uso: Ferramenta ideal para personalizar brigadeiros, docinhos gourmet, biscoitos, pasta americana e biscuit, garantindo um acabamento sofisticado e profissional para a sua produção.

Modo de Usar: Processo prático e rápido. Basta encaixar o bastão no desenho desejado e pressionar suavemente sobre o doce ou massa para obter uma marcação nítida.

Dimensões da Peça: Altura total de 3,5 cm, diâmetro de 2,2 cm, com o tamanho do desenho de até 2,2 cm e profundidade de marcação de 0,5 cm.

Material e Segurança: Fabricado em plástico resistente de alta qualidade. Produto com acabamento estético impecável, totalmente seguro para o contato direto com alimentos e 100% Livre de BPA.

Manutenção e Limpeza: Para preservar a integridade e durabilidade das peças, higienize exclusivamente com água em temperatura ambiente e sabão neutro. Não utilize água quente, máquinas lava-louças ou produtos abrasivos, e evite a exposição a altas temperaturas.`,
    caracteristicas: [
      ['Marca', 'N97'],
      ['Cor e padrão', 'Aleatório'],
      ['Formato de venda', 'Kit'],
      ['Quantidade de carimbos', '7'],
      ['Material do carimbo', 'PLA'],
      ['Material do cabo', 'PLA'],
      ['Altura', '3 cm'],
      ['Largura', '3 cm'],
      ['Comprimento', '3 cm'],
      ['Diâmetro', '2 cm'],
      ['É livre de BPA', 'Sim'],
    ],
  },
  {
    id: 'kit-3-modeladores-aranha-ejetores-brigadeiro-doce-massa',
    nome: 'Kit 3 Modeladores Aranha Ejetores Brigadeiro Doce Massa',
    descricao: 'Dê um toque especial e profissional aos seus brigadeiros, beijinhos e biscoitos com nossos modeladores. Projetado para quem busca…',
    categoria: 'Confeitaria',
    preco: 35,
    precoOriginal: 99,
    fotos: ['kit-3-modeladores-aranha-ejetores-brigadeiro-doce-massa-1.jpg', 'kit-3-modeladores-aranha-ejetores-brigadeiro-doce-massa-2.jpg', 'kit-3-modeladores-aranha-ejetores-brigadeiro-doce-massa-3.jpg', 'kit-3-modeladores-aranha-ejetores-brigadeiro-doce-massa-4.jpg', 'kit-3-modeladores-aranha-ejetores-brigadeiro-doce-massa-5.jpg'],
    detalhes: `MODELADOR EJETOR ARANHA
O kit contém:
 1 ejetor aranha
1 ejetor homem aranha
1 ejetor teia

 Dê um toque especial e profissional aos seus brigadeiros, beijinhos e biscoitos com nossos modeladores. Projetado para quem busca praticidade e perfeição, este modelador transforma suas criações em verdadeiros encantos, com um efeito 3D irresistível que vai impressionar a todos!

Versatilidade de Uso: Ideal para modelar doces, massas e muito mais, como: Brigadeiros; Beijinhos; Biscoitos e Massas como pasta americana, fondant e pasta de açúcar.

Por Que Escolher Nosso Modelador?
 Alta Qualidade e Resistência: Feito de plástico resistente e livre de BPA, garante durabilidade mesmo após várias utilizações. Fácil de Usar: Coloque a massa no modelador, pressione e em segundos seus doces estarão prontos para encantar! Sem Bagunça, Sem Grudar: O acabamento especial facilita a limpeza, economizando seu tempo e esforço. Ergonomia e Precisão: Com design ergonômico, proporciona firmeza durante o uso, permitindo um trabalho rápido e eficiente. Encaixe Perfeito: Molda os doces de forma impecável e solta facilmente, mantendo a forma.

 Com esse modelador você garante que cada doce saia perfeito e uniforme, ideal para festas, eventos ou até mesmo para vender. Impressione seus clientes com doces lindamente decorados, sem esforço, e conquiste um acabamento profissional em cada criação!

- Quantidade: 3 ejetores

- Tamanho da peça pronta: 3cm x 3,5cm

- Composição: Plástico PLA (Biopolímero Ácido Poliláctico) - material biodegradável, feito de amido de milho e outros materiais naturais, seguro para alimentos.

Modelador para Brigadeiros de 15g a 22g

MIMO CORTADORES
Aqui você encontra tudo o que precisa para criar, inovar e dar vida às suas ideias. Conheça nossos produtos e transforme seus doces em verdadeiras obras de arte.

Aviso legal
É livre de BPA.

Garantia do vendedor: 3 meses`,
    caracteristicas: [
      ['Marca', 'N97'],
      ['Material do carimbo', 'PLA'],
      ['Material do cabo', 'PLA'],
      ['Altura', '2 cm'],
      ['Largura', '3 cm'],
      ['Comprimento', '3 cm'],
      ['É livre de BPA', 'Sim'],
      ['É para uso de forma quente', 'Não'],
    ],
  },
  {
    id: 'kit-2-moldes-ejetores-branquinha-vestido',
    nome: 'Kit 2 Moldes Ejetores Branquinha Vestido',
    descricao: '2 moldes ejetores em formato de vestido para brigadeiros, beijinhos e biscoitos.',
    categoria: 'Confeitaria',
    preco: 24,
    precoOriginal: 34.99,
    fotos: ['kit-2-moldes-ejetores-branquinha-vestido-1.jpg', 'kit-2-moldes-ejetores-branquinha-vestido-2.jpg', 'kit-2-moldes-ejetores-branquinha-vestido-3.jpg', 'kit-2-moldes-ejetores-branquinha-vestido-4.jpg'],
    detalhes: `MODELADOR EJETOR VESTIDO BRANQUINHA Dê um toque especial e profissional aos seus brigadeiros, beijinhos e biscoitos com nossos modeladores. Projetado para quem busca praticidade e perfeição, este modelador transforma suas criações em verdadeiros encantos, com um efeito 3D irresistível que vai impressionar a todos! Versatilidade de Uso: Ideal para modelar doces, massas e muito mais, como: Brigadeiros; Beijinhos; Biscoitos e Massas como pasta americana, fondant e pasta de açúcar.
Por Que Escolher Nosso Modelador?
 Alta Qualidade e Resistência: Feito de plástico resistente e livre de BPA, garante durabilidade mesmo após várias utilizações. Fácil de Usar: Coloque a massa no modelador, pressione e em segundos seus doces estarão prontos para encantar! Sem Bagunça, Sem Grudar: O acabamento especial facilita a limpeza, economizando seu tempo e esforço. Ergonomia e Precisão: Com design ergonômico, proporciona firmeza durante o uso, permitindo um trabalho rápido e eficiente. Encaixe Perfeito: Molda os doces de forma impecável e solta facilmente, mantendo a forma.
 Com esse modelador você garante que cada doce saia perfeito e uniforme, ideal para festas, eventos ou até mesmo para vender. Impressione seus clientes com doces lindamente decorados, sem esforço, e conquiste um acabamento profissional em cada criação!
- Quantidade: 2 peças
- Tamanho da peça pronta: 3,5cm x 3,2cm
- Composição: Plástico PLA (Biopolímero Ácido Poliláctico) - material biodegradável, feito de amido de milho e outros materiais naturais, seguro para alimentos.
Modelador para Brigadeiros de 15g a 22g

Aviso legal
É livre de BPA.

Sem garantia`,
    caracteristicas: [
      ['Marca', 'N97'],
      ['Material do carimbo', 'PLA'],
      ['Material do cabo', 'PLA'],
      ['Altura', '3 cm'],
      ['Largura', '6 cm'],
      ['Comprimento', '6 cm'],
      ['É livre de BPA', 'Sim'],
      ['É para uso de forma quente', 'Não'],
    ],
  },
  {
    id: 'kit-2-modeladores-ejetores-aranha-brigadeiro-doce-biscoito',
    nome: 'Kit 2 Modeladores Ejetores Aranha Brigadeiro Doce Biscoito',
    descricao: 'Dê um toque especial e profissional aos seus brigadeiros, beijinhos e biscoitos com nossos modeladores.',
    categoria: 'Confeitaria',
    preco: 27.95,
    precoOriginal: 34.94,
    fotos: ['kit-2-modeladores-ejetores-aranha-brigadeiro-doce-biscoito-1.jpg', 'kit-2-modeladores-ejetores-aranha-brigadeiro-doce-biscoito-2.jpg', 'kit-2-modeladores-ejetores-aranha-brigadeiro-doce-biscoito-3.jpg', 'kit-2-modeladores-ejetores-aranha-brigadeiro-doce-biscoito-4.jpg', 'kit-2-modeladores-ejetores-aranha-brigadeiro-doce-biscoito-5.jpg'],
    detalhes: `MODELADOR EJETOR ARANHA

Dê um toque especial e profissional aos seus brigadeiros, beijinhos e biscoitos com nossos modeladores.

Projetado para quem busca praticidade e perfeição, este modelador transforma suas criações em verdadeiros encantos, com um efeito 3D irresistível que vai impressionar a todos!

Versatilidade de Uso: Ideal para modelar doces, massas e muito mais, como: Brigadeiros; Beijinhos; Biscoitos e Massas como pasta americana, fondant e pasta de açúcar.

Por Que Escolher Nosso Modelador?
 Alta Qualidade e Resistência: Feito de plástico resistente e livre de BPA, garante durabilidade mesmo após várias utilizações. Fácil de Usar: Coloque a massa no modelador, pressione e em segundos seus doces estarão prontos para encantar! Sem Bagunça, Sem Grudar: O acabamento especial facilita a limpeza, economizando seu tempo e esforço. Ergonomia e Precisão: Com design ergonômico, proporciona firmeza durante o uso, permitindo um trabalho rápido e eficiente. Encaixe Perfeito: Molda os doces de forma impecável e solta facilmente, mantendo a forma.

 Com esse modelador você garante que cada doce saia perfeito e uniforme, ideal para festas, eventos ou até mesmo para vender. Impressione seus clientes com doces lindamente decorados, sem esforço, e conquiste um acabamento profissional em cada criação!

- Quantidade: 2 ejetores

- Tamanho da peça pronta: 3cm x 3,5cm

- Composição: Plástico PLA (Biopolímero Ácido Poliláctico) - material biodegradável, feito de amido de milho e outros materiais naturais, seguro para alimentos.

Modelador para Brigadeiros de 15g a 22g

MIMO CORTADORES
Aqui você encontra tudo o que precisa para criar, inovar e dar vida às suas ideias. Conheça nossos produtos e transforme seus doces em verdadeiras obras de arte.

Aviso legal
É livre de BPA.

Garantia do vendedor: 3 meses`,
    caracteristicas: [
      ['Marca', 'N97'],
      ['Material do carimbo', 'PLA'],
      ['Material do cabo', 'PLA'],
      ['Altura', '2 cm'],
      ['Largura', '3 cm'],
      ['Comprimento', '3 cm'],
      ['É livre de BPA', 'Sim'],
      ['É para uso de forma quente', 'Não'],
    ],
  },
  {
    id: 'kit-6-carimbos-brigadeiro-doce-medicina-com-amor-aleatorio-m',
    nome: 'Kit 6 Carimbos Brigadeiro Doce Medicina Com Amor Aleatório Medicina',
    descricao: 'Kit Carimbos Marcadores para Doces Tema Medicina (6 Unidades).',
    categoria: 'Confeitaria',
    preco: 19.05,
    precoOriginal: 41,
    fotos: ['kit-6-carimbos-brigadeiro-doce-medicina-com-amor-aleatorio-m-1.jpg', 'kit-6-carimbos-brigadeiro-doce-medicina-com-amor-aleatorio-m-2.jpg', 'kit-6-carimbos-brigadeiro-doce-medicina-com-amor-aleatorio-m-3.jpg', 'kit-6-carimbos-brigadeiro-doce-medicina-com-amor-aleatorio-m-4.jpg', 'kit-6-carimbos-brigadeiro-doce-medicina-com-amor-aleatorio-m-5.jpg'],
    detalhes: `Kit Carimbos Marcadores para Doces Tema Medicina (6 Unidades)

O que você recebe: 1 Kit contendo 6 carimbos com estampas temáticas exclusivas referentes ao tema Medicina (Medicina com Amor).

Indicação de Uso: Ferramenta ideal para personalizar brigadeiros, docinhos gourmet, biscoitos, pasta americana e biscuit, garantindo um acabamento sofisticado e profissional para a sua produção.

Modo de Usar: Processo prático e rápido. Basta encaixar o bastão no desenho desejado e pressionar suavemente sobre o doce ou massa para obter uma marcação nítida.

Dimensões da Peça: Altura total de 3,5 cm, diâmetro de 2,2 cm, com o tamanho do desenho de até 2,2 cm e profundidade de marcação de 0,5 cm.

Material e Segurança: Fabricado em plástico resistente de alta qualidade. Produto com acabamento estético impecável, totalmente seguro para o contato direto com alimentos e 100% Livre de BPA.

Manutenção e Limpeza: Para preservar a integridade e durabilidade das peças, higienize exclusivamente com água em temperatura ambiente e sabão neutro. Não utilize água quente, máquinas lava-louças ou produtos abrasivos, e evite a exposição a altas temperaturas.`,
    caracteristicas: [
      ['Marca', 'N97'],
      ['Cor e padrão', 'Aleatório'],
      ['Formato de venda', 'Kit'],
      ['Quantidade de carimbos', '6'],
      ['Material do carimbo', 'PLA'],
      ['Material do cabo', 'PLA'],
      ['Altura', '3 cm'],
      ['Largura', '3 cm'],
      ['Comprimento', '3 cm'],
      ['Diâmetro', '2 cm'],
      ['É livre de BPA', 'Sim'],
      ['É para uso de forma quente', 'Não'],
    ],
  },
  {
    id: 'modelador-ejetor-borboleta-modelar-brigadeiro-doces-multicol',
    nome: 'Modelador Ejetor Borboleta Modelar Brigadeiro Doces Multicolorido (rosa, Vermelho, Bege, Lilás) Borboleta',
    descricao: 'Kit Modelador de Brigadeiro Tema Borboleta (2 Peças).',
    categoria: 'Confeitaria',
    preco: 22,
    precoOriginal: 32,
    fotos: ['modelador-ejetor-borboleta-modelar-brigadeiro-doces-multicol-1.jpg', 'modelador-ejetor-borboleta-modelar-brigadeiro-doces-multicol-2.jpg', 'modelador-ejetor-borboleta-modelar-brigadeiro-doces-multicol-3.jpg', 'modelador-ejetor-borboleta-modelar-brigadeiro-doces-multicol-4.jpg', 'modelador-ejetor-borboleta-modelar-brigadeiro-doces-multicol-5.jpg'],
    detalhes: `Kit Modelador de Brigadeiro Tema Borboleta (2 Peças)

O que você recebe: 1 Kit contendo 2 peças modeladoras com design de Borboleta em alta definição

Indicação de Uso: Ferramenta ideal para personalizar brigadeiros com peso entre 15g e 22g, garantindo um acabamento impecável e profissional na decoração dos seus doces.

Benefícios para a Produção: Super prático e de fácil manuseio, une eficiência e praticidade no dia a dia da confeitaria, otimizando o tempo e elevando a qualidade visual do seu trabalho.

Material e Segurança: Fabricado em plástico PLA. Produto totalmente atóxico e 100% seguro para o contato direto com alimentos (Livre de BPA).

Cuidados e Conservação: O material PLA possui sensibilidade térmica e deve ser utilizado apenas com massas frias. Higienize exclusivamente com água em temperatura ambiente e sabão neutro. Não utilize água quente, não leve a máquinas lava-louças e evite a exposição ao sol ou a altas temperaturas.`,
    caracteristicas: [
      ['Marca', 'N97'],
      ['Cor', 'Multicolorido (rosa, vermelho, bege, lilás)'],
      ['Formato de venda', 'Unidade'],
      ['Quantidade de carimbos', '1'],
      ['Material do carimbo', 'PLA'],
      ['É livre de BPA', 'Sim'],
      ['É para uso de forma quente', 'Não'],
    ],
  },
  {
    id: 'kit-6-carimbos-de-repente-30-doces-brigadeiro-aleatoria-de-r',
    nome: 'Kit 6 Carimbos De Repente 30 Doces Brigadeiro Aleatória De Repente 30',
    descricao: 'Kit Carimbos Marcadores para Doces Tema De Repente 30 (6 Unidades).',
    categoria: 'Confeitaria',
    preco: 19,
    precoOriginal: 41,
    fotos: ['kit-6-carimbos-de-repente-30-doces-brigadeiro-aleatoria-de-r-1.jpg', 'kit-6-carimbos-de-repente-30-doces-brigadeiro-aleatoria-de-r-2.jpg', 'kit-6-carimbos-de-repente-30-doces-brigadeiro-aleatoria-de-r-3.jpg', 'kit-6-carimbos-de-repente-30-doces-brigadeiro-aleatoria-de-r-4.jpg', 'kit-6-carimbos-de-repente-30-doces-brigadeiro-aleatoria-de-r-5.jpg'],
    detalhes: `Kit Carimbos Marcadores para Doces Tema De Repente 30 (6 Unidades)
• O que você recebe: 1 Kit contendo 6 carimbos com estampas temáticas exclusivas referentes ao tema "De Repente 30".
• Indicação de Uso: Ferramenta ideal para personalizar brigadeiros, docinhos gourmet, biscoitos, pasta americana e biscuit, garantindo um acabamento sofisticado e profissional para a sua produção.
• Modo de Usar: Processo prático e rápido. Basta encaixar o bastão no desenho desejado e pressionar suavemente sobre o doce ou massa para obter uma marcação nítida.
• Dimensões da Peça: Altura total de 3,5 cm, diâmetro de 2,2 cm, com o tamanho do desenho de até 2,2 cm e profundidade de marcação de 0,5 cm.
• Material e Segurança: Fabricado em plástico resistente de alta qualidade. Produto com acabamento estético impecável, totalmente seguro para contato direto com alimentos e 100% Livre de BPA.
• Manutenção e Limpeza: Para preservar a integridade e durabilidade das peças, higienize exclusivamente com água em temperatura ambiente e sabão neutro. Não utilize água quente, máquinas lava-louças ou produtos abrasivos, e evite a exposição a altas temperaturas.`,
    caracteristicas: [
      ['Marca', 'N97'],
      ['Cor e padrão', 'Aleatório'],
      ['Formato de venda', 'Kit'],
      ['Quantidade de carimbos', '6'],
      ['Material do carimbo', 'PLA'],
      ['Material do cabo', 'PLA'],
      ['Altura', '3 cm'],
      ['Largura', '3 cm'],
      ['Comprimento', '3 cm'],
      ['Diâmetro', '2 cm'],
      ['É livre de BPA', 'Sim'],
    ],
  },
  {
    id: 'kit-6-carimbos-tema-rei-leao-brigadeiro-doces-aleatorio-rei',
    nome: 'Kit 6 Carimbos Tema Rei Leão Brigadeiro Doces Aleatório Rei Leão',
    descricao: 'Kit Carimbos Marcadores para Doces Tema Rei Leão (6 Unidades).',
    categoria: 'Confeitaria',
    preco: 19,
    precoOriginal: 32,
    fotos: ['kit-6-carimbos-tema-rei-leao-brigadeiro-doces-aleatorio-rei-1.jpg', 'kit-6-carimbos-tema-rei-leao-brigadeiro-doces-aleatorio-rei-2.jpg', 'kit-6-carimbos-tema-rei-leao-brigadeiro-doces-aleatorio-rei-3.jpg', 'kit-6-carimbos-tema-rei-leao-brigadeiro-doces-aleatorio-rei-4.jpg', 'kit-6-carimbos-tema-rei-leao-brigadeiro-doces-aleatorio-rei-5.jpg'],
    detalhes: `Kit Carimbos Marcadores para Doces Tema Rei Leão (6 Unidades)

O que você recebe: 1 Kit contendo 6 carimbos com estampas temáticas exclusivas referentes ao tema Rei Leão.

Indicação de Uso: Ferramenta ideal para personalizar brigadeiros, docinhos gourmet, biscoitos, pasta americana e biscuit, garantindo um acabamento sofisticado e profissional para a sua produção.

Modo de Usar: Processo prático e rápido. Basta encaixar o bastão no desenho desejado e pressionar suavemente sobre o doce ou massa para obter uma marcação nítida.

Material e Segurança: Fabricado em plástico resistente de alta qualidade. Produto com acabamento estético impecável, totalmente seguro para o contato direto com alimentos e 100% Livre de BPA.

Manutenção e Limpeza: Para preservar a integridade e durabilidade das peças, higienize exclusivamente com água em temperatura ambiente e sabão neutro. Não utilize água quente, máquinas lava-louças ou produtos abrasivos.`,
    caracteristicas: [
      ['Marca', 'N97'],
      ['Cor e padrão', 'Aleatório'],
      ['Formato de venda', 'Kit'],
      ['Quantidade de carimbos', '6'],
      ['Material do carimbo', 'PLA'],
      ['Material do cabo', 'PLA'],
      ['Altura', '3 cm'],
      ['Largura', '3 cm'],
      ['Comprimento', '3 cm'],
      ['Diâmetro', '2 cm'],
      ['É livre de BPA', 'Sim'],
      ['É para uso de forma quente', 'Não'],
    ],
  },
  {
    id: 'kit-4-cortadores-molduras-massa-biscuit',
    nome: 'Kit 4 Cortadores Molduras Massa Biscuit',
    descricao: 'Kit Cortadores para Doces Formato Molduras (4 Unidades).',
    categoria: 'Confeitaria',
    preco: 29.9,
    precoOriginal: 49,
    fotos: ['kit-4-cortadores-molduras-massa-biscuit-1.jpg', 'kit-4-cortadores-molduras-massa-biscuit-2.jpg', 'kit-4-cortadores-molduras-massa-biscuit-3.jpg', 'kit-4-cortadores-molduras-massa-biscuit-4.jpg'],
    detalhes: `Kit Cortadores para Doces Formato Molduras (4 Unidades)

O que você recebe: 1 Kit contendo 4 cortadores com designs variados de molduras.

Indicação de Uso: Ferramenta ideal para o corte preciso de pasta americana, biscuit e massas em geral, perfeita para a criação e decoração de biscoitos e doces finos.

Benefícios para a Produção: Estrutura prática que possibilita a padronização das peças, assegurando um acabamento sofisticado e profissional para as suas criações.

Material e Segurança: Fabricado em plástico de alta resistência. Produto totalmente seguro para o manuseio e contato direto com alimentos.

Manutenção e Limpeza: Para preservar a integridade e durabilidade do material, higienize exclusivamente com água em temperatura ambiente e sabão neutro. Não utilize água quente, máquinas lava-louças ou produtos abrasivos.`,
    caracteristicas: [
      ['Marca', 'N97'],
      ['É apto para lava-louças', 'Não'],
    ],
  },
  {
    id: 'kit-6-carimbos-15-anos-brigadeiro-aniversario-marcador-doce',
    nome: 'Kit 6 Carimbos 15 Anos Brigadeiro Aniversário Marcador Doce Aleatório 15 Anos',
    descricao: 'Kit Carimbos Marcadores para Doces Tema 15 Anos (6 Unidades).',
    categoria: 'Confeitaria',
    preco: 19.03,
    precoOriginal: 32,
    fotos: ['kit-6-carimbos-15-anos-brigadeiro-aniversario-marcador-doce-1.jpg', 'kit-6-carimbos-15-anos-brigadeiro-aniversario-marcador-doce-2.jpg', 'kit-6-carimbos-15-anos-brigadeiro-aniversario-marcador-doce-3.jpg', 'kit-6-carimbos-15-anos-brigadeiro-aniversario-marcador-doce-4.jpg', 'kit-6-carimbos-15-anos-brigadeiro-aniversario-marcador-doce-5.jpg'],
    detalhes: `Kit Carimbos Marcadores para Doces Tema 15 Anos (6 Unidades)

O que você recebe: 1 Kit contendo 6 carimbos com estampas temáticas exclusivas e diferentes referentes ao tema Aniversário de 15 Anos.

Indicação de Uso: Ferramenta ideal para personalizar brigadeiros, doces finos, doces gourmet, lembrancinhas e produções artesanais para festas de debutante.

Dimensões da Peça: Altura total de 3,5 cm, diâmetro de 2,2 cm e relevo do desenho com 0,5 cm de altura (tamanho perfeitamente ajustado para doces padrão).

Benefícios para a Produção: Possui estrutura firme e de fácil manuseio que assegura marcações precisas e uniformes, facilitando a padronização e elevando a apresentação final do seu produto com um acabamento profissional e diferenciado.

Material e Segurança: Desenvolvido com plástico resistente de alta qualidade, garantindo total segurança no manuseio diário e no contato direto com alimentos (100% Livre de BPA).

Manutenção e Limpeza: Para preservar a integridade e durabilidade das peças, higienize exclusivamente com água em temperatura ambiente e sabão neutro. Não utilize água quente, máquinas lava-louças ou produtos abrasivos.`,
    caracteristicas: [
      ['Marca', 'N97'],
      ['Cor e padrão', 'Aleatório'],
      ['Formato de venda', 'Kit'],
      ['Quantidade de carimbos', '6'],
      ['Material do carimbo', 'Plástico'],
      ['Altura', '3.5 cm'],
      ['É para uso de forma quente', 'Não'],
    ],
  },
  {
    id: 'kit-9-carimbos-idades-doce-brigadeiro-festa-aleatoria-numero',
    nome: 'Kit 9 Carimbos Idades Doce Brigadeiro Festa Aleatória Números',
    descricao: 'Kit Carimbos Marcadores para Doces Tema Idades 1 a 9 Anos (9 Unidades).',
    categoria: 'Confeitaria',
    preco: 35,
    precoOriginal: 49,
    fotos: ['kit-9-carimbos-idades-doce-brigadeiro-festa-aleatoria-numero-1.jpg', 'kit-9-carimbos-idades-doce-brigadeiro-festa-aleatoria-numero-2.jpg', 'kit-9-carimbos-idades-doce-brigadeiro-festa-aleatoria-numero-3.jpg', 'kit-9-carimbos-idades-doce-brigadeiro-festa-aleatoria-numero-4.jpg', 'kit-9-carimbos-idades-doce-brigadeiro-festa-aleatoria-numero-5.jpg'],
    detalhes: `Kit Carimbos Marcadores para Doces Tema Idades 1 a 9 Anos (9 Unidades)
• O que você recebe: 1 Kit contendo 9 carimbos com estampas numéricas correspondentes às idades de 1 a 9 anos.
• Indicação de Uso: Ferramenta ideal para personalizar brigadeiros, docinhos gourmet, biscoitos, pasta americana e biscuit, garantindo um acabamento sofisticado e profissional para a sua produção.
• Modo de Usar: Processo prático e rápido. Basta encaixar o bastão no desenho desejado e pressionar suavemente sobre o doce ou massa para obter uma marcação nítida.
• Dimensões da Peça: Altura total de 3,5 cm, diâmetro de 2,2 cm, com o tamanho do desenho de até 2,2 cm e profundidade de marcação de 0,5 cm.
• Material e Segurança: Fabricado em plástico resistente de alta qualidade. Produto com acabamento estético impecável, totalmente seguro para contato direto com alimentos e 100% Livre de BPA.
• Manutenção e Limpeza: Para preservar a integridade e durabilidade das peças, higienize exclusivamente com água em temperatura ambiente e sabão neutro. Não utilize água quente, máquinas lava-louças ou produtos abrasivos.`,
    caracteristicas: [
      ['Marca', 'N97'],
      ['Cor e padrão', 'Aleatório'],
      ['Formato de venda', 'Kit'],
      ['Quantidade de carimbos', '9'],
      ['Material do carimbo', 'PLA'],
      ['Material do cabo', 'PLA'],
      ['Altura', '3 cm'],
      ['Largura', '3 cm'],
      ['Comprimento', '3 cm'],
      ['Diâmetro', '2 cm'],
      ['É livre de BPA', 'Sim'],
      ['É para uso de forma quente', 'Não'],
    ],
  },
  {
    id: 'kit-6-carimbos-brigadeiro-doces-formatura-aleatorio-formatur',
    nome: 'Kit 6 Carimbos Brigadeiro Doces Formatura Aleatório Formatura',
    descricao: 'Kit Carimbos Marcadores para Doces Tema Formatura (6 Unidades).',
    categoria: 'Confeitaria',
    preco: 19,
    precoOriginal: 41,
    fotos: ['kit-6-carimbos-brigadeiro-doces-formatura-aleatorio-formatur-1.jpg', 'kit-6-carimbos-brigadeiro-doces-formatura-aleatorio-formatur-2.jpg', 'kit-6-carimbos-brigadeiro-doces-formatura-aleatorio-formatur-3.jpg', 'kit-6-carimbos-brigadeiro-doces-formatura-aleatorio-formatur-4.jpg', 'kit-6-carimbos-brigadeiro-doces-formatura-aleatorio-formatur-5.jpg'],
    detalhes: `Kit Carimbos Marcadores para Doces Tema Formatura (6 Unidades)

O que você recebe: 1 Kit contendo 6 carimbos com estampas temáticas exclusivas referentes ao tema Formatura.

Indicação de Uso: Ferramenta ideal para personalizar brigadeiros, docinhos gourmet, biscoitos, pasta americana e biscuit, garantindo um acabamento sofisticado e profissional para a sua produção.

Modo de Usar: Processo prático e rápido. Basta encaixar o bastão no desenho desejado e pressionar suavemente sobre o doce ou massa para obter uma marcação nítida.

Dimensões da Peça: Altura total de 3,5 cm, diâmetro de 2,2 cm, com o tamanho do desenho de até 2,2 cm e profundidade de marcação de 0,5 cm.

Material e Segurança: Fabricado em plástico resistente de alta qualidade. Produto com acabamento estético impecável, totalmente seguro para o contato direto com alimentos e 100% Livre de BPA.

Manutenção e Limpeza: Para preservar a integridade e durabilidade das peças, higienize exclusivamente com água em temperatura ambiente e sabão neutro. Não utilize água quente, máquinas lava-louças ou produtos abrasivos, e evite a exposição a altas temperaturas.`,
    caracteristicas: [
      ['Marca', 'N97'],
      ['Cor e padrão', 'Aleatório'],
      ['Formato de venda', 'Kit'],
      ['Quantidade de carimbos', '6'],
      ['Material do carimbo', 'PLA'],
      ['Material do cabo', 'PLA'],
      ['Altura', '3 cm'],
      ['Largura', '3 cm'],
      ['Comprimento', '3 cm'],
      ['Diâmetro', '2 cm'],
      ['É livre de BPA', 'Sim'],
      ['É para uso de forma quente', 'Não'],
    ],
  },
  {
    id: 'molde-ejetor-ursinho-fofo-brigadeiro-massa-doces-aleatoria',
    nome: 'Molde Ejetor Ursinho Fofo Brigadeiro Massa Doces Aleatória',
    descricao: 'Kit Modelador de Brigadeiro Tema Ursinho (2 Peças).',
    categoria: 'Confeitaria',
    preco: 22,
    precoOriginal: 36,
    fotos: ['molde-ejetor-ursinho-fofo-brigadeiro-massa-doces-aleatoria-1.jpg', 'molde-ejetor-ursinho-fofo-brigadeiro-massa-doces-aleatoria-2.jpg', 'molde-ejetor-ursinho-fofo-brigadeiro-massa-doces-aleatoria-3.jpg', 'molde-ejetor-ursinho-fofo-brigadeiro-massa-doces-aleatoria-4.jpg', 'molde-ejetor-ursinho-fofo-brigadeiro-massa-doces-aleatoria-5.jpg'],
    detalhes: `Kit Modelador de Brigadeiro Tema Ursinho (2 Peças)

O que você recebe: 1 Kit contendo 2 peças modeladoras com design de Ursinho em alta definição.

Indicação de Uso: Ferramenta versátil e ideal para personalizar brigadeiros, biscoitos, salgados e massas decorativas em geral, garantindo um acabamento impecável e profissional.

Benefícios para a Produção: Super prático e de fácil manuseio, otimiza o tempo de produção e eleva a qualidade visual e o padrão das suas encomendas.

Material e Segurança: Fabricado em plástico PLA. Produto totalmente atóxico e 100% seguro para o contato direto com alimentos (Livre de BPA).

Cuidados e Conservação: O material PLA possui sensibilidade térmica e deve ser utilizado apenas com massas frias. Higienize exclusivamente com água em temperatura ambiente e sabão neutro. Não utilize água quente, não leve a máquinas lava-louças e evite a exposição ao sol ou a altas temperaturas.`,
    caracteristicas: [
      ['Marca', 'N97'],
      ['Cor', 'Aleatória'],
      ['Formato de venda', 'Unidade'],
      ['Quantidade de moldes', '1'],
      ['É apto para lava-louças', 'Não'],
    ],
  },
  {
    id: 'modelador-ejetor-brigadeiro-costela-de-adao-massas-biscuit-a',
    nome: 'Modelador Ejetor Brigadeiro Costela De Adão Massas Biscuit Aleatório',
    descricao: 'Kit Modelador para Doces Tema Costela de Adão (2 Peças).',
    categoria: 'Confeitaria',
    preco: 24,
    precoOriginal: 37,
    fotos: ['modelador-ejetor-brigadeiro-costela-de-adao-massas-biscuit-a-1.jpg', 'modelador-ejetor-brigadeiro-costela-de-adao-massas-biscuit-a-2.jpg', 'modelador-ejetor-brigadeiro-costela-de-adao-massas-biscuit-a-3.jpg', 'modelador-ejetor-brigadeiro-costela-de-adao-massas-biscuit-a-4.jpg', 'modelador-ejetor-brigadeiro-costela-de-adao-massas-biscuit-a-5.jpg'],
    detalhes: `Kit Modelador para Doces Tema Costela de Adão (2 Peças)

O que você recebe: 1 Kit contendo 2 peças modeladoras com design de Costela de Adão em alta definição.

Indicação de Uso: Ferramenta versátil e ideal para personalizar brigadeiros, biscoitos, salgados e massas decorativas em geral, garantindo um acabamento impecável e profissional.

Benefícios para a Produção: Super prático e de fácil manuseio, otimiza o tempo de produção e eleva a qualidade visual e o padrão das suas encomendas.

Material e Segurança: Fabricado em plástico PLA. Produto totalmente atóxico e 100% seguro para o contato direto com alimentos (Livre de BPA).

Cuidados e Conservação: O material PLA possui sensibilidade térmica e deve ser utilizado apenas com massas frias. Higienize exclusivamente com água em temperatura ambiente e sabão neutro. Não utilize água quente, não leve a máquinas lava-louças e evite a exposição ao sol ou a altas temperaturas.`,
    caracteristicas: [
      ['Marca', 'N97'],
      ['Cor', 'Aleatório'],
      ['Formato de venda', 'Unidade'],
      ['Quantidade de moldes', '1'],
      ['Material', 'Silicone'],
    ],
  },
  {
    id: 'kit-1-carimbo-1-modelador-ejetor-batizado-com-santa',
    nome: 'Kit 1 Carimbo + 1 Modelador Ejetor Batizado Com Santa',
    descricao: '1 Kit contendo 1 base ejetora e 1 conjunto de carimbos com design em 3D de Nossa Senhora Aparecida.',
    categoria: 'Confeitaria',
    preco: 35.9,
    precoOriginal: 62,
    fotos: ['kit-1-carimbo-1-modelador-ejetor-batizado-com-santa-1.jpg', 'kit-1-carimbo-1-modelador-ejetor-batizado-com-santa-2.jpg', 'kit-1-carimbo-1-modelador-ejetor-batizado-com-santa-3.jpg', 'kit-1-carimbo-1-modelador-ejetor-batizado-com-santa-4.jpg', 'kit-1-carimbo-1-modelador-ejetor-batizado-com-santa-5.jpg'],
    detalhes: `Kit Modelador Ejetor Tema Nossa Senhora Aparecida

O que você recebe: 1 Kit contendo 1 base ejetora e 1 conjunto de carimbos com design em 3D de Nossa Senhora Aparecida.

Indicação de Uso: Ferramenta ideal para personalizar brigadeiros (perfeitamente ajustado para pesos de 15g a 22g), beijinhos, biscoitos, pasta americana, fondant e pasta de açúcar, garantindo um acabamento sofisticado para eventos.

Benefícios para a Produção: Proporciona um efeito 3D de alta definição com desmolde impecável, sem grudar. O design ergonômico assegura firmeza e precisão durante o manuseio, otimizando o tempo de produção e garantindo a padronização profissional das peças.

Dimensões da Peça: O tamanho final do doce modelado é de 3,5 cm x 3,5 cm.

Material e Segurança: Fabricado em plástico PETG de alta qualidade, garantindo maior resistência mecânica e durabilidade. Produto totalmente seguro para o contato direto com alimentos e 100% Livre de BPA.

Manutenção e Limpeza: Para preservar a integridade das peças, higienize exclusivamente com água em temperatura ambiente e sabão neutro. Evite a imersão em água fervente, o uso de máquinas lava-louças e produtos abrasivos.`,
    caracteristicas: [
      ['Marca', 'N97'],
      ['Cor e padrão', 'Aleatório'],
      ['É livre de BPA', 'Não'],
      ['É para uso de forma quente', 'Não'],
    ],
  },
  {
    id: 'kit-5-carimbos-brigadeiro-mickey-minnie-molde-foma',
    nome: 'Kit 5 Carimbos Brigadeiro Mickey Minnie Molde Foma',
    descricao: 'Kit Carimbos Marcadores para Doces Tema Mickey e Minnie (5 Unidades).',
    categoria: 'Confeitaria',
    preco: 19,
    precoOriginal: 32,
    fotos: ['kit-5-carimbos-brigadeiro-mickey-minnie-molde-foma-1.jpg', 'kit-5-carimbos-brigadeiro-mickey-minnie-molde-foma-2.jpg', 'kit-5-carimbos-brigadeiro-mickey-minnie-molde-foma-3.jpg', 'kit-5-carimbos-brigadeiro-mickey-minnie-molde-foma-4.jpg'],
    detalhes: `Kit Carimbos Marcadores para Doces Tema Mickey e Minnie (5 Unidades)

O que você recebe: 1 Kit contendo 5 carimbos com estampas temáticas exclusivas referentes ao tema Mickey e Minnie.

Indicação de Uso: Ferramenta ideal para personalizar brigadeiros, docinhos gourmet, biscoitos, pasta americana e biscuit, garantindo um acabamento sofisticado e profissional para a sua produção.

Modo de Usar: Processo prático e rápido. Basta encaixar o bastão no desenho desejado e pressionar suavemente sobre o doce ou massa para obter uma marcação nítida.

Material e Segurança: Fabricado em plástico resistente de alta qualidade. Produto com acabamento estético impecável e totalmente seguro para o contato direto com alimentos.

Manutenção e Limpeza: Para preservar a integridade e durabilidade das peças, higienize exclusivamente com água em temperatura ambiente e sabão neutro. Não utilize água quente, máquinas lava-louças ou produtos abrasivos.

Garantia: 3 meses de garantia oferecida pelo vendedor.`,
    caracteristicas: [
      ['Marca', 'N97'],
      ['Cor e padrão', 'Aleatório'],
      ['É livre de BPA', 'Não'],
      ['É para uso de forma quente', 'Não'],
    ],
  },
  {
    id: 'carimbo-personalizado-logo-nome-brigadeiro-doce-1-pc-aleator',
    nome: 'Carimbo Personalizado Logo Nome Brigadeiro Doce 1 Pc Aleatório Tipo 1',
    descricao: 'Carimbo Marcador Personalizado para Doces (1 Unidade).',
    categoria: 'Confeitaria',
    preco: 21.5,
    precoOriginal: 35.9,
    fotos: ['carimbo-personalizado-logo-nome-brigadeiro-doce-1-pc-aleator-1.jpg', 'carimbo-personalizado-logo-nome-brigadeiro-doce-1-pc-aleator-2.jpg', 'carimbo-personalizado-logo-nome-brigadeiro-doce-1-pc-aleator-3.jpg', 'carimbo-personalizado-logo-nome-brigadeiro-doce-1-pc-aleator-4.jpg', 'carimbo-personalizado-logo-nome-brigadeiro-doce-1-pc-aleator-5.jpg'],
    detalhes: `Carimbo Marcador Personalizado para Doces (1 Unidade)
• O que você recebe: 1 Carimbo personalizado com o seu logotipo, nome ou arte exclusiva.
• Indicação de Uso: Ferramenta ideal para estampar sua marca em brigadeiros, doces finos, biscoitos e pasta americana, valorizando eventos, brindes corporativos, lembrancinhas e encomendas profissionais.
• Como Funciona a Personalização: Após a confirmação da compra, envie o seu logotipo (em alta resolução), nome ou informação desejada imediatamente através do chat do pedido. Nossa equipe técnica fará a análise do arquivo para garantir a melhor qualidade de marcação antes de iniciar a produção.
• Material e Segurança: Fabricado em plástico premium de alta precisão, totalmente seguro para contato direto com alimentos e 100% Livre de BPA.
• Manutenção e Limpeza: Higienize apenas com água fria e sabão neutro. Não exponha o produto a água quente, lava-louças ou fontes de calor para preservar a integridade da peça.
• Avisos Importantes: O prazo de confecção e envio segue rigorosamente o estipulado no anúncio. A cor da estrutura do carimbo pode variar conforme a disponibilidade de estoque. Caso tenha dúvidas sobre a viabilidade da sua arte ou tamanho, envie uma pergunta antes de finalizar a compra.

Aviso legal
É livre de BPA.`,
    caracteristicas: [
      ['Marca', 'N97'],
      ['Cor e padrão', 'Aleatório'],
      ['Formato de venda', 'Unidade'],
      ['Quantidade de carimbos', '1'],
      ['Material do carimbo', 'PLA'],
      ['Material do cabo', 'PLA'],
      ['É livre de BPA', 'Sim'],
      ['É para uso de forma quente', 'Não'],
    ],
  },
  {
    id: 'carimbo-personalizado-logo-nome-brigadeiro-doce-1-pc-aleator-8764',
    nome: 'Carimbo Personalizado Logo Nome Brigadeiro Doce 1 Pc Aleatório Logo',
    descricao: 'Carimbo Marcador Personalizado para Doces (1 Unidade).',
    categoria: 'Confeitaria',
    preco: 29.9,
    precoOriginal: 35.9,
    fotos: ['carimbo-personalizado-logo-nome-brigadeiro-doce-1-pc-aleator-8764-1.jpg', 'carimbo-personalizado-logo-nome-brigadeiro-doce-1-pc-aleator-8764-2.jpg', 'carimbo-personalizado-logo-nome-brigadeiro-doce-1-pc-aleator-8764-3.jpg', 'carimbo-personalizado-logo-nome-brigadeiro-doce-1-pc-aleator-8764-4.jpg', 'carimbo-personalizado-logo-nome-brigadeiro-doce-1-pc-aleator-8764-5.jpg'],
    detalhes: `Carimbo Marcador Personalizado para Doces (1 Unidade)
• O que você recebe: 1 Carimbo personalizado com o seu logotipo, nome ou arte exclusiva.
• Indicação de Uso: Ferramenta ideal para estampar sua marca em brigadeiros, doces finos, biscoitos e pasta americana, valorizando eventos, brindes corporativos, lembrancinhas e encomendas profissionais.
• Como Funciona a Personalização: Após a confirmação da compra, envie o seu logotipo (em alta resolução), nome ou informação desejada imediatamente através do chat do pedido. Nossa equipe técnica fará a análise do arquivo para garantir a melhor qualidade de marcação antes de iniciar a produção.
• Material e Segurança: Fabricado em plástico premium de alta precisão, totalmente seguro para contato direto com alimentos e 100% Livre de BPA.
• Manutenção e Limpeza: Higienize apenas com água fria e sabão neutro. Não exponha o produto a água quente, lava-louças ou fontes de calor para preservar a integridade da peça.
• Avisos Importantes: O prazo de confecção e envio segue rigorosamente o estipulado no anúncio. A cor da estrutura do carimbo pode variar conforme a disponibilidade de estoque. Caso tenha dúvidas sobre a viabilidade da sua arte ou tamanho, envie uma pergunta antes de finalizar a compra.

Aviso legal
É livre de BPA.`,
    caracteristicas: [
      ['Marca', 'N97'],
      ['Cor e padrão', 'Aleatório'],
      ['Formato de venda', 'Unidade'],
      ['Quantidade de carimbos', '1'],
      ['Material do carimbo', 'PLA'],
      ['Material do cabo', 'PLA'],
      ['É livre de BPA', 'Sim'],
      ['É para uso de forma quente', 'Não'],
    ],
  },
  {
    id: 'kit-3-carimbos-anjos-brigadeiro-marcador-aleatorio-anjo',
    nome: 'Kit 3 Carimbos Anjos Brigadeiro Marcador Aleatório Anjo',
    descricao: 'Kit Carimbos Marcadores para Doces Tema Anjos (3 Unidades).',
    categoria: 'Confeitaria',
    preco: 19,
    precoOriginal: 32,
    fotos: ['kit-3-carimbos-anjos-brigadeiro-marcador-aleatorio-anjo-1.jpg', 'kit-3-carimbos-anjos-brigadeiro-marcador-aleatorio-anjo-2.jpg', 'kit-3-carimbos-anjos-brigadeiro-marcador-aleatorio-anjo-3.jpg', 'kit-3-carimbos-anjos-brigadeiro-marcador-aleatorio-anjo-4.jpg', 'kit-3-carimbos-anjos-brigadeiro-marcador-aleatorio-anjo-5.jpg'],
    detalhes: `Kit Carimbos Marcadores para Doces Tema Anjos (3 Unidades)

O que você recebe: 1 Kit contendo 3 carimbos com estampas temáticas exclusivas referentes ao tema Anjos.

Indicação de Uso: Ferramenta ideal para personalizar brigadeiros, docinhos gourmet, biscoitos, pasta americana e biscuit, garantindo um acabamento sofisticado e profissional para a sua produção.

Modo de Usar: Processo prático e rápido. Basta encaixar o bastão no desenho desejado e pressionar suavemente sobre o doce ou massa para obter uma marcação nítida.

Dimensões da Peça: Altura total de 3,5 cm, diâmetro de 2,2 cm, com o tamanho do desenho de até 2,2 cm e profundidade de marcação de 0,5 cm.

Material e Segurança: Fabricado em plástico resistente de alta qualidade. Produto com acabamento estético impecável, totalmente seguro para o contato direto com alimentos e 100% Livre de BPA.

Manutenção e Limpeza: Para preservar a integridade e durabilidade das peças, higienize exclusivamente com água em temperatura ambiente e sabão neutro. Não utilize água quente, máquinas lava-louças ou produtos abrasivos, e evite a exposição a altas temperaturas.`,
    caracteristicas: [
      ['Marca', 'N97'],
      ['Cor e padrão', 'Aleatório'],
      ['Formato de venda', 'Kit'],
      ['Quantidade de carimbos', '3'],
      ['Material do carimbo', 'PLA'],
      ['Material do cabo', 'PLA'],
      ['Altura', '3 cm'],
      ['Largura', '3 cm'],
      ['Comprimento', '3 cm'],
      ['Diâmetro', '2 cm'],
      ['É livre de BPA', 'Sim'],
      ['É para uso de forma quente', 'Não'],
    ],
  },
  {
    id: 'kit-carimbos-brigadeiro-docinhos-halloween-dia-das-bruxas-ca',
    nome: 'Kit Carimbos Brigadeiro Docinhos Halloween Dia Das Bruxas Carimbo',
    descricao: 'Transforme a produção de doces com decorações temáticas, práticas e criativas. Desenvolvido para confeiteiras, doceiras e…',
    categoria: 'Confeitaria',
    preco: 21.9,
    precoOriginal: 43.8,
    fotos: ['kit-carimbos-brigadeiro-docinhos-halloween-dia-das-bruxas-ca-1.jpg', 'kit-carimbos-brigadeiro-docinhos-halloween-dia-das-bruxas-ca-2.jpg', 'kit-carimbos-brigadeiro-docinhos-halloween-dia-das-bruxas-ca-3.jpg', 'kit-carimbos-brigadeiro-docinhos-halloween-dia-das-bruxas-ca-4.jpg', 'kit-carimbos-brigadeiro-docinhos-halloween-dia-das-bruxas-ca-5.jpg'],
    detalhes: `KIT DE MARCADORES E CARIMBOS PARA DOCES - TEMA HALLOWEEN

Transforme a produção de doces com decorações temáticas, práticas e criativas. Desenvolvido para confeiteiras, doceiras e entusiastas que desejam personalizar brigadeiros, doces finos e pastas de modelagem com agilidade, agregando valor visual a encomendas de Halloween e festas comemorativas.

PRINCIPAIS VANTAGENS

Personalização temática rápida: marcações nítidas que valorizam a estética das mesas de festa

Variedade no preparo: 5 matrizes exclusivas para compor kits de doces diversificados

Uso intuitivo: marcação direta por pressão, sem exigir habilidades avançadas de modelagem

Durável e reutilizável: material resistente, higiênico e apto para uso contínuo na confeitaria

Aplicação ampla: funciona com excelência em brigadeiros, pasta americana, fondant e massas leves de corte

DESENHOS INCLUSOS NO KIT

Bruxa com vassoura

Abóbora de Halloween

Abóbora de Halloween Careta

Fantasma

Morcego

INDICAÇÕES DE USO

Brigadeiros tradicionais e gourmet

Doces finos e trufas

Apliques decorativos em pasta americana ou biscuit alimentar

Festas de Halloween, Dia das Bruxas e aniversários temáticos

Composição de lembrancinhas e mesas decoradas

CONTEÚDO DA EMBALAGEM

1x Kit com 5 marcadores/carimbos para doces (Tema Halloween)

PALAVRAS-CHAVE RELACIONADAS
carimbo para brigadeiro, marcador para brigadeiro, carimbo para doces, marcador para doces, kit Halloween, carimbo Halloween, brigadeiro Halloween, doces Halloween, festa Halloween, Dia das Bruxas, carimbo caveira, carimbo morcego, carimbo abóbora, carimbo teia de aranha, marcador pasta americana, molde para brigadeiro, decoração Halloween, confeitaria Halloween`,
    caracteristicas: [
      ['Marca', 'N97'],
      ['Cor e padrão', 'Aleatório'],
      ['Formato de venda', 'Kit'],
      ['Quantidade de carimbos', '5'],
      ['Material do carimbo', 'Plástico'],
      ['Material do cabo', 'Plástico'],
      ['Altura', '3 cm'],
      ['Largura', '1.9 cm'],
      ['Comprimento', '1.5 cm'],
      ['Diâmetro', '5 mm'],
      ['É livre de BPA', 'Sim'],
      ['É para uso de forma quente', 'Não'],
    ],
  },
  {
    id: 'carimbo-personalizado-logo-nome-brigadeiro-doce-1-pc-aleator-1522',
    nome: 'Carimbo Personalizado Logo Nome Brigadeiro Doce 1 Pc Aleatório Tipo 3',
    descricao: 'Carimbo Marcador Personalizado para Doces (1 Unidade).',
    categoria: 'Confeitaria',
    preco: 21.5,
    precoOriginal: 35.9,
    fotos: ['carimbo-personalizado-logo-nome-brigadeiro-doce-1-pc-aleator-1522-1.jpg', 'carimbo-personalizado-logo-nome-brigadeiro-doce-1-pc-aleator-1522-2.jpg', 'carimbo-personalizado-logo-nome-brigadeiro-doce-1-pc-aleator-1522-3.jpg', 'carimbo-personalizado-logo-nome-brigadeiro-doce-1-pc-aleator-1522-4.jpg', 'carimbo-personalizado-logo-nome-brigadeiro-doce-1-pc-aleator-1522-5.jpg'],
    detalhes: `Carimbo Marcador Personalizado para Doces (1 Unidade)
• O que você recebe: 1 Carimbo personalizado com o seu logotipo, nome ou arte exclusiva.
• Indicação de Uso: Ferramenta ideal para estampar sua marca em brigadeiros, doces finos, biscoitos e pasta americana, valorizando eventos, brindes corporativos, lembrancinhas e encomendas profissionais.
• Como Funciona a Personalização: Após a confirmação da compra, envie o seu logotipo (em alta resolução), nome ou informação desejada imediatamente através do chat do pedido. Nossa equipe técnica fará a análise do arquivo para garantir a melhor qualidade de marcação antes de iniciar a produção.
• Material e Segurança: Fabricado em plástico premium de alta precisão, totalmente seguro para contato direto com alimentos e 100% Livre de BPA.
• Manutenção e Limpeza: Higienize apenas com água fria e sabão neutro. Não exponha o produto a água quente, lava-louças ou fontes de calor para preservar a integridade da peça.
• Avisos Importantes: O prazo de confecção e envio segue rigorosamente o estipulado no anúncio. A cor da estrutura do carimbo pode variar conforme a disponibilidade de estoque. Caso tenha dúvidas sobre a viabilidade da sua arte ou tamanho, envie uma pergunta antes de finalizar a compra.

Aviso legal
É livre de BPA.`,
    caracteristicas: [
      ['Marca', 'N97'],
      ['Cor e padrão', 'Aleatório'],
      ['Formato de venda', 'Unidade'],
      ['Quantidade de carimbos', '1'],
      ['Material do carimbo', 'PLA'],
      ['Material do cabo', 'PLA'],
      ['É livre de BPA', 'Sim'],
      ['É para uso de forma quente', 'Não'],
    ],
  },
  {
    id: 'molde-ejetor-formato-diamante-5cm-diametro-aleatorio-diamant',
    nome: 'Molde Ejetor Formato Diamante 5cm Diametro Aleatório Diamante',
    descricao: 'Kit Molde Ejetor e Cortador Tema Diamante Lapidado (2 Peças).',
    categoria: 'Confeitaria',
    preco: 29.9,
    precoOriginal: 59,
    fotos: ['molde-ejetor-formato-diamante-5cm-diametro-aleatorio-diamant-1.jpg'],
    detalhes: `Kit Molde Ejetor e Cortador Tema Diamante Lapidado (2 Peças)
• O que você recebe: 1 Kit para confeitaria contendo 2 peças (sendo 1 cortador/guia de ejeção e 1 êmbolo marcador de relevo) com design exclusivo de Diamante Lapidado.
• Indicação de Uso: Ferramenta ideal para o corte preciso e marcação de pasta americana, biscuit, fondant, biscoitos e massas em geral, garantindo um acabamento sofisticado e profissional para a sua produção.
• Dimensões da Peça: O molde possui dimensões totais de 70 mm x 60 mm (7 cm x 6 cm). O êmbolo conta com um relevo de 4 mm e frisos de 2 mm, projetados para entregar máxima definição geométrica ao desenho.
• Benefícios para a Produção: O sistema ejetor prático facilita o corte da massa e o desmolde seguro através do guia de ejeção (com folga milimétrica de 0,4 mm), assegurando agilidade, padronização e um efeito 3D impecável sem deformar o doce.
• Material e Segurança: Fabricado em plástico PETG de alta qualidade através de impressão 3D (FDM), garantindo excelente resistência mecânica e longa durabilidade. Produto totalmente seguro para o contato direto com alimentos (Livre de BPA).
• Manutenção e Limpeza: Para preservar a integridade das peças, higienize exclusivamente com água em temperatura ambiente e sabão neutro. Evite a imersão em água fervente, o uso de máquinas lava-louças e produtos abrasivos.`,
    caracteristicas: [
      ['Marca', 'N97'],
      ['Cor', 'Aleatório'],
      ['Formato de venda', 'Unidade'],
      ['Quantidade de carimbos', '1'],
      ['Material do carimbo', 'Plástico'],
      ['Material do cabo', 'Plástico'],
      ['Altura', '5 cm'],
      ['Largura', '5 cm'],
      ['Comprimento', '5 cm'],
      ['Diâmetro', '5 cm'],
      ['É livre de BPA', 'Sim'],
      ['É para uso de forma quente', 'Não'],
    ],
  },
  {
    id: 'carimbo-personalizado-logo-nome-brigadeiro-doce-1-pc-aleator-4434',
    nome: 'Carimbo Personalizado Logo Nome Brigadeiro Doce 1 Pc Aleatório Tipo 4',
    descricao: 'Carimbo Marcador Personalizado para Doces (1 Unidade).',
    categoria: 'Confeitaria',
    preco: 21.5,
    precoOriginal: 35.9,
    fotos: ['carimbo-personalizado-logo-nome-brigadeiro-doce-1-pc-aleator-4434-1.jpg', 'carimbo-personalizado-logo-nome-brigadeiro-doce-1-pc-aleator-4434-2.jpg', 'carimbo-personalizado-logo-nome-brigadeiro-doce-1-pc-aleator-4434-3.jpg', 'carimbo-personalizado-logo-nome-brigadeiro-doce-1-pc-aleator-4434-4.jpg', 'carimbo-personalizado-logo-nome-brigadeiro-doce-1-pc-aleator-4434-5.jpg'],
    detalhes: `Carimbo Marcador Personalizado para Doces (1 Unidade)
• O que você recebe: 1 Carimbo personalizado com o seu logotipo, nome ou arte exclusiva.
• Indicação de Uso: Ferramenta ideal para estampar sua marca em brigadeiros, doces finos, biscoitos e pasta americana, valorizando eventos, brindes corporativos, lembrancinhas e encomendas profissionais.
• Como Funciona a Personalização: Após a confirmação da compra, envie o seu logotipo (em alta resolução), nome ou informação desejada imediatamente através do chat do pedido. Nossa equipe técnica fará a análise do arquivo para garantir a melhor qualidade de marcação antes de iniciar a produção.
• Material e Segurança: Fabricado em plástico premium de alta precisão, totalmente seguro para contato direto com alimentos e 100% Livre de BPA.
• Manutenção e Limpeza: Higienize apenas com água fria e sabão neutro. Não exponha o produto a água quente, lava-louças ou fontes de calor para preservar a integridade da peça.
• Avisos Importantes: O prazo de confecção e envio segue rigorosamente o estipulado no anúncio. A cor da estrutura do carimbo pode variar conforme a disponibilidade de estoque. Caso tenha dúvidas sobre a viabilidade da sua arte ou tamanho, envie uma pergunta antes de finalizar a compra.

Aviso legal
É livre de BPA.`,
    caracteristicas: [
      ['Marca', 'N97'],
      ['Cor e padrão', 'Aleatório'],
      ['Formato de venda', 'Unidade'],
      ['Quantidade de carimbos', '1'],
      ['Material do carimbo', 'PLA'],
      ['Material do cabo', 'PLA'],
      ['É livre de BPA', 'Sim'],
      ['É para uso de forma quente', 'Não'],
    ],
  },
  {
    id: 'ejetor-modelador-sol-doces-brigadeiro',
    nome: 'Ejetor Modelador Sol Doces Brigadeiro',
    descricao: '1 Kit contendo 2 peças modeladoras com design de Sol em alta definição (Atenção: Produto em Pré-Venda).',
    categoria: 'Confeitaria',
    preco: 24,
    precoOriginal: 34,
    fotos: ['ejetor-modelador-sol-doces-brigadeiro-1.jpg', 'ejetor-modelador-sol-doces-brigadeiro-2.jpg', 'ejetor-modelador-sol-doces-brigadeiro-3.jpg', 'ejetor-modelador-sol-doces-brigadeiro-4.jpg', 'ejetor-modelador-sol-doces-brigadeiro-5.jpg'],
    detalhes: `O que você recebe: 1 Kit contendo 2 peças modeladoras com design de Sol em alta definição (Atenção: Produto em Pré-Venda).

Indicação de Uso: Ferramenta ideal para personalizar brigadeiros com peso entre 15g e 22g, garantindo um acabamento impecável e profissional na decoração dos seus doces.

Benefícios para a Produção: Super prático e de fácil manuseio, une eficiência e praticidade no dia a dia da confeitaria, otimizando o tempo e elevando a qualidade visual do seu trabalho.

Material e Segurança: Fabricado em plástico PETG de alta qualidade, garantindo maior resistência mecânica e durabilidade. Produto totalmente atóxico e 100% seguro para o contato direto com alimentos (Livre de BPA).

Manutenção e Limpeza: Para preservar a integridade das peças, higienize com água em temperatura ambiente e sabão neutro. Evite a imersão em água fervente, o uso de máquinas lava-louças e produtos abrasivos.

Garantia: 3 meses de garantia oferecida pelo vendedor.`,
    caracteristicas: [
      ['Marca', 'N97'],
      ['Formato de venda', 'Unidade'],
      ['Quantidade de carimbos', '1'],
      ['Material do carimbo', 'Plástico'],
      ['Altura', '21 cm'],
      ['Largura', '15 cm'],
      ['Comprimento', '7 cm'],
    ],
  },
  {
    id: 'kit-3-carimbos-brigadeiro-casamento-decoracao',
    nome: 'Kit 3 Carimbos Brigadeiro Casamento Decoração',
    descricao: 'Kit Carimbos Marcadores para Doces Tema Casamento (5 Unidades).',
    categoria: 'Confeitaria',
    preco: 19,
    precoOriginal: 32,
    fotos: ['kit-3-carimbos-brigadeiro-casamento-decoracao-1.jpg', 'kit-3-carimbos-brigadeiro-casamento-decoracao-2.jpg', 'kit-3-carimbos-brigadeiro-casamento-decoracao-3.jpg', 'kit-3-carimbos-brigadeiro-casamento-decoracao-4.jpg', 'kit-3-carimbos-brigadeiro-casamento-decoracao-5.jpg'],
    detalhes: `Kit Carimbos Marcadores para Doces Tema Casamento (5 Unidades)

O que você recebe: 1 Kit contendo 5 carimbos com estampas temáticas exclusivas referentes ao tema Casamento.

Indicação de Uso: Ferramenta ideal para personalizar brigadeiros, docinhos gourmet, biscoitos, pasta americana e biscuit, garantindo um acabamento sofisticado e profissional para a sua produção.

Modo de Usar: Processo prático e rápido. Basta encaixar o bastão no desenho desejado e pressionar suavemente sobre o doce ou massa para obter uma marcação nítida e personalizada.

Material e Segurança: Fabricado em plástico resistente de alta qualidade. Produto com acabamento estético impecável e totalmente seguro para o contato direto com alimentos.

Manutenção e Limpeza: Para preservar a integridade e durabilidade das peças, higienize exclusivamente com água em temperatura ambiente e sabão neutro. Não utilize água quente, máquinas lava-louças ou produtos abrasivos.`,
    caracteristicas: [
      ['Marca', 'N97'],
      ['Cor e padrão', 'Aleatório'],
      ['É livre de BPA', 'Não'],
      ['É para uso de forma quente', 'Não'],
    ],
  },
  {
    id: 'carimbo-personalizado-logo-nome-brigadeiro-doce-1-pc-aleator-6340',
    nome: 'Carimbo Personalizado Logo Nome Brigadeiro Doce 1 Pc Aleatório Tipo 2',
    descricao: 'Carimbo Marcador Personalizado para Doces (1 Unidade).',
    categoria: 'Confeitaria',
    preco: 21.5,
    precoOriginal: 35.9,
    fotos: ['carimbo-personalizado-logo-nome-brigadeiro-doce-1-pc-aleator-6340-1.jpg', 'carimbo-personalizado-logo-nome-brigadeiro-doce-1-pc-aleator-6340-2.jpg', 'carimbo-personalizado-logo-nome-brigadeiro-doce-1-pc-aleator-6340-3.jpg', 'carimbo-personalizado-logo-nome-brigadeiro-doce-1-pc-aleator-6340-4.jpg', 'carimbo-personalizado-logo-nome-brigadeiro-doce-1-pc-aleator-6340-5.jpg'],
    detalhes: `Carimbo Marcador Personalizado para Doces (1 Unidade)
• O que você recebe: 1 Carimbo personalizado com o seu logotipo, nome ou arte exclusiva.
• Indicação de Uso: Ferramenta ideal para estampar sua marca em brigadeiros, doces finos, biscoitos e pasta americana, valorizando eventos, brindes corporativos, lembrancinhas e encomendas profissionais.
• Como Funciona a Personalização: Após a confirmação da compra, envie o seu logotipo (em alta resolução), nome ou informação desejada imediatamente através do chat do pedido. Nossa equipe técnica fará a análise do arquivo para garantir a melhor qualidade de marcação antes de iniciar a produção.
• Material e Segurança: Fabricado em plástico premium de alta precisão, totalmente seguro para contato direto com alimentos e 100% Livre de BPA.
• Manutenção e Limpeza: Higienize apenas com água fria e sabão neutro. Não exponha o produto a água quente, lava-louças ou fontes de calor para preservar a integridade da peça.
• Avisos Importantes: O prazo de confecção e envio segue rigorosamente o estipulado no anúncio. A cor da estrutura do carimbo pode variar conforme a disponibilidade de estoque. Caso tenha dúvidas sobre a viabilidade da sua arte ou tamanho, envie uma pergunta antes de finalizar a compra.

Aviso legal
É livre de BPA.`,
    caracteristicas: [
      ['Marca', 'N97'],
      ['Cor e padrão', 'Aleatório'],
      ['Formato de venda', 'Unidade'],
      ['Quantidade de carimbos', '1'],
      ['Material do carimbo', 'PLA'],
      ['Material do cabo', 'PLA'],
      ['É livre de BPA', 'Sim'],
      ['É para uso de forma quente', 'Não'],
    ],
  },
]
