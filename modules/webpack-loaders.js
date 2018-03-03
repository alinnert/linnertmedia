module.exports = function (moduleOptions) {
  this.extendBuild((config, { isClient, isServer }) => {
    config.module.rules.push({ test: /\.md$/, loader: 'raw-loader' })
  })
}