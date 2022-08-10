/// <reference types="vitest" />
import { defineConfig } from 'vite'
import {resolve} from 'path'
console.log(resolve(__dirname,"../packages/*/src"));
export default defineConfig({
  test: {
    // ...
    globals: true,
    alias: {
      "@test":resolve(__dirname,"../packages")
    },
        coverage: {
      reporter: ['src'],
    },

  },

})