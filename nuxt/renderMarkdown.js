const highlight = require('highlight.js')
const markdownIt = require('markdown-it')

const md = markdownIt({
  breaks: true,
  typographer: true,
  highlight(str, lang) {
    if (lang && highlight.getLanguage(lang)) {
      try {
        return highlight.highlight(lang, str).value
      } catch (_) { }
    }

    return ''
  }
})

function renderMarkdown (str) {
  return md.render(str)
}

module.exports = renderMarkdown