import nunjucks from 'nunjucks'
import { resolve, parse } from 'path'
import { flamel, createIndex, IFileMetadata } from 'flamel-builder'

nunjucks.configure('views', { autoescape: true })

const baseDir = resolve(__dirname, '..')
const options = {
  baseDir,
  outputDir: 'docs',
  staticDir: 'static'
}
const site = flamel({ options })
const blogIndex = createIndex(baseDir, 'content/blog/**/*.md', 'category')

site.page({
  routes: '/',
  content(config, done) {
    done('Hallo Startseite')
  }
})
site.page({
  routes: '/about',
  content(config, done) {
    done('Über mich :)')
  }
})
site.page({
  routes: '/blog',
  content(config, done) {
    done(
      nunjucks.render('blog.njk', {
        categories: Object.keys(blogIndex.store.category),
        entries: blogIndex.store.category
      })
    )
  }
})
site.page({
  routes: getBlogRoutes(),
  content(config, done) {
    done('Ein Blog-Post')
  }
})

function getBlogRoutes(): string[] {
  // const slugs = ['hello-world', 'some-js-post', 'and-another-post']
  const slugs = blogIndex.allFiles.map(file => parse(file.filepath).name)
  return slugs.map(slug => `/blog/${slug}`)
}
