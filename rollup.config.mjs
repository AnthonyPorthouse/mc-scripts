import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';
import shebang from 'rollup-plugin-preserve-shebang';
import executable from 'rollup-plugin-executable'

export default {
    input: 'src/app.ts',
    output: {
        file: 'dist/app.js',
        format: 'cjs',
    },
    plugins: [ commonjs(), typescript(), json(), shebang(), executable()]
}
