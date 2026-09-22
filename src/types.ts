import type { CalcInputs } from './lib/calc'

export interface SavedPeca {
  id: string
  nome: string
  criadoEm: number
  inputs: CalcInputs
}

export interface Filamento {
  id: string
  marca: string
  modelo: string
  cor?: string
  precoKg: number
  criadoEm: number
}
