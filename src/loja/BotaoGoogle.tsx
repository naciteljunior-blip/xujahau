import { useEffect, useRef } from 'react'
import { carregarGoogle, loginGoogleAtivo, type UsuarioGoogle } from './google'

/** Botão oficial "Fazer login com o Google". Não aparece enquanto `googleClientId` estiver vazio. */
export function BotaoGoogle({ compacto = false, className = '' }: { compacto?: boolean; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!loginGoogleAtivo) return
    let ativo = true
    carregarGoogle()
      .then((g) => {
        if (!ativo || !ref.current) return
        g.accounts.id.renderButton(ref.current, {
          type: compacto ? 'icon' : 'standard',
          theme: 'outline',
          size: 'large',
          shape: 'pill',
          text: 'signin_with',
          locale: 'pt-BR',
        })
      })
      .catch(() => {})
    return () => {
      ativo = false
    }
  }, [compacto])

  if (!loginGoogleAtivo) return null
  return <div ref={ref} className={`min-h-10 ${className}`} />
}

export function Avatar({ usuario, className = 'h-8 w-8' }: { usuario: UsuarioGoogle; className?: string }) {
  return usuario.foto ? (
    <img src={usuario.foto} alt="" referrerPolicy="no-referrer" className={`${className} rounded-full ring-2 ring-pessego`} />
  ) : (
    <span className={`${className} flex items-center justify-center rounded-full bg-vinho text-sm font-extrabold text-pessego`} aria-hidden>
      {usuario.nome.charAt(0).toUpperCase()}
    </span>
  )
}
