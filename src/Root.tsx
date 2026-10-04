import { useEffect, useState } from 'react'
import App from './App.tsx'
import Loja from './loja/Loja.tsx'

export default function Root() {
  const [hash, setHash] = useState(window.location.hash)

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  return hash === '#calculadora' ? <App /> : <Loja />
}
