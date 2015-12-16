var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;


var exttractCssOnBuild = false;// use other
var devDomain = 'localhost';
var devPort = 8080;
var apiDomain = 'localhost:8081';
var isBuild = !!(process.argv.filter(function(val, index, array) {return val=='-p';}).length && exttractCssOnBuild);

var plugins = [];
if(isBuild) {
    plugins.push(new ExtractTextPlugin("[name].bundle.css"));
}
plugins.push(new CommonsChunkPlugin({
    name: 'common'
}));

module.exports = {

    entry: {
        common: "./public/src/app/common.js",
        app: "./public/src/app/app-module.js",
    },
    output: {
        path: __dirname+'/public/dist', //path to where webpack will build your stuff
        publicPath: isBuild ? "/dist/" : "http://"+devDomain+":"+devPort+"/dist/", //path that will be considered when requiring your files
        filename: "[name].bundle.js"
    },
    resolve: {
        root: './public/src',
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },
    devtool: 'cheap-source-map',
    devServer: {
        contentBase: 'public/',
        host: devDomain,
        port: devPort,
        //proxy: {
        //    '/api*': {
        //        target: 'http://'+apiDomain,
        //        secure: false,
        //    }
        //}
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: [
                    /[\\\/]node_modules/
                ],
                loader: 'ng-annotate'
                //loader: 'ng-annotate!jshint-loader'// uncoment if you want to jshint to be on
            },
            {
                test: /\.tsx?$/,
                loader: 'ng-annotate!ts-loader'
            },
            {
                test: /\.scss$/,
                loader: isBuild ? ExtractTextPlugin.extract("style", "css?sourceMap!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap")
                    : "style!css?sourceMap!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap"
            },
            {
                test: /\.css$/,
                loader: isBuild ? ExtractTextPlugin.extract("style", "css?sourceMap") :"style!css?sourceMap"
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
    plugins: plugins
};