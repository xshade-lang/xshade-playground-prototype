const path = require('path');

module.exports = {
  entry: { main: './src/index.js' },
  output: {
    webassemblyModuleFilename: "[modulehash].wasm",
    path: path.resolve(__dirname, 'dist'),
    filename: 'xshade-playground.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.wasm$/,
        type: "webassembly/experimental"
      }
    ]
  }
};
