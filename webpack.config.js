const path = require('path');
const slsw = require('serverless-webpack');
const TerserPlugin = require('terser-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
    entry: slsw.lib.entries,
    mode: 'production',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    optimization: {
        usedExports: true,
        minimizer: [
            new TerserPlugin({
                parallel: true,
                terserOptions: {
                    mangle: false,
                    compress: { ecma: 9 },
                    output: {
                        comments: false,
                    },
                },
            }),
        ],
    },
    target: 'node',
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
            isobject$: path.resolve(
                __dirname,
                './node_modules/isobject/index.cjs.js',
            ),
        },
        plugins: [new TsconfigPathsPlugin()],
    },
    node: {
        __dirname: false,
        __filename: false,
    },
    output: {
        libraryTarget: 'commonjs',
        path: path.join(__dirname, '.webpack'),
        filename: '[name].js',
    },
};