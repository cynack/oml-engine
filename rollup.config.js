const fs = require('fs')
const path = require('path')
const commonjs = require('rollup-plugin-commonjs')
const resolve = require('rollup-plugin-node-resolve')
const cleanup = require('rollup-plugin-cleanup')
const babel = require('rollup-plugin-babel')
const url = require('rollup-plugin-url')
const banner = fs.readFileSync(path.join(__dirname, 'licenses.txt'))

export default {
  input: 'src/OML.js',
  output: {
    file: './build/OML.js',
    format: 'umd',
    name: 'OML',
    banner: banner
  },
  watch: {
    include: 'src/**'
  },
  plugins: [
    resolve(),
    commonjs(),
    url({
      limit: 100 * 1024,
      include: ['**/*.jpg']
    }),
    babel({
      exclude: 'node_modules/**'
    }),
    cleanup()
  ]
}
