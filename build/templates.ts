import nunjucks from 'nunjucks'
import { resolve } from 'path'
import { from, Observable, Observer } from 'rxjs'
import { flatMap, map, reduce, filter, tap } from 'rxjs/operators'
import { writeFile, readdir, readFile, ensureFile } from 'fs-extra'
import grayMatter from 'gray-matter'
import { minify } from 'html-minifier'
import MarkdownIt from 'markdown-it'
import {
  IRenderTemplateOptions,
  IRenderTemplateWithCollectionOptions,
  IRenderTemplateWithCollectionMatterKeyOptions,
  IRenderNewsFeedOptions
} from 'templates'

const nunjucksOptions: nunjucks.ConfigureOptions = {
  throwOnUndefined: true,
  noCache: true
}

const nunjucksEnv = nunjucks.configure(
  resolve(process.cwd(), 'site/templates'),
  nunjucksOptions
)

nunjucksEnv.addFilter('date', date => {
  const day = date
    .getDate()
    .toString()
    .padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = (date.getYear() + 1900).toString()

  return `${day}.${month}.${year}`
})

nunjucksEnv.addFilter('tagLinks', (tagsString: string) => {
  return tagsString
    .split(',')
    .map(it => it.trim())
    .map(it => `<a href="/blog/tag/${it.toLowerCase()}">${it}</a>`)
    .join(' • ')
})

const md = new MarkdownIt()

md.use(require('markdown-it-container'), 'info')

md.use(require('markdown-it-container'), 'file', {
  render(tokens: any, index: any) {
    const matches = tokens[index].info.trim().match(/^file\s+(.*)$/)

    if (tokens[index].nesting === 1) {
      const filename = matches[1]
      return `<div class="filename">Datei: ${filename}</div>`
    }

    return ''
  }
})

md.use(require('markdown-it-prism'))

function getGlobalsData() {
  const globalsDirectory = resolve(process.cwd(), 'site/globals')

  return from(readdir(globalsDirectory)).pipe(
    flatMap(filenames => filenames),
    flatMap(filename =>
      from(readFile(resolve(globalsDirectory, filename), 'utf8')).pipe(
        map(fileContent => JSON.parse(fileContent)),
        map(fileContent => ({ filename, fileContent }))
      )
    ),
    reduce((globals: { [key: string]: any }, { filename, fileContent }) => {
      const key = filename.replace(/\.json$/, '')
      globals[key] = fileContent
      return globals
    }, {})
  )
}

function getCollectionsData() {
  const collectionsDirectory = resolve(process.cwd(), 'site/collections')

  return from(readdir(collectionsDirectory)).pipe(
    flatMap(foldernames => foldernames),
    flatMap(foldername => {
      return from(
        readdir(resolve(process.cwd(), 'site/collections', foldername))
      ).pipe(
        flatMap(filenames => filenames),
        flatMap(filename =>
          from(
            readFile(
              resolve(process.cwd(), 'site/collections', foldername, filename),
              'utf8'
            )
          ).pipe(
            map(fileContent => ({ filename, fileContent })),
            map(({ filename, fileContent }) => ({
              filename: filename.replace(/\.md$/, ''),
              fileContent
            }))
          )
        ),
        map(({ filename, fileContent }) => {
          const matter = grayMatter(fileContent)
          const contentHtml = md.render(matter.content)
          return { foldername, filename, matter, contentHtml }
        }),
        reduce(
          (
            files: Array<{
              foldername: string
              filename: string
              matter: any
              contentHtml: string
            }>,
            item: {
              foldername: string
              filename: string
              matter: any
              contentHtml: string
            }
          ) => {
            files.push(item)
            return files
          },
          []
        ),
        map(files =>
          files.sort((a, b) => {
            if (a.matter.data.date > b.matter.data.date) return -1
            if (a.matter.data.date < b.matter.data.date) return 1
            return 0
          })
        )
      )
    }),
    reduce(
      (
        collectionsData: any,
        collection: Array<{
          foldername: string
          filename: string
          matter: any
          contentHtml: string
        }>
      ) => {
        collectionsData[collection[0].foldername] = collection
        return collectionsData
      },
      {}
    )
  )
}

function renderNunjucksTemplate(
  templateName: string,
  data: any
): Observable<string> {
  return Observable.create((observer: Observer<string>) => {
    let canceled = false

    nunjucksEnv.render(templateName, data, (error, result) => {
      if (!canceled) {
        if (error) {
          observer.error(error)
        } else {
          observer.next(result)
        }
      }
    })

    return () => {
      canceled = true
    }
  })
}

