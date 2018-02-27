const getBlogURLs = require('./nuxt/getBlogURLs')

module.exports = {
  generate: {
    fallback: true,
    async routes () {
      return [
        ...getBlogURLs()
      ]
    }
  }
}
