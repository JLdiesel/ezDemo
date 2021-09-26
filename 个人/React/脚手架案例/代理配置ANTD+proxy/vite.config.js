import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import vitePluginImp from 'vite-plugin-imp';
const { resolve } = require('path');
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh(),
   vitePluginImp({
      libList: [
        {
          libName: 'antd',
          style: (name) => `antd/es/${name}/style`,
        },
      ],
   }),],
   alias: {
    '@': resolve('src'),
    'img': resolve('src/assets/images'),
    'components': resolve('src/components'),
    'common':resolve('src/common'),
    'views': resolve('src/view'),
    'network': resolve('src/network')
  }
  , css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
         modifyVars:{'@primary-color':'orange'}

      },
    },
  }, server: {
      proxy: {
        '/api': {
          target: 'http://localhost:8080',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        },
      }
    }
})
