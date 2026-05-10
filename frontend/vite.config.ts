import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig({
  vite: {
    plugins: [
      nodePolyfills({
        include: ["buffer", "process"],
        globals: {
          Buffer: true,
          global: true,
          process: true,
        },
      }),
    ],
    ssr: {
      noExternal: ['@ledgerhq/errors', '@ledgerhq/devices'],
    },
  },

  tanstackStart: {
    server: { entry: "server" },
  },
});