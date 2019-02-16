import { parallel, watch } from 'gulp'
// @ts-ignore
import serveHandler from 'serve-handler'
import { createServer } from 'http'
import { startSiteBuilder } from './build/main'
import { logBanner, logAction } from './build/logger'

logBanner()

const buildSite = () => async function buildSite (done: Function) {
  await startSiteBuilder()
  done()
}

const watchSite = () => function watchSite (done: Function) {
  watch('site/**/*', buildSite())
  return new Promise(() => {})
}

const serveSite = () => function serveSite (done: Function) {
  const options = { public: 'docs' }
  const server = createServer((request, response) => serveHandler(request, response, options))
  const port = 8080
  server.listen(port, () => { logAction(`Server is running at http://localhost:${port}`) })
  return new Promise(() => {})
}

export const dev = parallel(watchSite(), serveSite())
export const build = buildSite()
export const serve = serveSite()