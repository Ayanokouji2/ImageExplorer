import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define:{
    'process.env':{
      API_KEY:'w0UzAqHd8fTNgcGCU7dtrmXK_EhRCf6KTxhFR5pEuV4'
    }
  }
})
