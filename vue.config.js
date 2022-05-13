// 如果端口设置为80，
// 使用管理员权限执行命令行。
// 例如，mac:sudo npm run
// 您可以通过以下方法更改端口：
// port = 9527 npm run dev OR npm run dev --port = 9527
const port = process.env.port || process.env.npm_config_port || 8081// dev port

module.exports = {
  /**
   * 如果计划在子路径下部署站点，则需要设置publicPath，
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  publicPath: '/bim',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: port,
    open: false,
    disableHostCheck: true,
    overlay: {
      warnings: false,
      errors: true
    }
  },
  css: {
    loaderOptions: {
      less: {
        // 若使用 less-loader@5，请移除 lessOptions 这一级，直接配置选项。
        lessOptions: {
          modifyVars: {
            hack: 'true; @import "@/styles/vant-theme.less";'
          }
        }
      }
    }
  }
}
