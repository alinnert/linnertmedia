import { FastifyPluginCallback } from 'fastify'
import React from 'react'
import { defaultTemplate } from '../../templates/default'

export const blogPlugin: FastifyPluginCallback = async (app, options, next) => {
  interface GetSlug {
    Params: { slug: string }
  }

  app.get<GetSlug>('/:slug', async (request, reply) => {
    return defaultTemplate(
      <>
        <a href="/">Startseite</a>
        <h1>{request.params.slug}</h1>
        <p>Diese Seite verwendet JSX, &quot;renderTemplate()&quot; und ein Fastify-Plugin</p>
      </>
    )
  })
}
