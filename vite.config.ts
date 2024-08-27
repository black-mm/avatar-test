import { defineConfig } from "vite";
import path from "path";
import vue from "@vitejs/plugin-vue";
import AutoImport from 'unplugin-auto-import/vite'


export default defineConfig({
  plugins: [
    vue(),
    AutoImport({ 
      imports: [
        'vue',  // 导入vue3相关api
        'vue-router',// 导入vue-router相关api
      ],
      dts: 'src/typings/auto-import.d.ts' // 在src目录下生成一个指令文件存放各种全局指令
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  css: {
    //配置了对 SCSS 的处理选项
    preprocessorOptions: {
      scss: {
        //引入了全局的 SCSS 文件 global.scss
        additionalData: `@import "./src/styles/variables.scss";`,
      },
    },
  },
});
