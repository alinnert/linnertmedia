const { renderFolderContents } = require('./renderFolderContents')

function getBlogURLs() {
  return renderFolderContents('blog').map(item => ({
    route: `blog/${item.fileName.replace(/\.md$/, '')}`,
    payload: {
      data: item.fileContentData,
      html: item.fileContentHtml
    }
  }))
}

module.exports = { getBlogURLs }
