# Cortador + marcador do Homem-Aranha

![preview](preview.png)

Duas peças que **já saem encaixadas da impressora** (como na vista de baixo: disco do marcador no meio, uma fenda fina e o cortador em volta). Medida total: **35 × 35 × 30 mm** (X × Y × Z).

- **Cortador**: tubo com aba na base e fio de corte de 0.8 mm no topo.
- **Marcador**: cilindro solto dentro do cortador (Ø27 × 29 mm), com o desenho em relevo 1 mm abaixo do fio de corte, para cortar primeiro e marcar depois.
- Folga de **0.4 mm** por lado entre as duas peças, em toda a altura.

**Como usar**: vire a peça (aba para cima), aperte para cortar a massa e depois empurre o fundo do marcador para marcar o desenho e soltar a massa.

| Arquivo (cortador + marcador) | Desenho no marcador |
|---|---|
| `ejetor-teia.stl` | Teia |
| `ejetor-aranha.stl` | Aranha (emblema) |
| `ejetor-teia-aranha.stl` | Teia com a aranha no meio |
| `ejetor.scad` | Arquivo editável (OpenSCAD) com as medidas como parâmetros |

Medidas: aba Ø35 × 3 mm · corpo do cortador Ø31 mm, parede 1.6 mm afinando até 0.8 mm no fio · marcador Ø27 mm · relevo 1.0 mm.

## Como imprimir (bico 0.4)

- **Orientação**: em pé, com a aba no prato (já vem assim). **Sem suporte e sem brim**, já que o brim poderia grudar as duas peças.
- Se as peças saírem grudadas, solte o marcador empurrando por baixo. Se acontecer sempre, aumente `folga` para 0.5 no `.scad`.
- Altura de camada: **0.2 mm** (o relevo tem exatamente 5 camadas)
- Paredes: 3 · Topo/fundo: 4 camadas · Preenchimento: 15–20 %
- Perímetro externo a ~40 mm/s para o desenho sair limpo
- PLA ou PETG

## Por que não entope nem força a impressora

- Fios da teia com 1.0 mm e pernas da aranha com 1.4 mm (2 a 3 linhas de extrusão): nada mais fino que o bico consegue fazer.
- Nenhuma saliência acima de 45° nem ponte: a aba tem rampa de 45° até o corpo, e o bico não arrasta fio solto.
- Chanfro de 0.5 mm na base das duas peças, para o "pé de elefante" não fechar a fenda entre elas.
- Malhas fechadas (manifold) e conferidas, sem erros para o fatiador corrigir.

## Mudar medidas

Abra `ejetor.scad` no OpenSCAD, altere `diametro_base`, `altura`, `folga` ou `desenho` (use `peca = "cortador"` ou `"marcador"` para exportar só uma peça) e exporte (F6 → F7).
