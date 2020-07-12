import { FastifyPluginCallback } from 'fastify'
import React from 'react'
import { defaultTemplate } from '../../templates/default'

export const blogPlugin: FastifyPluginCallback = async (app, options, next) => {
  app.get<{
    Params: { slug: string }
  }>('/:slug', async (request, reply) => {
    return defaultTemplate(
      <>
        <a href="/">Startseite</a>
        <h1>{request.params.slug}</h1>
        <p>Diese Seite verwendet TSX und ein Fastify-Plugin.</p>
      </>
    )
  })
}
