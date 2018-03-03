const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')
const renderMarkdown = require('./renderMarkdown')

/**
 * Render one markdown file
 * @param {String} fileName Name of the file to be rendered with '~/content' as base folder.
 */
function renderFile(fileName) {
  const filePath = path.resolve(__dirname, '../content', fileName)
  const fileContentRaw = fs.readFileSync(filePath)
  const fileContentData = matter(fileContentRaw)
  const fileContentHtml = renderMarkdown(fileContentData.content)

  return { fileName, filePath, fileContentData, fileContentHtml }
}

module.exports = renderFile