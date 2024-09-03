import { build } from "esbuild";
import { minifyHTMLLiteralsPlugin } from "esbuild-plugin-minify-html-literals";

await build({
  bundle: true,
  entryPoints: ["app.ts"],
  outdir: "build",
  minify: true,
  plugins: [minifyHTMLLiteralsPlugin()],
  format: "esm",
  treeShaking: true,
  splitting: true,
  write: true,
});

process.exit(0);
