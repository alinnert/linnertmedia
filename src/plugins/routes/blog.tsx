import { FastifyPluginCallback } from 'fastify'
import React from 'react'
import { defaultTemplate } from '../../templates/default'
import { getArticleHtml } from '../../services/articles/getArticleHtml'

export const blogPlugin: FastifyPluginCallback = async (app, options, next) => {
  app.get<{
    Params: { slug: string }
  }>('/:slug', async (request, reply) => {
    const article = await getArticleHtml(request.params.slug)

    return defaultTemplate(
      <>
        <a href="/">Startseite</a>
        <h1>{article.title}</h1>
        <div>
          {article.date} &mdash; {article.tags.map(tag => (<span>{tag}</span>))}
        </div>
        <p>{article.body}</p>
      </>
    )
  })
}
