import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
      proxy: {
        '/leaderboard': {
          target: 'http://localhost:8080',
          changeOrigin: true,
          secure: false,
      },
    },
  },
})
 // const LEADERBOARD_ROUTE =
  //   'https://baas-data-provider.onrender.com/leaderboard';
  // const LEADERBOARD_ROUTE = 'http://localhost:8080/leaderboard'; // If you want to use local server use
