export interface CalcInputs {
  precoFilamentoKg: number // R$ por kg de filamento
  materialUsadoG: number // gramas de filamento usadas na peça
  duracaoHoras: number // horas de impressão
  tarifaEnergiaKwh: number // R$ por kWh
  potenciaImpressoraW: number // consumo da impressora em watts
  desgasteImpressora: number // R$ por hora (depreciação/manutenção da impressora)
  falhaPercent: number // % de perda/desperdício (reimpressões, erros)
  embalagem: number // R$ - custo de embalagem/acabamento
  maoDeObra: number // R$ - valor fixo de mão de obra
  percentLucro: number // fração (0.2 = 20%)
  quantidade: number // número de peças sendo produzidas no mesmo cálculo
}

export interface CalcResult {
  custoFilamento: number
  custoEnergia: number
  custoDesgaste: number
  custoEmbalagem: number
  subtotalCusto: number
  custoFalha: number
  custoTotal: number
  valorLucro: number
  custoMaisLucro: number
  precoSugeridoUnitario: number
  precoSugeridoTotal: number
}

export const DEFAULT_INPUTS: CalcInputs = {
  precoFilamentoKg: 68,
  materialUsadoG: 94,
  duracaoHoras: 3,
  tarifaEnergiaKwh: 1.1,
  potenciaImpressoraW: 200,
  desgasteImpressora: 2,
  falhaPercent: 0,
  embalagem: 0,
  maoDeObra: 10,
  percentLucro: 0.2,
  quantidade: 1,
}

export function calcular(inputs: CalcInputs): CalcResult {
  const custoFilamento = (inputs.precoFilamentoKg / 1000) * inputs.materialUsadoG
  const custoEnergia = ((inputs.tarifaEnergiaKwh * inputs.potenciaImpressoraW) / 1000) * inputs.duracaoHoras
  const custoDesgaste = inputs.desgasteImpressora * inputs.duracaoHoras
  const custoEmbalagem = inputs.embalagem

  const subtotalCusto = custoFilamento + custoEnergia + custoDesgaste + custoEmbalagem
  const custoFalha = subtotalCusto * (inputs.falhaPercent / 100)
  const custoTotal = subtotalCusto + custoFalha

  const valorLucro = custoTotal * inputs.percentLucro
  const custoMaisLucro = custoTotal + valorLucro

  const precoSugeridoUnitario = custoMaisLucro + inputs.maoDeObra
  const quantidade = Math.max(1, inputs.quantidade || 1)
  const precoSugeridoTotal = precoSugeridoUnitario * quantidade

  return {
    custoFilamento,
    custoEnergia,
    custoDesgaste,
    custoEmbalagem,
    subtotalCusto,
    custoFalha,
    custoTotal,
    valorLucro,
    custoMaisLucro,
    precoSugeridoUnitario,
    precoSugeridoTotal,
  }
}

export function formatBRL(value: number): string {
  if (!Number.isFinite(value)) return 'R$ 0,00'
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}
