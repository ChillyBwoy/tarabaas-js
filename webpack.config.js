const config = {
  entry: {
    index: './lib/tarabaas.js'
  },
  output: {
    libraryTarget: 'umd',
    filename: '[name].js'
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

switch (process.env.NODE_ENV) {
  case 'development':
    config.debug = true;
    config.devtool = 'inline-source-map';
    config.output.path = './build/development';
    break;

  case 'production':
    config.output.path = './build/production';
    break;
}

module.exports = config;
