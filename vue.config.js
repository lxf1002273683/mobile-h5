module.exports = {
  publicPath: './',
  filenameHashing: true,      // 文件名哈希
  pages: {
    index: {
      // page 的入口
      entry: 'src/pages/index/index.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Index Page',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      // chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    home: {
      entry: 'src/pages/home/home.js',
      template: 'public/home.html',
      filename: 'home.html',
      title: 'home Page',
      // chunks: ['chunk-vendors', 'chunk-common', 'home']
    },
  },
  lintOnSave: process.env.NODE_ENV !== 'production',
  productionSourceMap: true,              //  是否打包 生产环境 source map false可以生产环境构建
  // devServer: {                         // 代理设置
  //   proxy: 'http://localhost:4000'
  // },

}