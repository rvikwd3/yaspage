const path = require('path')
const webpack = require('webpack')
const Dotenv = require('dotenv-webpack')

const config = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'main.js'
  },
  devServer: {
    static: path.resolve(__dirname, 'build'),
    compress: true,
    port: 3000,
    historyApiFallback: true,
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: [`@babel/preset-react`, `@babel/preset-env`]
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg)$/i,
        exclude: /(node_modules)/,
        type: 'asset/resource'
      }
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      React: 'react'
    }),
    new Dotenv(),
  ]
}

module.exports = config