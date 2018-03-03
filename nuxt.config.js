const getBlogURLs = require('./nuxt/getBlogURLs')

module.exports = {
  css: [
    '~/assets/sass/index.scss'
  ],
  modules: [
    '~/modules/webpack-loaders'
  ],
  generate: {
    dir: 'docs',
    fallback: true,
    async routes () {
      return [
        ...getBlogURLs()
      ]
    }
  }
}
