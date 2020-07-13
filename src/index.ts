/* eslint-disable @typescript-eslint/no-floating-promises */
import fastify, { FastifyLoggerOptions } from 'fastify'
import fastifyStatic from 'fastify-static'
import * as path from 'path'
import { htmlRoutesPlugin } from './plugins/routes'

const logger: FastifyLoggerOptions & { prettyPrint: boolean } = {
  level: 'debug',
  prettyPrint: true
}

const app = fastify({ logger })
const port = process.env.NODE_ENV === 'development' ? 8000 : 80
const staticFilesRoot = path.resolve(process.cwd(), 'build/assets')

app.register(fastifyStatic, {
  prefix: '/assets',
  root: staticFilesRoot
})

app.register(htmlRoutesPlugin)

app.listen(port).catch(error => {
  app.log.error(error)
  process.exit(1)
})
