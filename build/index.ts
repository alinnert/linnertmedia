import chokidar from 'chokidar'
import { emptyDirSync } from 'fs-extra'
import { resolve } from 'path'
import {
  renderNewsFeed,
  renderTemplate,
  renderTemplateWithCollection,
  renderTemplateWithCollectionMatterKey
} from './templates'
import { Observable } from 'rxjs'
import { debounce, debounceTime } from 'rxjs/operators'

console.log('*** LINNERT MEDIA BUILD SYSTEM ***\n')

const runMode = process.argv[2] || 'build'

switch (runMode) {
  case 'build':
    main()
    break
  case 'dev':
    watch()
    break
  default:
    console.log(`Sorry, run mode ${runMode} is not known. Exiting. Bye...`)
}

function watch() {
  console.log('(running in dev mode)\n')

  main()

  const options = {
    cwd: process.cwd(),
    ignoreInitial: true,
    awaitWriteFinish: true
  }

  const fileWatcherStream = new Observable(observer => {
    chokidar.watch('site/**/*', options).on('all', () => {
      observer.next()
    })
  })

  fileWatcherStream.pipe(debounceTime(500)).subscribe(() => {
    console.log('change detected')
    main()
  })
}

function main() {
  console.log('building web site...\n')

  emptyDirSync(resolve(process.cwd(), 'docs'))
  renderTemplate({ templateName: 'index', outputFilename: 'index.html' })
  renderTemplate({ templateName: 'autor', outputFilename: 'autor/index.html' })
  renderTemplate({ templateName: 'blog/index', outputFilename: 'blog/index.html' })
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
}
