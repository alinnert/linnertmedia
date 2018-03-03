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
  console.log(routeObject)
  return routeObject
}

module.exports = getBlogURLs