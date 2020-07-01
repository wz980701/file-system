const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    mainFields: ['main', 'module', 'browser'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      'components': path.resolve(__dirname, 'src/components'),
      'helpers': path.resolve(__dirname, 'helpers'),
      'env': path.resolve(__dirname, 'env')
    }
  },
  entry: './src/app.tsx',
  target: 'electron-renderer',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: ['file-loader']
      }
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, '../dist/renderer'),
    historyApiFallback: true,
    compress: true,
    hot: true,
    port: 8080,
    publicPath: '/',
  },
  output: {
    path: path.resolve(__dirname, '../dist/renderer'),
    filename: 'js/[name].js',
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'FileSystem',
      template: './public/template.html'
    }),
  ],
};