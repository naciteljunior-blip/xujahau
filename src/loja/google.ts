import { useSyncExternalStore } from 'react'
import { loja } from './config'

/**
 * Login com Google (Google Identity Services), sem servidor.
 * Serve só para preencher nome e e-mail do cliente: o token não é verificado em um servidor,
 * então não use o usuário daqui para liberar nada que precise de segurança.
 */

export type UsuarioGoogle = { nome: string; email: string; foto?: string }

type CredencialGoogle = { credential: string }
type Google = {
  accounts: {
    id: {
      initialize: (opcoes: Record<string, unknown>) => void
      renderButton: (el: HTMLElement, opcoes: Record<string, unknown>) => void
      disableAutoSelect: () => void
    }
  }
}

declare global {
  interface Window {
    google?: Google
  }
}

const CHAVE = 'plisselab-usuario'
const ouvintes = new Set<() => void>()
let usuario: UsuarioGoogle | null = ler()
let carregando: Promise<Google> | null = null

function ler(): UsuarioGoogle | null {
  try {
    const salvo = window.localStorage.getItem(CHAVE)
    return salvo ? (JSON.parse(salvo) as UsuarioGoogle) : null
  } catch {
    return null
  }
}

function salvar(novo: UsuarioGoogle | null) {
  usuario = novo
  try {
    if (novo) window.localStorage.setItem(CHAVE, JSON.stringify(novo))
    else window.localStorage.removeItem(CHAVE)
  } catch {
    // localStorage indisponível (modo privado, cota excedida, etc.) — o login vale só nesta visita
  }
  ouvintes.forEach((f) => f())
}

/** Lê o conteúdo do token do Google (JWT), tratando acentos no nome. */
function decodificar(token: string): UsuarioGoogle | null {
  try {
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
    const bytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0))
    const dados = JSON.parse(new TextDecoder().decode(bytes)) as { name?: string; email?: string; picture?: string }
    if (!dados.email) return null
    return { nome: dados.name ?? dados.email, email: dados.email, foto: dados.picture }
  } catch {
    return null
  }
}

export const loginGoogleAtivo = loja.googleClientId.trim().length > 0

export function carregarGoogle(): Promise<Google> {
  carregando ??= new Promise((resolve, reject) => {
    const pronto = () => {
      window.google!.accounts.id.initialize({
        client_id: loja.googleClientId,
        callback: ({ credential }: CredencialGoogle) => {
          const novo = decodificar(credential)
          if (novo) salvar(novo)
        },
        auto_select: false,
        use_fedcm_for_prompt: true,
      })
      resolve(window.google!)
    }
    if (window.google?.accounts) return pronto()
    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    script.onload = pronto
    script.onerror = () => {
      carregando = null
      reject(new Error('Não foi possível carregar o login do Google'))
    }
    document.head.appendChild(script)
  })
  return carregando
}

export function useUsuarioGoogle() {
  const atual = useSyncExternalStore(
    (f) => {
      ouvintes.add(f)
      return () => ouvintes.delete(f)
    },
    () => usuario,
  )
  return {
    usuario: atual,
    sair: () => {
      window.google?.accounts.id.disableAutoSelect()
      salvar(null)
    },
  }
}
