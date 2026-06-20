import * as esbuild from 'esbuild';
const watch = process.argv.includes('--watch');

const ctx = await esbuild.context({
  entryPoints: ['src/embed.js'],
  bundle: true,
  minify: !watch,
  outfile: 'dist/embed.js',
  format: 'iife',
  target: ['es2018'],
  define: {
    'process.env.NODE_ENV': watch ? '"development"' : '"production"',
  },
});

if (watch) {
  await ctx.watch();
  console.log('watching...');
} else {
  await ctx.rebuild();
  await ctx.dispose();
  console.log('build complete → dist/embed.js');
}
