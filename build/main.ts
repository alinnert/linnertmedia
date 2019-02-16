import { emptyDir, copy } from 'fs-extra'
import { resolve } from 'path'
import {
  renderNewsFeed,
  renderTemplate,
  renderTemplateWithCollection,
  renderTemplateWithCollectionMatterKey
} from './templates'
import { buildStyles } from './styles'
import { logGroupTitle, logAction } from './logger'

export async function startSiteBuilder() {
  logGroupTitle('prepare')
  logAction('clean-up directory')
  await emptyDir(resolve(process.cwd(), 'docs'))

  logAction('copy static files')
  await copy(resolve(process.cwd(), 'site/static'), resolve(process.cwd(), 'docs'))

  logGroupTitle('build stylesheets')
  await buildStyles({ inputFile: 'sass/main.scss', outputFile: 'styles.css' })

  logGroupTitle('render single templates')
  await renderTemplate({ templateName: '404.njk', outputFilename: '404.html' })
  await renderTemplate({ templateName: 'index.njk', outputFilename: 'index.html' })
  await renderTemplate({ templateName: 'blog.njk', outputFilename: 'blog/index.html' })
  await renderTemplate({ templateName: 'autor.njk', outputFilename: 'autor/index.html' })

  logGroupTitle('render collections')
  await renderTemplateWithCollection({
    templateName: 'blog/_entry.njk',
    collectionName: 'blog',
    outputDirectory: 'blog'
  })

  logGroupTitle('render dynamic sites')
  await renderTemplateWithCollectionMatterKey({
    templateName: 'blog/tag/_entry.njk',
    collectionName: 'blog',
    matterKey: 'tags',
    outputDirectory: 'blog/tag'
  })

  logGroupTitle('render other stuff')
  await renderNewsFeed({
    templateName: 'feed.xml.njk',
    collectionName: 'blog',
    outputFilename: 'feed.xml'
  })

  console.log('\n  And done! :)\n')
  return
}