const path = require('path');
const os = require('os');

const SDK_PATH = () => {
  if (os.type() == "Darwin") {
    return path.relative(__dirname, path.resolve(os.homedir(), 'Library/Application Support/Pebble SDK/', 'SDKs/current/sdk-core'))
  } else {
    return path.relative(__dirname, path.resolve(os.homedir(), '.pebble-sdk/', 'SDKs/current/sdk-core'))
  }
}

module.exports = {
  entry: ['core-js/stable', path.join(SDK_PATH(), 'pebble/common/include/_pkjs_shared_additions.js'), './src/pkjs/index.ts'],
  devtool: 'source-map',
  mode: 'development',
  module: { 
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    roots: [
      SDK_PATH() + '/pebble/common/include',
    ],
    alias: {
      'app_package.json': path.resolve(__dirname, './package.json'),
      'message_keys': path.resolve(__dirname, './build/js/message_keys.json')
    }
  },
  target: 'es5',
  output: {
    filename: 'pebble-js-app.js',
    path: path.resolve(__dirname, './build'),
    sourceMapFilename: 'pebble-js-app.js.map',
    devtoolModuleFilenameTemplate: '[resource-path]',
    devtoolFallbackModuleFilenameTemplate: '[resource-path]?[hash]',
    chunkFormat: 'commonjs',
  },
};