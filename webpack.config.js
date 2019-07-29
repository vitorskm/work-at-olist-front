const path = require('path');

module.exports = {
    entry: './app/js/index.js',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    mode: "production",
    module: {
        rules: [{
            exclude: /node_modules/,
            loader: "babel-loader",
            options: {
                presets: ['@babel/preset-env']
            }
        }]
    }
}