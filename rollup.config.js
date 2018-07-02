import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace'
import commonjs from 'rollup-plugin-commonjs';
import globals from 'rollup-plugin-node-globals';
import builtins from 'rollup-plugin-node-builtins';


let package_json = require('./package.json')

const babelConfig = {
  'presets': [
    ['env', {
      'targets': {
        'browsers': ['last 2 versions']
      },
      'loose': true
    }]
  ]
};

export default {
  input: 'index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'cjs',
    name: 'admin_widget_sdk',
    sourceMap: true,
  },
  external: [],
  plugins: [
    resolve({
      module: true,
      browser: true,
      preferBuiltins: true,
    }),
    commonjs({
      ignoreGlobal: false,
      include: 'node_modules/**',
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    globals(),
    builtins(),
  ],

};