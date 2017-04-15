var path = require('path');

module.exports = {
  entry: './client/index.es6',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './client/dist')
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          cacheDirectory: true,
          presets: ['react', 'babel-preset-es2015', 'babel-preset-react']
        }
      }
    ]
  }
};