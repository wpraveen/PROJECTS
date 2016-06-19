import express from "express";
import graphQLHTTP from "express-graphql";
import path from "path";
import webpack from "webpack";
import WebpackDevServer from "webpack-dev-server";
import schema from "./data/schema";
import webpackConfig from "./webpack.config";

const APP_PORT = 30001;
const GRAPHQL_PORT = 8889;

/*eslint-disable no-console*/

let graphQLServer = express();
graphQLServer.use("/", graphQLHTTP({graphiql: true, pretty: true, schema: schema}));
graphQLServer.listen(GRAPHQL_PORT, () => console.log(`GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}`));

webpackConfig.entry.app.unshift("webpack-dev-server/client?http://localhost:" + APP_PORT + "/", "webpack/hot/dev-server");
const compiler = webpack(webpackConfig);
const app = new WebpackDevServer(compiler, {
    hot: true,
    proxy: {
        "/graphql": `http://localhost:${GRAPHQL_PORT}`
    },
    // It suppress error shown in console, so it has to be set to false.
    quiet: false,
    // It suppress everything except error, so it has to be set to false as well
    // to see success build.
    noInfo: false,
    stats: {
        // Config for minimal console.log mess.
        assets: false,
        colors: true,
        version: false,
        hash: false,
        timings: false,
        chunks: false,
        chunkModules: false
    }
});

// Serve static resources
app.use("/", express.static(path.resolve(__dirname, "dist")));
app.listen(APP_PORT, () => {
    console.log(`App is now running on http://localhost:${APP_PORT}`);
});

/*eslint-enable */
