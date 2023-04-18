/*
 * @Author: jiangruohui
 * @Date: 2022-03-15 13:49:37
 * @LastEditors: huangjin
 * @LastEditTime: 2023-04-18 16:04:38
 * @Description:
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import styleImport, { VantResolve } from 'vite-plugin-style-import'
import AutoImport from 'unplugin-auto-import/vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { viteVConsole } from 'vite-plugin-vconsole'

// https://vitejs.dev/config/
export default ({ mode }) => {
  return defineConfig({
    plugins: [
      vue({
        template: {
          compilerOptions: {
            isCustomElement: (tag) => tag.includes('wx-open-launch')
          }
        }
      }),
      styleImport({
        resolves: [VantResolve()]
      }),
      AutoImport({
        imports: ['vue', 'vue-router', 'pinia'],
        // eslint报错解决
        eslintrc: {
          enabled: false, // Default `false`
          filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
          globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
        },
        dts: 'src/auto-import.d.ts'
      }),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [resolve(process.cwd(), 'src/assets/icons')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]'
      }),
      // VConsole 调试工具配置
      viteVConsole({
        entry: resolve('src/main.ts'), // 入口文件，或者可以使用这个配置: [path.resolve('src/main.js')]
        localEnabled: mode === 'test' || mode === 'dev', // 本地是否启用
        enabled: mode === 'test' || mode === 'dev', // 是否启用
        config: {
          maxLogNumber: 1000,
          theme: 'light' // 主题颜色 'dark'|'light'
        }
      })
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    },
    server: {
      host: '0.0.0.0'
    },
    base: '/bim/',
    // server: {
    //   port: 4000, // 启动端口
    //   open: true,
    //   proxy: {
    //     // 选项写法
    //     '/api': 'http://123.56.85.24:5000' // 代理网址
    //   },
    //   cors: true
    // }
    build: {
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      },
      assetsDir: 'static'
    }
  })
}
