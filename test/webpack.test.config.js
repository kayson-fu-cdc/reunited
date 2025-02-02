const path = require('path');
const glob = require('glob');
const thisFile = path.basename(__filename);
const nodeExternals = require('webpack-node-externals')
const {ModuleFederationPlugin} = require("webpack").container

const reunited = require('../index')
const deps = require('../package.json')

const testFiles = glob.sync("!(node_modules)/**/*.test.tsx").filter(function (element) {
  return element != "test/bundle.test.js" && !element.includes(thisFile) && !element.includes("dist");
}).map(function (element) {
  return "./" + element;
});


module.exports = {
  entry: {"bundle.test":testFiles},
  stats: 'minimal',
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].js",
    clean: true
  },
  target: "node",
  resolve: {
    fallback: {
      path: false
    }
  },
  externals: [nodeExternals({
    allowlist: [/^webpack\/container\/reference\//,/react/]
  })],
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
      name: "test_bundle",
      library: {type: "commonjs-module"},
      filename: "remoteEntry.js",
      remotes: {
        // Tobias, why do i need to do this in order to get the remote to properly resolve
        "componentInPackage": reunited(path.resolve(__dirname, '../packages/components/dist-test/remoteEntry.js'), "componentInPackage"),
        "deltaone": reunited(path.resolve(__dirname, '../packages/deltaone/dist-test/remoteEntry.js'), "deltaone"),
      },
      shared: {
        react: {singleton: true, requiredVersion: deps.devDependencies.react}, // share scope with this name will be used},
        "react-dom": {singleton: true, requiredVersion: deps.devDependencies["react-dom"]},
      }
    }),
  ]
};
