module.exports = {
    entry: [
        './browser/src/react-redux/index.jsx'
    ],
    module: {
        rules: [
            {
                test: /jsx?$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    output: {
        path: __dirname + '/browser/public/js',
        filename: 'bundle.js'
    },
    devtool: 'source-map'
};