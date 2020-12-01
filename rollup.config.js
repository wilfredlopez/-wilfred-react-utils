import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import pkg from './package.json'
import rollupTypescript from '@rollup/plugin-typescript'
const extensions = ['.js', '.jsx', '.ts', '.tsx']
const name = 'ReactUtils'

export default {
  input: './src/index.ts',

  // Specify here external modules which you don't want to include in your bundle (for instance: 'lodash', 'moment' etc.)
  // https://rollupjs.org/guide/en#external-e-external
  external: ['fs', 'regeneratorRuntime'],

  plugins: [
    // Allows node_modules resolution
    resolve({
      extensions,
      customResolveOptions: {
        // pass custom options to the resolve plugin
        moduleDirectory: 'node_modules',
      },
    }),
    // Allow bundling cjs modules. Rollup doesn't understand cjs
    commonjs(),
    // Compile TypeScript/JavaScript files
    babel({
      extensions,
      include: ['src/**/*'],
    }),
  ],

  output: [
    {
      // file: pkg.main,
      dir: 'dist',
      format: 'cjs',
      sourcemap: true,
      plugins: [
        rollupTypescript({
          dir: 'dist',
          module: 'CommonJS',
          sourcemap: true,
        }),
      ],
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
    },
    {
      file: pkg.browser,
      format: 'iife',
      sourcemap: true,
      name,

      // https://rollupjs.org/guide/en#output-globals-g-globals
      globals: {
        fs: "require('fs')",
        regeneratorRuntime: "require('regenerator-runtime')",
        '@babel/runtime/regenerator': 'regeneratorRuntime',
      },
    },
  ],
}
