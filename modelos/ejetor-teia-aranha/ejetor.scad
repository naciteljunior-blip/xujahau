// Ejetor de teia do Homem-Aranha – cilindro com aba na base e desenho em relevo no topo
// Abra no OpenSCAD, ajuste os parâmetros e exporte o STL (F6 → F7).
// "desenho": "teia", "aranha" ou "teia_aranha".

desenho = "teia_aranha";

/* [Medidas gerais] */
diametro_base = 35;    // diâmetro da aba de baixo (= largura total X/Y)
altura        = 30;    // altura total (Z)
corpo_recuo   = 2.0;   // quanto o corpo é mais fino que a aba, por lado
aba_altura    = 3.0;   // altura da aba da base
chanfro       = 0.5;   // chanfro na base (evita "pé de elefante")

/* [Topo] */
borda         = 1.2;   // largura da borda em volta do desenho (3 linhas de 0.4)
rebaixo       = 1.0;   // profundidade do fundo do desenho (5 camadas de 0.2)
fio           = 1.0;   // largura dos fios da teia (2 linhas de extrusão)
perna         = 1.4;   // largura das pernas da aranha
aneis_teia    = 5;     // voltas da teia
curvatura     = 0.12;  // quanto os fios entre os raios "caem" para o centro

/* [Hidden] */
$fn = 128;
raios = 12;
d_corpo = diametro_base - 2 * corpo_recuo;
r_rebaixo = d_corpo / 2 - borda;

module traco(p, q, w) hull() { translate(p) circle(d = w, $fn = 24); translate(q) circle(d = w, $fn = 24); }
module linha(pts, w) for (i = [0:len(pts) - 2]) traco(pts[i], pts[i + 1], w);

module teia2d(r) {
    for (i = [0:raios - 1]) traco([0, 0], r * 1.1 * [cos(i * 360 / raios), sin(i * 360 / raios)], fio);
    passos = 8;
    for (n = [1:aneis_teia], i = [0:raios - 1], s = [0:passos - 1]) {
        rr = r * n / (aneis_teia + 0.3);
        a1 = i * 360 / raios;
        t1 = s / passos;  t2 = (s + 1) / passos;
        traco(rr * (1 - curvatura * sin(180 * t1)) * [cos(a1 + t1 * 360 / raios), sin(a1 + t1 * 360 / raios)],
              rr * (1 - curvatura * sin(180 * t2)) * [cos(a1 + t2 * 360 / raios), sin(a1 + t2 * 360 / raios)], fio);
    }
    circle(d = fio * 2.6, $fn = 24);
}

// aranha estilizada (estilo emblema), em unidades onde 1 = raio do rebaixo
pernas = [
    [[0.06, 0.26], [0.30, 0.48], [0.36, 0.86]],
    [[0.09, 0.20], [0.46, 0.32], [0.62, 0.62]],
    [[0.09, 0.12], [0.46, 0.00], [0.62, -0.32]],
    [[0.06, 0.05], [0.30, -0.24], [0.36, -0.74]],
];
module aranha2d(r) {
    scale([r, r]) {
        translate([0, 0.42]) circle(r = 0.10, $fn = 48);                        // cabeça
        translate([0, 0.20]) scale([0.16, 0.20]) circle(r = 1, $fn = 64);       // tórax
        hull() {                                                                 // abdômen
            translate([0, -0.14]) circle(r = 0.15, $fn = 48);
            translate([0, -0.66]) circle(r = 0.05, $fn = 24);
        }
    }
    for (m = [0, 1]) mirror([m, 0]) for (p = pernas) linha(r * p, perna);
}

module desenho2d(r) {
    if (desenho == "teia") teia2d(r);
    else if (desenho == "aranha") aranha2d(r * 0.95);
    else {
        // teia com um vão em volta da aranha, para a aranha ficar bem destacada
        difference() { teia2d(r); offset(delta = 0.9) aranha2d(r * 0.85); }
        aranha2d(r * 0.85);
    }
}

module ejetor() {
    difference() {
        union() {
            // aba da base com chanfro embaixo e rampa de 45° em cima (sem saliência)
            hull() {
                cylinder(d = diametro_base - 2 * chanfro, h = chanfro);
                translate([0, 0, chanfro]) cylinder(d = diametro_base, h = aba_altura - chanfro - corpo_recuo / 2);
                cylinder(d = d_corpo, h = aba_altura + corpo_recuo / 2);
            }
            // corpo com leve chanfro na borda de cima
            cylinder(d = d_corpo, h = altura - 0.4);
            cylinder(d = d_corpo - 0.8, h = altura);
        }
        translate([0, 0, altura - rebaixo]) cylinder(r = r_rebaixo, h = rebaixo + 1);
    }
    // desenho sobe até a altura da borda
    translate([0, 0, altura - rebaixo - 0.01])
        linear_extrude(rebaixo + 0.01)
            // offset duplo arredonda cantos minúsculos e limpa a malha
            offset(r = 0.1, $fn = 12) offset(delta = -0.1)
                intersection() { desenho2d(r_rebaixo); circle(r = r_rebaixo + 0.1); }
}

ejetor();
