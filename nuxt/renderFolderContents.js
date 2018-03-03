const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')
const { renderMarkdown } = require('./renderMarkdown')

/**
 * Render all markdown files within a folder
 * @param {String} folderName Name of the folder its content markdown files should be rendered.
 */
function renderFolderContents(folderName) {
  const blogFolderPath = path.resolve(__dirname, `../content/${folderName}`)
  const files = fs.readdirSync(blogFolderPath, { encoding: 'utf8' })

  return files.map(fileName => {
    const filePath = path.resolve(blogFolderPath, fileName)
    const fileContentRaw = fs.readFileSync(filePath)
    const fileContentData = matter(fileContentRaw)
    const fileContentHtml = renderMarkdown(fileContentData.content)

    return { fileName, filePath, fileContentData, fileContentHtml }
  })
}

module.exports = { renderFolderContents }
