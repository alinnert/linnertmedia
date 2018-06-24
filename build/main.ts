import { emptyDirSync, copy } from 'fs-extra'
import { resolve } from 'path'
import { initBuilder } from './build'
import {
  renderNewsFeed,
  renderTemplate,
  renderTemplateWithCollection,
  renderTemplateWithCollectionMatterKey
} from './templates'
import { buildStyles } from './styles';

initBuilder(() => {
  emptyDirSync(resolve(process.cwd(), 'docs'))

  copy(resolve(process.cwd(), 'site/static'), resolve(process.cwd(), 'docs'))

  buildStyles({ inputFile: 'sass/main.scss', outputFile: 'styles.css' })

  renderTemplate({ templateName: '404.njk', outputFilename: '404.html' })

  renderTemplate({ templateName: 'index.njk', outputFilename: 'index.html' })

  renderTemplate({
    templateName: 'autor.njk',
    outputFilename: 'autor/index.html'
  })

  renderTemplateWithCollection({
    templateName: 'blog/_entry.njk',
    collectionName: 'blog',
    outputDirectory: 'blog'
  })

  renderTemplateWithCollectionMatterKey({
    templateName: 'blog/tag/_entry.njk',
    collectionName: 'blog',
    matterKey: 'tags',
    outputDirectory: 'blog/tag'
  })

  renderNewsFeed({
    templateName: 'feed.xml.njk',
    collectionName: 'blog',
    outputFilename: 'feed.xml'
  })
})
