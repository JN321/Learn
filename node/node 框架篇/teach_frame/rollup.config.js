import babel from 'rollup-plugin-babel'
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';

export default {
    input: './src/index.js',
    output: {
        file: './dist/bundle.js',
        format: "umd",
    },
    treeshake: false,
    plugins: [
        babel({
            runtimeHelpers: true,
            extensions: [".js", ".ts"],
            exclude: "node_modules/**",
            externalHelpers: true
        }),
        json()
        // nodeResolve(), commonjs(), json()
    ]
}