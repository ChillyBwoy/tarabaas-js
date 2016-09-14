const config = {
  debug: true,
  devtool: 'inline-source-map',
  entry: {
    tarabaas: './lib/tarabaas.js'
  },
  output: {
    libraryTarget: 'umd',
    filename: '[name].js',
    path: './build'
  },
  resolve: {
    extensions: ['', '.js']
  },
  node: {
    global: false
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel'
      }
    ]
  }
};

module.exports = config;
