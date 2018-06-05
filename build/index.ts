import { from } from 'rxjs'
import { renderTemplate, renderTemplateWithCollection, renderTemplateWithCollectionMatterKey, renderNewsFeed } from './templates'
import { emptyDirSync } from 'fs-extra'
import { resolve } from 'path'

emptyDirSync(resolve(process.cwd(), 'docs'))
renderTemplate({ templateName: 'index', outputFilename: 'index.html' })
renderTemplate({ templateName: 'autor', outputFilename: 'autor/index.html' })
renderTemplateWithCollection({
  templateName: 'blog/_entry',
  collectionName: 'blog',
  outputDirectory: 'blog'
})
renderTemplateWithCollectionMatterKey({
  templateName: 'blog/tag/_entry',
  collectionName: 'blog',
  matterKey: 'tags',
  outputDirectory: 'blog/tag'
})
renderNewsFeed({
  templateName: 'feed.xml.liquid',
  collectionName: 'blog',
  outputFilename: 'feed.xml'
})
