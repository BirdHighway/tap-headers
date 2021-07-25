const path = require('path');

const entryFile = path.join(__dirname, 'client', 'src', 'index.jsx');
const outputDir = path.join(__dirname, 'client', 'dist');

module.exports = {
  entry: {
    entryFile
  },
  mode: 'development',
  output: {
    path: outputDir,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
};