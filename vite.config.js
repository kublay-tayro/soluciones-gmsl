import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/soluciones-gmsl/", // <--- ESTA LÍNEA ES LA CLAVE (nombre exacto de tu repo)
})