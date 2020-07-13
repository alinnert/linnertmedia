import { pathExists } from 'fs-extra'
import { resolve } from 'path'
import { getContentFolderPath } from '../../paths'
import { Article } from './articles'

export async function getArticleHtml (slug: string): Promise<Article> {
  const blogFolder = getContentFolderPath('blog')
  const result = await pathExists(resolve(blogFolder, `${slug}.md`))

  return {
    title: 'Ich bin ein Titel',
    date: 'Heute',
    tags: ['Foo', 'Bar'],
    body: resolve(blogFolder, `${slug}.md`) + (result ? 'jo' : 'ne')
  }
}
