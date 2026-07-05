import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// IMPORTANT: if deploying to GitHub Pages as a *project* site
// (https://<user>.github.io/<repo-name>/), base must equal "/<repo-name>/".
// If using a custom domain or a *user/org* page (<user>.github.io), use "/".
export default defineConfig({
  plugins: [react()],
  base: "/coopai/",
});
