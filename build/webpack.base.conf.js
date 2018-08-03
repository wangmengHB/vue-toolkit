const path = require('path')
const nodeExternals = require('webpack-node-externals')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const webpack = require('webpack')


const components = require('../components.json')
for (let name in components) {
    components[name] = path.resolve(__dirname, components[name])
}




module.exports = {
    context: path.resolve(__dirname, '../'),
    entry: {
        'vue-toolkit': path.resolve(__dirname, '../src/index.js'),
        ...components
    },
    output: {
        path: path.resolve(__dirname, '../lib'),
        filename: '[name].js',
        publicPath: '/',
        libraryTarget: 'commonjs2',
        library: "VueToolkit"
    },
    resolve: {
        extensions: ['.vue', '.js', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    node: {
        // prevent webpack from injecting useless setImmediate polyfill because Vue
        // source contains it (although only uses it if it's native).
        // prevent webpack from injecting mocks to Node native modules
        // that does not make sense for the client
        setImmediate: false,
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [
                    path.resolve(__dirname, '../src')
                ]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                // always base64 encoded, this is very IMPORTANT!!!
                test: /\.(png|jpe?g|gif|svg|mp4|webm|ogg|mp3|wav|flac|aac|woff2?|eot|ttf|otf)$/,
                loader: 'url-loader',
            },
                // NO Need to extract any css file, because it is an library!!!
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(styl|stylus)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'stylus-loader'
                ]
            },
            {
                test: /\.pug$/,
                loader: 'pug-plain-loader'
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
    ],
    externals: [
        nodeExternals(),
    ]

}