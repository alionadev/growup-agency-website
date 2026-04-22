import { vercelEdgeAdapter } from "@builder.io/qwik-city/adapters/vercel-edge/vite";
import { extendConfig } from "@builder.io/qwik-city/vite";
import baseConfig from "../../vite.config";

export default extendConfig(baseConfig, () => {
  const isMonorepoRootBuild = process.env.MONOREPO_ROOT_BUILD === "1";

  return {
    build: {
      ssr: true,
      rollupOptions: {
        input: ["src/entry.vercel-edge.tsx", "@qwik-city-plan"],
      },
      // Support both deployment modes:
      // 1. Root-level monorepo build via the repository package.json
      // 2. Direct project build when Vercel Root Directory points to growup-agency
      outDir: isMonorepoRootBuild
        ? "../.vercel/output/functions/_qwik-city.func"
        : ".vercel/output/functions/_qwik-city.func",
    },
    plugins: [vercelEdgeAdapter()],
  };
});
