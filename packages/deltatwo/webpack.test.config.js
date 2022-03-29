const path = require('path');
const glob = require('glob');
const webpack = require('webpack')
const {ModuleFederationPlugin} = webpack.container
const deps = require('./package.json')
const reunited = require('../../index');
const {remotes, exposes, name: {containerName}} = require("./mfe-config.json");

module.exports = {
  entry: require.resolve('./index.ts'),
  output: {
    path: path.resolve(__dirname, "./dist-test"),
    clean: true,
  },
  target: "node",
  resolve: {
    fallback: {
      path: false
    }
  },
  mode: "none",
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
    ]
  },
  plugins: [
    new ModuleFederationPlugin({
      name: containerName,
      filename: "remoteEntry.js",
      library: {type: "commonjs-module"},
      remotes: {
        "componentInPackage": reunited(path.resolve(__dirname, '../components/dist-test/remoteEntry.js'), "componentInPackage")
      },
      exposes,
      shared: {
        react: {singleton: true, requiredVersion: deps.dependencies.react},
        "react-dom": {singleton: true, requiredVersion: deps.dependencies["react-dom"]}
      }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || "test"),
    })
  ]
};
