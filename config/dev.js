module.exports = {
  env: {
    NODE_ENV: '"development"'
  },
  defineConstants: {},
  weapp: {
  },
  h5: {
    devServer: {
      host: 'localhost', // 如需局域网（如手机）访问，请更换为0.0.0.0
      port: 9999,
      https: false,
      proxy: {
        '/api': {
          target: 'http://192.168.55.7:9099/',
          changeOrigin: true,
          pathRewrite: {'^/api': ''},
        },
      }
    }
  }
}
