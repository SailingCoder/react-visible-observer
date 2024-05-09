import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'lib/bundle.cjs.js',
      format: 'cjs'
    },
    {
      file: 'lib/bundle.esm.js',
      format: 'esm'
    }
  ],
  external: ['react', 'react-dom'],
  plugins: [
    resolve(), // 解析Node模块
    commonjs(), // 转换CJS模块为ES6
    babel({
        exclude: 'node_modules/**',
        babelHelpers: 'bundled'
    }),
    terser()  // 压缩输出的代码
  ]
};
