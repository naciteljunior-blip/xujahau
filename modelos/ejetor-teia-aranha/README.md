# Ejetor de teia do Homem-Aranha

![preview](preview.png)

Duas peças de 12 lados:

| Arquivo | Peça | Medida |
|---|---|---|
| `copo.stl` | Copo com a teia em relevo no topo | 36 mm entre faces × 20 mm de altura |
| `anel.stl` | Anel/luva com degrau; o copo entra por cima e apoia numa aba interna | 42,5 mm × 18 mm |
| `ejetor.scad` | Arquivo editável (OpenSCAD) com todas as medidas como parâmetros | — |

## Como imprimir (bico 0.4)

- **Orientação**: as duas peças já estão na posição certa (copo com a teia para cima, anel em pé). **Não precisam de suporte.**
- Altura de camada: **0.2 mm** (a teia e o rebaixo foram desenhados em múltiplos de 0.2)
- Paredes/perímetros: 3 · Topo/fundo: 4 camadas · Preenchimento: 15–20 %
- Velocidade nos perímetros externos: ~40 mm/s para a teia sair limpa
- PLA ou PETG, sem brim

## Por que não entope nem força a impressora

- Fios da teia com 1.0 mm (≥ 2 linhas de extrusão) e bordas de 1.6 mm: nada mais fino que o bico consegue fazer.
- Nenhuma ponte longa nem saliência acima de 45°: sem fios soltos para o bico arrastar.
- Chanfro de 0.5 mm na base de todas as peças, evitando "pé de elefante" e que o bico raspe na borda.
- Malhas fechadas (manifold), sem erros para o fatiador corrigir.

## Ajuste do encaixe

A folga entre copo e anel é de **0.25 mm por lado**. Se ficar apertado, abra `ejetor.scad`, aumente `folga` para 0.3; se ficar solto, diminua para 0.2. Exporte só o anel (`peca = "anel"`), não precisa reimprimir o copo.
