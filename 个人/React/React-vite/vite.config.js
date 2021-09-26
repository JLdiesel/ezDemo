import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import vitePluginImp from 'vite-plugin-imp';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    reactRefresh(),
    // vitePluginImp({
    //   libList: [
    //     {
    //       libName: "antd",
    //       style: (name) => `antd/lib/${name}/style/index.less`,
    //     },
    //   ],
    // })
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        // 设置主题风格
        //  modifyVars:{'@primary-color':'blue'}

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
