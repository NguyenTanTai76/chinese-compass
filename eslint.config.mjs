import { defineConfig, globalIgnores } from "eslint/config";
import webVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

export default defineConfig([
  ...webVitals,
  ...typescript,
  // Keep existing hydration/reset patterns visible during the React 19 migration.
  { rules: { "react-hooks/set-state-in-effect": "warn" } },
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);
