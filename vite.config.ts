import { coverageConfigDefaults, defineConfig } from "vitest/config";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsConfigPaths()],
  test: {
    coverage: {
      exclude: [
        "build/**",
        "src/server.ts",
        "src/http/app.ts",
        ...coverageConfigDefaults.exclude,
      ],
    },
  },
});