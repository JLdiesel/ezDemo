const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  //production 会丑化压缩出来的代码
  mode: 'development',
  // eval  false 等24个值   source-map的作用： 将已转换的代码映射到原始的源文件中    由浏览器自动加载   原本错误\打印\warm :bundle.js(1) 映射到源文件: math(24)
  devtool: 'cheap-module-source-map',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    //绝对路径
    path: path.resolve(__dirname, './build'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    //适配目标 优先级更高
                    targets: ['chrome 88'],
                    //支持esmodule
                    esmodules: true,
                  },
                ],
              ],
              // plugins:['@babel/plugin-transform-arrow-functions',...]
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'jl webpack',
    }),
  ],
};
