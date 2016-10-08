module.exports = {
  entry: './client/app.js',
  output: {
    filename: 'bundle.js',
    path: 'public'
  },
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