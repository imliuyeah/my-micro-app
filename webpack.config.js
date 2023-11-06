/*
 * @Author: liuye liuye@shinho.net.cn
 * @Date: 2023-11-05 23:19:02
 * @LastEditors: liuye liuye@shinho.net.cn
 * @LastEditTime: 2023-11-06 20:51:15
 * @FilePath: \my-micro-app\webpack.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index: './register.js',
  },
  devtool: 'inline-source-map',
  devServer: {
   static: './dist',
 },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Development',
      template: './index.html'
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
 optimization: {
   runtimeChunk: 'single',
 },
};