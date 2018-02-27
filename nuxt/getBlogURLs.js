const renderFolderContents = require('./renderFolderContents')

function getBlogURLs () {
  const routeObject = renderFolderContents('blog')
    .map(item => ({
      route: `blog/${item.fileName.replace(/\.md$/, '')}`,
      payload: {
        data: item.fileContentData,
        html: item.fileContentHtml
      }
    }))
  return routeObject
}

module.exports = getBlogURLs