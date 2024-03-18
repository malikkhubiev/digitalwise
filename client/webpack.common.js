const path = require("path");
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");

const useRools = preset => {
    const rool = {
        loader: "babel-loader",
        options: {
            presets: ["@babel/preset-env"]
        }
    };
    if (preset) rool.options.presets.push(preset);
    return rool;
};

module.exports = {
    entry: {
        main: "./src/index.tsx",
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist"),
        clean: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new Dotenv(),
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: useRools("@babel/preset-react")
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: useRools()
            },
            {
                test: /\.png|jpg|svg|eot|woff|woff2|ttf$/,
                use: "file-loader"
            }
        ]
    },
    ignoreWarnings: [
        (warning) => true,
    ]
};