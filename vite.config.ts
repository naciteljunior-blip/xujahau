import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// O site é publicado na raiz de https://plisselab.github.io, então não há subpasta.
export default defineConfig({
  base: '/',
  plugins: [react()],
  server: {
    host: true,
  },
})
