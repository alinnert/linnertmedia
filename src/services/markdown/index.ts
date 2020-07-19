import remark from 'remark'
import remarkExtractFrontmatter from 'remark-extract-frontmatter'
import remarkFrontmatter from 'remark-frontmatter'
import remarkHighlight from 'remark-highlight.js'
import remarkHtml from 'remark-html'
import { parse } from 'yaml'
import { MarkdownItem } from '../content/ContentItem'

const frontmatterParser = remark()
  .use(remarkFrontmatter)
  .use(remarkExtractFrontmatter, { yaml: parse })
  .use(remarkHighlight)
  .use(remarkHtml)
  .use(() => (arg) => console.dir(arg))

export async function parseMarkdown (data: string): Promise<MarkdownItem> {
  const file = await frontmatterParser.process(data)
  if (typeof file.data !== 'object' || file.data === null) {
    file.data = {}
  }
  return {
    metadata: file.data as Record<string, unknown>,
    content: file.toString()
  }
}
