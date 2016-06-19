var webpack = require("webpack");

module.exports = {
    entry: {app: ["./app/js/main.js"]} ,
    output: {
        path: __dirname,
        filename: "dist/bundle.js",
        publicPath: "/dist/"
    },
    devtool: "source-map",
    module: {
        preLoaders: [
            {
                test: /\.jsx?$/,
                loader: "eslint-loader",
                exclude: /(node_modules|bower_components)/
            }
        ],
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel",
                query: {
                    presets: ["es2015", "react","stage-0"],
                    plugins: [__dirname + "/plugins/babelRelayPlugin"]
                }
            }, {
                test: /\.scss$/,
                loaders: ["style", "css", "sass"]
            },
            { test: /\.(woff2?|svg)$/, loader: "url?limit=10000" },
            { test: /\.(ttf|eot)$/, loader: "file" }
        ]
    },
    plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};
