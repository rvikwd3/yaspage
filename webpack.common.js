const path = require('path')
const webpack = require('webpack')
const Dotenv = require('dotenv-webpack')
const { allowedNodeEnvironmentFlags } = require('process')

const config = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'main.js'
  },
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
        test: /\.(svg)$/i,
        exclude: /(node_modules)/,
        type: 'asset/resource'
      },
      {
        test: /\.(jpe?g|png|webp)$/i,
        exclude: /(node_modules)/,
        use: {
          loader: "responsive-loader",
          options: {
            adapter: require('responsive-loader/sharp'),
            format: 'avif',
          },
        },
      },
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