const path = require('path');

module.exports = {
    entry: './src/app.ts',
    module: {
        rules: [{
            test: /\.ts?$/,
            use: 'ts-loader',
            exclude: /node_modules/
        }]
    },
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
    },
    output: {
        path: './dist',
        filename: 'app.js',
        path: path.resolve(__dirname, 'dist')
    }
};