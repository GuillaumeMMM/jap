import { build } from "esbuild";
import { minifyHTMLLiteralsPlugin } from "esbuild-plugin-minify-html-literals";
import { copy } from "esbuild-plugin-copy";

await build({
  bundle: true,
  entryPoints: ["app.ts"],
  outdir: "build",
  minify: true,
  plugins: [
    minifyHTMLLiteralsPlugin(),
    copy({
      resolveFrom: "cwd",
      assets: {
        from: ["./src/assets/*"],
        to: ["./build/assets"],
      },
      watch: true,
    }),
  ],
  format: "esm",
  treeShaking: true,
  splitting: true,
  write: true,
});

process.exit(0);
