/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

/** @type {import('webpack').Configuration} */
module.exports = {
  target: 'node',
  mode: 'production',
  entry: './src/extension.ts',
  output: {
    path: path.resolve(__dirname, 'out'),
    filename: 'extension.js',
    libraryTarget: 'commonjs2',
    clean: true
  },
  externals: {
    vscode: 'commonjs vscode'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [{ 
          loader: 'ts-loader',
          options: {
            compilerOptions: {
              noEmitOnError: true,
              removeComments: true
            }
          }
        }]
      }
    ]
  },
  optimization: {
    minimize: true,
    usedExports: true,
    sideEffects: false
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        // Copy workspace .github assets to resources (primary source)
        {
          from: path.resolve(__dirname, '.github/chatmodes'),
          to: path.resolve(__dirname, 'out', 'resources', 'chatmodes'),
          globOptions: {
            ignore: ['**/.DS_Store']
          },
          noErrorOnMissing: true
        },
        {
          from: path.resolve(__dirname, '.github/instructions'),
          to: path.resolve(__dirname, 'out', 'resources', 'instructions'),
          globOptions: {
            ignore: ['**/.DS_Store']
          },
          noErrorOnMissing: true
        },
        {
          from: path.resolve(__dirname, '.github/prompts'),
          to: path.resolve(__dirname, 'out', 'resources', 'prompts'),
          globOptions: {
            ignore: ['**/.DS_Store']
          },
          noErrorOnMissing: true
        },
        // Fallback to bundled resources for any missing assets
        {
          from: path.resolve(__dirname, 'resources'),
          to: path.resolve(__dirname, 'out', 'resources'),
          globOptions: {
            ignore: ['**/.DS_Store']
          },
          noErrorOnMissing: true,
          force: false // Don't overwrite files already copied from .github
        }
      ]
    })
  ],
  devtool: 'nosources-source-map'
};
