const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: "development",
    entry: path.resolve(__dirname, "src", "index.js"),
    devtool: "source-map",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                    },
                },
            },
            {
                test: /\.s[ac]ss$/i,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src", "index.html"),
            filename: "index.html",
            title: "Todo",
            inject: "body",
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "src", "assets", "icons"),
                    to: "public/icons",
                },
                {
                    from: path.resolve(__dirname, "src", "assets", "images"),
                    to: "public/images",
                },
                {
                    from: path.resolve(__dirname, "src", "sw.js"),
                    to: ".",
                },
                {
                    from: path.resolve(__dirname, "src", "manifest.json"),
                    to: ".",
                },
                {
                    from: path.resolve(__dirname, "src", "favicon.ico"),
                    to: ".",
                },
            ],
        }),
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, "dist"),
        },
        hot: true,
        compress: true,
        port: 9191,
    },
};
