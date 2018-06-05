import Liquid from 'liquidjs'
import { resolve } from 'path'
import { from } from 'rxjs'
import { flatMap, map, reduce } from 'rxjs/operators'
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

const engine = Liquid({
  root: resolve(process.cwd(), 'site/templates'),
  extname: '.liquid'
})

const md = new MarkdownIt()

export function renderTemplate({
  templateName,
  outputFilename,
  data = {}
}: IRenderTemplateOptions) {
  console.log(
    `» Render template "${templateName}" into file "${outputFilename}"`
  )

  from(engine.renderFile(templateName, data))
    .pipe(
      map(renderedTemplate =>
        minify(renderedTemplate, {
          collapseWhitespace: true
        })
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
      })
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
      flatMap(matterIndex => Object.entries(matterIndex))
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
      renderTemplate({ templateName, outputFilename, data: { entries: data } })
    })
}

function getCollectionDirectory(collectionName: string) {
  return resolve(process.cwd(), 'site/collections', collectionName)
}
