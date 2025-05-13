/// <reference types="vitest" />
import { defineConfig } from "vite";

export default defineConfig({
  test: {
    globals: true, // Enables global APIs like describe, expect, it
  },
});
