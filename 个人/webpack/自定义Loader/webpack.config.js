const path = require('path')
// import path from 'path'
/**
 * @type {import('webpack').Configuration}
 */
module.exports={
  mode:'development',
  entry: './src/index.js',
  output: {
    path:path.resolve(__dirname, './dest')
  },
  
  module: {
    rules: [
      {
        test:/\.css/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'jl-loader',
            options: {
              name: '123',
              content:'自定义loader'
            }
          }
        ],
      },
      {
        test: /\.js/,
        use: [
          
        ],
        
      }
    ],
      
  },
  resolveLoader: {
    modules:["node_modules","./loader"]
  }
}