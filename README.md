# Loja 3D + Calculadora de Custo

- **Página principal (`/`)**: loja para os clientes verem os produtos, montarem um carrinho e enviarem o pedido (com itens, quantidades e total) pelo WhatsApp. O carrinho fica salvo no navegador do cliente.
- **Calculadora (`/#calculadora`)**: ferramenta interna, sem nenhum link na loja.

## Personalizando a loja

Tudo fica em `src/loja/config.ts`:

- `whatsapp`: seu número só com números, com 55 + DDD (ex.: `5511912345678`)
- `nome`, `slogan`, `cidade`, `instagram`
- `marketplaces`: links da sua loja na Shopee, Mercado Livre, Elo7 etc.
- `produtos`: nome, descrição, categoria, preço (sem preço = "Sob consulta") e links do produto nos marketplaces

Fotos: coloque os arquivos em `public/produtos/` e informe o nome em `imagem` (ex.: `imagem: 'vaso.jpg'`). Sem foto, o produto mostra o emoji.

## Calculadora de Custo 3D

App web para calcular o custo e o preço de venda sugerido de impressões 3D, baseado na planilha de precificação usada como referência (filamento, energia, mão de obra e margem de lucro).

## Como funciona o cálculo

1. **Custo de filamento** = (preço do filamento por kg ÷ 1000) × gramas usadas
2. **Custo de energia** = (tarifa de energia × potência da impressora ÷ 1000) × horas de impressão
3. **Custos opcionais**: desgaste/depreciação da impressora, embalagem e % de falhas/desperdício
4. **Custo total** = soma de todos os custos acima
5. **Lucro** = custo total × margem de lucro (%)
6. **Preço sugerido** = custo total + lucro + mão de obra

O resultado pode ser multiplicado pela quantidade de peças e salvo no histórico (armazenado localmente no navegador).

## Rodando localmente

```bash
npm install
npm run dev
```

Abre em `http://localhost:5173`.

## Build de produção

```bash
npm run build
npm run preview
```

## Stack

- React + TypeScript + Vite
- Tailwind CSS
- Persistência local via `localStorage` (sem backend)
