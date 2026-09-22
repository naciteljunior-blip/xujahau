import type { CalcInputs } from './lib/calc'

export interface SavedPeca {
  id: string
  nome: string
  criadoEm: number
  inputs: CalcInputs
}
