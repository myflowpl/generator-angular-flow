var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {

    entry: {
        app: "./public/src/app/app-module.js"
    },
    output: {
        path: './public/dist', //path to where webpack will build your stuff
        publicPath: "/dist/", //path that will be considered when requiring your files
        filename: "[name].bundle.js"
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: [
                    /[\\\/]node_modules/
                ],
                //loader: 'ng-annotate!jshint-loader'// uncoment if you want to jshint to be on
                loader: 'ng-annotate'
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract("style", "css?sourceMap!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap")
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style", "css?sourceMap")
            },
            { test: /\.html$/, loader: 'html' },
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' }, // inline base64 URLs for <=8k images, direct URLs for the rest
            { test: /\.(woff)(\?.*$|$)/, loader: "url?name=[hash].[ext]limit=10000&mimetype=application/font-woff"},
            { test: /\.(woff2)(\?.*$|$)/, loader: "url?name=[hash].[ext]&limit=10000&mimetype=application/font-woff2"},
            { test: /\.(ttf)(\?.*$|$)/, loader: "url?name=[hash].[ext]limit=10000&mimetype=application/octet-stream"},
            { test: /\.(eot)(\?.*$|$)/, loader: "file?name=[hash].[ext]?[param]"},
            { test: /\.(svg)(\?.*$|$)/, loader: "url?name=[hash].[ext]limit=10000&mimetype=image/svg+xml"}

        ]
    },
    plugins: [
        new ExtractTextPlugin("[name].bundle.css")
    ]
};
