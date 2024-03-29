const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  entry: './src/index.ts',
  context: process.cwd(), // 上下文为当前目录
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'monitor.js',
  },
  devServer: {
    hot: true,
    onAfterSetupMiddleware({ app: router }) {
      router.get('/success', (req, res) => {
        res.send('成功');
      });
      router.post('/error', (req, res) => {
        res.sendStatus(500);
      });
    },
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'], //可以不写后缀，自动匹配
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        // 本质上是依赖于typescript(typescript compiler)
        use: 'babel-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'head',
    }),
    new CleanWebpackPlugin(),
  ],
};
