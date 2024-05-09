import babel from 'rollup-plugin-babel';
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
    babel({
      exclude: 'node_modules/**'
    }),
    terser()  // 压缩输出的代码
  ]
};
