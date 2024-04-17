import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import tailwind from "tailwindcss";
import autoprefixer from "autoprefixer";

import { fileURLToPath, URL } from "node:url";


const makeUUID = () => {
    let dt = new Date().getTime();
    return "xxxxxx".replace(/[xy]/g, function (c) {
        const r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c === "x" ? r : (r & 0x3 | 0x8)).toString(16);
    });
};

const version = process.env.npm_package_version as string + "-" + makeUUID();

export default defineConfig(async () => ({

    css: {
        postcss: {
            plugins: [tailwind(), autoprefixer()],
        },
    },

    plugins: [vue()],

    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url))
        }
    },

    clearScreen: false,

    server: {
        port: 1420,
        strictPort: true,
        watch: {
            ignored: ["**/src-tauri/**"],
        },
        headers: {
            "Cross-Origin-Opener-Policy": "same-origin",
            "Cross-Origin-Embedder-Policy": "require-corp",
        },
    },

    optimizeDeps: {
        exclude: ["@ffmpeg/ffmpeg", "@ffmpeg/util"],
    },

    define: {
        "__APP_VERSION__": JSON.stringify(version),
    },
}));
