

import MiniCssExtractPlugin from 'mini-css-extract-plugin';
//import ModuleScopePlugin from 'react-dev-utils/ModuleScopePlugin';
//import TsConfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import path from 'path';
//import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack from "webpack";

//const extractTextPlugin = new MiniCssExtractPlugin();
const appSrc = path.resolve(__dirname, 'src');

const config: webpack.Configuration = {
    mode: "development",
    entry: "./src/index.tsx",
    devtool: 'cheap-module-source-map',
    output: {
        path: path.resolve(__dirname, 'build'),
        chunkFilename: 'static/js/[name].chunk.js',
        devtoolModuleFilenameTemplate: info =>
            path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
    },
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    plugins: [
        new MiniCssExtractPlugin(),
        //extractTextPlugin,
        //new ModuleScopePlugin(appSrc, [path.resolve(__dirname, 'package.json')]),

    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx|mjs)$/,
                loader: 'source-map-loader',
                enforce: 'pre',
                include: appSrc,
            },
            {
                // Include ts, tsx, js, and jsx files.
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // you can specify a publicPath here
                            // by default it uses publicPath in webpackOptions.output
                            publicPath: '../',
                            hmr: process.env.NODE_ENV === 'development',
                        },
                    },
                    'css-loader',
                ],
            }
        ]
    },
};

export default config;