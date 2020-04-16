import resolve from 'rollup-plugin-node-resolve';
import {terser} from 'rollup-plugin-terser';
import includePaths from 'rollup-plugin-includepaths';

export default {
  input: './esm/index.js',
  plugins: [
    includePaths({
      include: {
        '@ungap/own-keys': 'node_modules/@ungap/degap/own-keys.js'
      },
    }),
    resolve({module: true}),
    terser()
  ],
  
  output: {
    exports: 'named',
    file: './es.js',
    format: 'iife',
    name: 'cloner'
  }
};
