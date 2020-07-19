import { access, readdir, readFile } from 'fs/promises'
import { resolve } from 'path'
import { ContentFolder, getContentFolderPath } from '../../paths'
import { parseMarkdown } from '../markdown'
import { MarkdownItem } from './ContentItem'

export async function getContentList (
  folder: ContentFolder
): Promise<Record<string, MarkdownItem>> {
  const contentFolder = getContentFolderPath(folder)
  await access(contentFolder)
  const fileNames = await readdir(contentFolder)
  const fileContents: Record<string, MarkdownItem> = {}

  for (const fileName of fileNames) {
    const filePath = resolve(contentFolder, fileName)
    const fileContent = await readFile(filePath, { encoding: 'utf-8' })
    fileContents[fileName] = await parseMarkdown(fileContent)
  }

  return fileContents
}
