import { access } from 'fs/promises'
import { resolve } from 'path'
import { ContentFolder, getContentFolderPath } from '../../paths'
import { MarkdownItem } from './ContentItem'

export async function getArticleHtml (
  folder: ContentFolder,
  file: string
): Promise<MarkdownItem> {
  const contentFolder = getContentFolderPath(folder)
  const filename = `${file}.md`
  const filePath = resolve(contentFolder, filename)
  await access(filePath)

  return {
    data: {
      title: 'Ich bin ein Titel',
      date: 'Heute',
      tags: ['Foo', 'Bar']
    },
    content: 'lalala'
  }
}
