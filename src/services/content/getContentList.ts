import { access, readdir, readFile } from 'fs/promises'
import { resolve } from 'path'
import { ContentFolder, getContentFolderPath } from '../../paths'
import { parseMarkdown } from '../markdown'
import { MarkdownItem } from './ContentItem'

export async function getContentList (
  folder: ContentFolder
): Promise<Record<string, MarkdownItem>> {
  const contentFolderPath = getContentFolderPath(folder)
  await access(contentFolderPath)
  const fileNames = await readdir(contentFolderPath)
  const markdownItems: Record<string, MarkdownItem> = {}

  for (const fileName of fileNames) {
    if (!fileName.endsWith('.md')) { continue }
    const filePath = resolve(contentFolderPath, fileName)
    const fileContent = await readFile(filePath, { encoding: 'utf-8' })
    markdownItems[fileName] = await parseMarkdown(fileContent)
  }

  return markdownItems
}
