module.exports = {
  entry: {
    client: './src/main.jsx',
  },
  output: {
    path: `${__dirname}/dist`,
    filename: 'index.js',
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react'],
          plugins: ["transform-object-rest-spread"]
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
