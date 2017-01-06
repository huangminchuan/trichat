// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../../../views/Maintenance/index.html.twig'),
    assetsRoot: path.resolve(__dirname, '../../../public/maintenance'),
    assetsSubDirectory: '',
    assetsPublicPath: '/bundles/app/maintenance/',
    productionSourceMap: false,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  },
  dev: {
    env: require('./dev.env'),
    port: 8080,
    proxyTable: {
      '/v2': {
        target: "http://mulan.xieche-2.0.dev.xieche.com.cn/",
        changeOrigin: true,
        secure: false
      }
    }
  }
}
