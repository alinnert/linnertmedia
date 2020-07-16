import { FastifyPluginCallback } from 'fastify'
import React from 'react'
import { getArticleHtml } from '../../services/content/getContentItem'
import { defaultTemplate } from '../../templates/default'

export const blogPlugin: FastifyPluginCallback = async (app, options, next) => {
  app.get<{
    Params: { slug: string }
  }>('/:slug', async (request, reply) => {
    const article = await getArticleHtml('blog', request.params.slug)

    return defaultTemplate(
      <>
        <a href="/">Startseite</a>
        <h1>Titel</h1>
        <div>
          Datum &mdash; Tags
        </div>
        <p>{article.content}</p>
      </>
    )
  })
}
