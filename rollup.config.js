import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import postcss from 'rollup-plugin-postcss';
import babel from '@rollup/plugin-babel';
import autoprefixer from 'autoprefixer';
import postcssCopy from 'postcss-copy';
import json from '@rollup/plugin-json';

const packageJson = require('./package.json');

export default {
    input: 'src/index.ts',
    output: [
        {
            file: packageJson.main,
            format: 'cjs',
            sourcemap: true
        },
        {
            file: packageJson.module,
            format: 'esm',
            sourcemap: true
        }
    ],
    plugins: [
        peerDepsExternal(),
        nodeResolve({ browser: true }),
        typescript({ 
            useTsconfigDeclarationDir: true, 
            exclude: [
                'src/stories/*.stories.(js|jsx|ts|tsx)',
                'src/storiesHelpers/**/*.(ts|tsx)'
            ]
        }),
        babel({
            exclude: [
                'node_modules/**',
                'src/*/*.stories.(js|jsx|ts|tsx)',
                'src/storiesHelpers/**/*.(ts|tsx)',
            ],
            babelHelpers: 'runtime',
        }),
        commonjs(),
        postcss({
            extract: true,
            plugins: [postcssCopy({ dest: 'dist' }), autoprefixer()],
            minimize: true,
            sourceMap: true,
            modules: false,
            extensions: ['.sass', '.css', '.scss']
        }),
        json({ compact: true }),
    ],
    external: id => id.includes('@babel/runtime'),
    onwarn: function (warning, warn) {
        if(warning.code === 'CIRCULAR_DEPENDENCY') {
            if(warning.importer.startsWith("node_modules/d3-transition")) return;
            if(warning.importer.startsWith("node_modules/d3-selection")) return;
            if(warning.importer.startsWith("node_modules/d3-interpolate")) return;
        }
        console.log(warning);
        warn(warning);
    }
};