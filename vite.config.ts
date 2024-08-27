import { defineConfig } from "vite";
import path from "path";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
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
