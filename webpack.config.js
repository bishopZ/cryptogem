module.exports = {
    context: __dirname + '/src',

    entry: {
        index: './entry'
    },

    output: {
        path: './public',
        filename: '[name].js'

    },

    watch: true,
    debug: true,
    devtool: '#inline-source-map',

    resolve: {
        extensions: [ '', '.js', '.jsx' ]
    },

    module: {
        loaders: [
            {
                test: /(\.jsx|\.js)?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ],

        resolve: {
            extensions: [ '.js', '.jsx' ],
            root: __dirname + '/src'
        }
    }
};

