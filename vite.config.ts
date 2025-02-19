import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";
import svgrPlugin from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig(() => {
  return {
    base: "./",
    plugins: [
      react(),
      tailwindcss(),
      svgrPlugin({
        include: "**/*.svg",
        svgrOptions: {
          exportType: "default",
        },
      }),
    ],
    server: {
      port: 8000,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    test: {
      includeSource: ["src/**/*.{js,ts,jsx,tsx}"],
      environment: "happy-dom",
      globals: true,
      coverage: {
        provider: "v8",
        reporter: ["text", "json", "html"],
        reportsDirectory: "coverage",
        exclude: [
          "**/main.tsx",
          "**/vite.config.ts",
          "**/*.cjs",
          "**/coverge/**",
          "**/dist/**",
          "**/eslint.config.js",
          "**/vite-env.d.ts",
          "**/constants/**",
          "**/ports/**",
          "**/interfaces/sortfield.ts",
        ],
      },
    },
    build: {
      outDir: "dist",
      emptyOutDir: true,
      minify: true,
      assetsDir: "assets",
      cssCodeSplit: true,
      sourcemap: false,
      rollupOptions: {
        treeshake: true,
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              return id
                .toString()
                .split("node_modules/")[1]
                .split("/")[0]
                .toString();
            }
          },
        },
      },
    },
    optimizeDeps: {
      esbuildOptions: {
        minify: false,
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
        },
      },
    },
  };
});