export function renderTemplate({
  templateName,
  outputFilename,
  data = {}
}: IRenderTemplateOptions) {
  console.log(
    `» Render template "${templateName}" → writing file "${outputFilename}"`
  )

  getGlobalsData()
    .pipe(
      map(globalsData => Object.assign({}, data, { globals: globalsData })),
      flatMap(data =>
        getCollectionsData().pipe(
          map(collections => {
            data.collections = collections
            return data
          })
        )
      ),
      flatMap(data => renderNunjucksTemplate(templateName, data)),
      map(renderedTemplate =>
        minify(renderedTemplate, { collapseWhitespace: true })
      ),
      map(renderedTemplate => {
        const filename = resolve(process.cwd(), 'docs', outputFilename)
        return { renderedTemplate, filename }
      }),
      flatMap(templateInfo =>
        from(ensureFile(templateInfo.filename)).pipe(map(() => templateInfo))
      )
    )
    .subscribe(({ renderedTemplate, filename }) => {
      writeFile(filename, renderedTemplate)
    })
}

export function renderTemplateWithCollection({
  templateName,
  collectionName,
  outputDirectory
}: IRenderTemplateWithCollectionOptions) {
  const collectionDirectory = getCollectionDirectory(collectionName)

  from(readdir(collectionDirectory))
    .pipe(
      flatMap(filenames => filenames),
      flatMap(filename =>
        from(readFile(resolve(collectionDirectory, filename), 'utf8')).pipe(
          map(fileContent => ({ fileContent, filename }))
        )
      ),
      map(({ filename, fileContent }) => {
        filename = filename.replace(/\.md$/, '')
        const matter = grayMatter(fileContent)
        const contentHtml = md.render(matter.content)
        return { filename, matter, contentHtml }
      }),
      filter(({ matter }) => (matter.data as any).date)
    )
    .subscribe(({ filename, matter, contentHtml }) => {
      renderTemplate({
        templateName,
        outputFilename: `${outputDirectory}/${filename}/index.html`,
        data: { filename, matter, contentHtml }
      })
    })
}

export function renderTemplateWithCollectionMatterKey({
  templateName,
  collectionName,
  matterKey,
  outputDirectory
}: IRenderTemplateWithCollectionMatterKeyOptions) {
  const collectionDirectory = getCollectionDirectory(collectionName)

  from(readdir(collectionDirectory))
    .pipe(
      flatMap(filenames => filenames),
      flatMap(filename =>
        from(readFile(resolve(collectionDirectory, filename), 'utf8')).pipe(
          map(fileContent => ({ fileContent, filename }))
        )
      ),
      map(({ filename, fileContent }) => {
        const matter = grayMatter(fileContent)
        const contentHtml = md.render(matter.content)
        filename = filename.replace(/\.md$/, '')
        return { filename, matter, contentHtml }
      }),
      reduce(
        (
          matterIndex: { [key: string]: any },
          {
            filename,
            matter,
            contentHtml
          }: {
            filename: string
            matter: grayMatter.GrayMatterFile<string>
            contentHtml: string
          }
        ) => {
          const currentValues: string[] = (matter.data as {
            [key: string]: any
          })[matterKey]
            .split(',')
            .map((value: string) => value.trim())

          if (currentValues.length) {
            currentValues.forEach(value => {
              if (!Array.isArray(matterIndex[value])) {
                matterIndex[value] = []
              }
              matterIndex[value].push({ filename, matter, contentHtml })
            })
          }

          return matterIndex
        },
        {}
      ),
      flatMap(matterIndex => Object.entries(matterIndex)),
      map(([key, items]) => [
        key,
        items.sort((a: any, b: any) => {
          if (a.matter.data.date > b.matter.data.date) return -1
          if (a.matter.data.date < b.matter.data.date) return 1
          return 0
        })
      ])
    )
    .subscribe(([matterValue, entries]) => {
      renderTemplate({
        templateName,
        outputFilename: `${outputDirectory}/${matterValue.toLowerCase()}/index.html`,
        data: { matterValue, entries }
      })
    })
}

export function renderNewsFeed({
  templateName,
  collectionName,
  outputFilename
}: IRenderNewsFeedOptions) {
  const collectionDirectory = getCollectionDirectory(collectionName)

  from(readdir(collectionDirectory))
    .pipe(
      flatMap(filenames => filenames),
      flatMap(filename =>
        from(readFile(resolve(collectionDirectory, filename), 'utf8')).pipe(
          map(fileContent => ({ fileContent, filename }))
        )
      ),
      map(({ filename, fileContent }) => {
        filename = filename.replace(/\.md$/, '')
        const matter = grayMatter(fileContent)
        const contentHtml = md.render(matter.content)
        return { filename, matter, contentHtml }
      }),
      reduce(
        (
          result: Array<any>,
          item: { filename: string; matter: any; contentHtml: string }
        ) => {
          result.push(item)
          return result
        },
        []
      )
    )
    .subscribe(data => {
      const entries = data.filter(entry => entry.matter.data.date).slice(0, 10)
      renderTemplate({ templateName, outputFilename, data: { entries } })
    })
}

function getCollectionDirectory(collectionName: string) {
  return resolve(process.cwd(), 'site/collections', collectionName)
}
