import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';

/** @type {import('rollup').RollupOptions} */
export default {
    input: "./wwwroot/js/site.js",
    output: {
        file: "./wwwroot/js/_site.js",
        format: "umd"
    },
    plugins: [
        nodeResolve(),
        commonjs()
    ]
};