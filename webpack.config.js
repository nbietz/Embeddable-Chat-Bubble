const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');

// Load environment variables
const env = dotenv.config().parsed || {};

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'chat-widget.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'ChatWidget',
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.CHAT_API_ENDPOINT': JSON.stringify(env.CHAT_API_ENDPOINT),
      'process.env.CHAT_API_KEY': JSON.stringify(env.CHAT_API_KEY)
    })
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  }
}; 