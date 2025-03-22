import { version } from "../package.json";

import { defineConfig } from "vite";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
    /**
     * Vite environment variables.
     */
    process.env = {
        ...process.env,
        VITE_APP_VERSION: version
    };

    return {
        build: {
            chunkSizeWarningLimit: 2000,
            cssMinify: "lightningcss",
            rollupOptions: {
                output: {
                    manualChunks (id, chunkInfo) {
                        if (id.includes("node_modules")) return "vendor";
                        if (id.includes("shared")) return "shared";
                    }
                }
            }
        },

        server: {
            port: 3000,
            strictPort: true,
            host: "0.0.0.0",
            proxy: {
                "/api": {
                    target: "http://127.0.0.1:8080",
                    changeOrigin: true,
                    secure: false
                }
            }
        },

        preview: {
            port: 3000,
            strictPort: true,
            host: "0.0.0.0",
            proxy: {
                "/api": {
                    target: "http://127.0.0.1:8080",
                    changeOrigin: true,
                    secure: false
                }
            }
        },

        css: {
            devSourcemap: mode === "development"
        },

        json: {
            stringify: true
        },

        plugins: [
            tailwindcss(),
            sveltekit(),
            ViteImageOptimizer({
                test: /\.(svg)$/i,
                logStats: false
            })
        ]
    };
});
