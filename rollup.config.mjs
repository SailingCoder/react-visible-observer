import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import pkg from './package.json';

export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main, // "dist/main.js"
      format: 'cjs',
    },
    {
      file: pkg.module, // "dist/module.js"
      format: 'esm',
    }
  ],
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
      preventAssignment: true // 添加此行以防止将来的问题
    }),
    resolve(),
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'bundled',
      presets: ['@babel/preset-env', '@babel/preset-react']
    }),
    commonjs()
  ],
  external: ['react', 'react-dom']
};
