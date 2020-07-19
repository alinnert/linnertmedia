import { access, readFile } from 'fs/promises'
import { resolve } from 'path'
import { ContentFolder, getContentFolderPath } from '../../paths'
import { MarkdownItem } from './ContentItem'
import { parseMarkdown } from '../markdown'

export async function getContentHtml (
  folder: ContentFolder,
  file: string
): Promise<MarkdownItem> {
  const contentFolder = getContentFolderPath(folder)
  const filename = `${file}.md`
  const filePath = resolve(contentFolder, filename)
  await access(filePath)
  const fileContent = await readFile(filePath, { encoding: 'utf-8' })
  const markdownItem = await parseMarkdown(fileContent)

  return markdownItem
}
