import { access, readdir, readFile } from 'fs/promises'
import { ContentFolder, getContentFolderPath } from '../../paths'
import { MarkdownItem } from './ContentItem'
import { resolve } from 'path'

export async function getContentList (
  folder: ContentFolder
): Promise<Record<string, MarkdownItem>> {
  const contentFolder = getContentFolderPath(folder)
  await access(contentFolder)
  const fileNames = await readdir(contentFolder)
  const fileContents: Record<string, MarkdownItem> = {}

  for (const fileName of fileNames) {
    const filePath = resolve(contentFolder, fileName)
    const content = await readFile(filePath, { encoding: 'utf-8' })
    const data = {}
    fileContents[fileName] = { data, content }
  }

  return fileContents
}
