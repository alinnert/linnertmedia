/* eslint-disable @typescript-eslint/no-floating-promises */
import { FastifyPluginCallback } from 'fastify'
import { blogPlugin } from './routes/blog'
import { errorPlugin } from './routes/error'
import { indexPlugin } from './routes/index'

export const htmlRoutesPlugin: FastifyPluginCallback = async (
  app, options, next
) => {
  app.addHook('onSend', async (request, reply) => {
    reply.type('text/html')
  })

  app.register(indexPlugin)
  app.register(blogPlugin, { prefix: '/blog' })
  app.register(errorPlugin)
}
