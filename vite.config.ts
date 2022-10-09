import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    server: {
        proxy: {
            '/cbr': {
                target: 'http://www.cbr.ru',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/cbr/, '')
            },
            '/consultant': {
                target: 'https://www.consultant.ru',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/consultant/, '')
            }
        }
    },
    resolve: {
        alias: [{find: "@", replacement: "/src"}]
    }
})
