const path = require('path')
//user-AGENT 把浏览器的UserAgent变成一个对象
const HtmlWebpackPlugin = require('html-webpack-plugin')
/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  entry: './src/index.ts',
  context: process.cwd(),//上下文为当前目录
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'monitor.js'
  },
  devServer: {
    hot: true,
    
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"] //可以不写后缀，自动匹配
  },
  module: {
    rules: [{
      test: /\.ts$/,
      exclude: /node_modules/,
      // 本质上是依赖于typescript(typescript compiler)
      use: "babel-loader"
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'head'
    })
  ]
}