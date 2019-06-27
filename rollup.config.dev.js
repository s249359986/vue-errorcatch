
// import commonjs from 'rollup-plugin-commonjs';
// import babel from 'rollup-plugin-babel';
// import json from 'rollup-plugin-json';
// import filesize from 'rollup-plugin-filesize';
// import resolve from 'rollup-plugin-node-resolve'
import { version } from './package.json';

const banner =
    '/*!\n' + ' vue-error-plugin v' + version + '\n' + ' * \n' + ' */';
export default {
    input: 'src/error.js',
    output: [{       
      file: './dist/VueError.umd.js',
      name:'VueError',
      sourcemap: true,
      format: 'umd',
      banner
    },{       
        file: './dist/VueError.esm.js',
        name:'VueError',
        sourcemap: true,
        format: 'es',
        banner
      }]
  };