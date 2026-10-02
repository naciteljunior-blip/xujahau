// Ejetor de teia do Homem-Aranha – 2 peças (copo com teia + anel/luva)
// Abra no OpenSCAD, ajuste os parâmetros e exporte o STL (F6 → F7).
// Escolha a peça em "peca": "copo", "anel" ou "ambos" (as duas lado a lado).

peca = "ambos";

/* [Medidas gerais] */
lados        = 12;     // forma de 12 lados, igual à foto
copo_largura = 36;     // copo: distância entre faces opostas (mm)
copo_altura  = 20;     // altura total do copo (mm)
folga        = 0.25;   // folga por lado entre copo e anel (0.2 a 0.3 p/ bico 0.4)

/* [Teia] */
borda        = 1.6;    // largura da borda em volta da teia (4 linhas de 0.4)
rebaixo      = 1.2;    // profundidade do fundo da teia (6 camadas de 0.2)
fio          = 1.0;    // largura de cada fio da teia (2 linhas de 0.4 a 0.5)
aneis_teia   = 5;      // quantos anéis/voltas a teia tem
curvatura    = 0.12;   // quanto os fios entre os raios "caem" para o centro

/* [Anel] */
parede       = 2.0;    // parede do anel (5 linhas de 0.4)
anel_altura  = 18;     // altura total do anel
degrau_alt   = 9;      // altura da parte mais larga embaixo
degrau_larg  = 1.0;    // quanto a parte de baixo é mais larga
apoio_larg   = 1.6;    // aba interna embaixo onde o copo apoia
apoio_alt    = 1.6;    // espessura da aba interna
chanfro      = 0.5;    // chanfro na base (evita "pé de elefante")

/* [Hidden] */
$fn = 32;
ang0 = 180 / lados;                 // gira p/ ficar com face reta no eixo X
k    = 1 / cos(180 / lados);        // apótema → raio do vértice

module poligono(apotema) rotate(ang0) circle(r = apotema * k, $fn = lados);

// prisma de 12 lados com chanfro só na base
module prisma(apotema, altura, ch = chanfro) {
    hull() {
        linear_extrude(ch) poligono(apotema - ch);
        translate([0, 0, ch]) linear_extrude(altura - ch) poligono(apotema);
    }
}

module traco(p, q) hull() { translate(p) circle(d = fio); translate(q) circle(d = fio); }

module teia2d(raio) {
    // raios até os cantos do polígono
    for (i = [0:lados - 1]) {
        a = ang0 + i * 360 / lados;
        traco([0, 0], raio * 1.15 * [cos(a), sin(a)]);
    }
    // anéis que "caem" para o centro entre cada raio, como teia de verdade
    passos = 8;
    for (n = [1:aneis_teia], i = [0:lados - 1], s = [0:passos - 1]) {
        r  = raio * n / (aneis_teia + 0.35);
        a1 = ang0 + i * 360 / lados;
        t1 = s / passos;  t2 = (s + 1) / passos;
        p1 = r * (1 - curvatura * sin(180 * t1)) * [cos(a1 + t1 * 360 / lados), sin(a1 + t1 * 360 / lados)];
        p2 = r * (1 - curvatura * sin(180 * t2)) * [cos(a1 + t2 * 360 / lados), sin(a1 + t2 * 360 / lados)];
        traco(p1, p2);
    }
    circle(d = fio * 2.6);           // nó central
}

module copo() {
    a  = copo_largura / 2;
    ai = a - borda;                  // área rebaixada da teia
    difference() {
        prisma(a, copo_altura);
        translate([0, 0, copo_altura - rebaixo]) linear_extrude(rebaixo + 1) poligono(ai);
    }
    // fios da teia: sobem até a altura da borda e se fundem nela
    translate([0, 0, copo_altura - rebaixo - 0.01])
        linear_extrude(rebaixo + 0.01)
            intersection() { teia2d(ai * k); poligono(ai + 0.1); }
}

module anel() {
    ai = copo_largura / 2 + folga;   // interno do anel (copo + folga)
    ae = ai + parede;                // externo em cima
    ab = ae + degrau_larg;           // externo embaixo (degrau)
    difference() {
        union() {
            prisma(ab, degrau_alt);
            prisma(ae, anel_altura);
        }
        // furo principal (começa acima da aba de apoio)
        translate([0, 0, apoio_alt]) linear_extrude(anel_altura) poligono(ai);
        // furo da aba de apoio, com chanfro embaixo
        translate([0, 0, -0.01]) hull() {
            linear_extrude(0.01) poligono(ai - apoio_larg + chanfro);
            translate([0, 0, chanfro]) linear_extrude(apoio_alt) poligono(ai - apoio_larg);
        }
        // chanfro de entrada no topo, facilita encaixar o copo
        translate([0, 0, anel_altura - 0.6])
            hull() {
                linear_extrude(0.01) poligono(ai);
                translate([0, 0, 0.6]) linear_extrude(0.01) poligono(ai + 0.6);
            }
    }
}

if (peca == "copo") copo();
else if (peca == "anel") anel();
else {
    translate([-(copo_largura / 2 + 4), 0, 0]) copo();
    translate([  copo_largura / 2 + parede + degrau_larg + 6, 0, 0]) anel();
}
