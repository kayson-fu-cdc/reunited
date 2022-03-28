const path = require('path');
const glob = require('glob');
const webpack = require('webpack')
const {ModuleFederationPlugin} = webpack.container
const deps = require('./package.json')
const reunited = require('../../index');

module.exports = {
  entry: require.resolve('./index.js'),
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
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
    ]
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'deltaone',
      filename: "remoteEntry.js",
      library: {type: "commonjs-module", name: "deltaone"},
      remotes: {
        "componentInPackage": reunited(path.resolve(__dirname, '../components/dist-test/remoteEntry.js'), "componentInPackage")
      },
      exposes: {
        "./OptionComp": "./src/OptionComp/OptionComp.js"
      },
      shared: {
        react: deps.dependencies.react,
        "react-dom": deps.dependencies["react-dom"]
      }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || "test"),
    })
  ]
};
