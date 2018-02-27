const getBlogURLs = require('./nuxt/getBlogURLs')

module.exports = {
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
