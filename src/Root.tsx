import { useEffect, useState } from 'react'
import App from './App.tsx'
import Loja from './loja/Loja.tsx'
import LojaNova from './loja/LojaNova.tsx'

export default function Root() {
  const [hash, setHash] = useState(window.location.hash)

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  if (hash === '#calculadora') return <App />
  return new URLSearchParams(window.location.search).get('estilo') === 'novo' ? <LojaNova /> : <Loja />
}
