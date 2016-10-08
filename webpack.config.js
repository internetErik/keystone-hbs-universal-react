module.exports = {
  entry: './client/main.js',
  output: {
    filename: 'bundle.js',
    path: './server/public'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react','es2015','stage-2']
        }
      }
    ]
  }
};