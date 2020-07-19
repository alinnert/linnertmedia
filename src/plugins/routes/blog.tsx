import { FastifyPluginCallback } from 'fastify'
import React from 'react'
import { getContentHtml } from '../../services/content/getContentItem'
import { defaultTemplate } from '../../services/templates/default'

export const blogPlugin: FastifyPluginCallback = async (app, options, next) => {
  app.get<{
    Params: { slug: string }
  }>('/:slug', async (request, reply) => {
    const article = await getContentHtml('blog', request.params.slug)

    return defaultTemplate(
      <>
        <a href="/">Startseite</a>
        <article>
          {typeof article.metadata.title === 'string' ? (
            <h1>{article.metadata.title}</h1>
          ) : null}

          {typeof article.metadata.date === 'string' ? <>
            <span>
              {new Date(Date.parse(article.metadata.date)).toLocaleDateString(
                'de-DE',
                { day: 'numeric', month: '2-digit', year: 'numeric' }
              )}
            </span>
            <span> ‒ </span>
          </> : null}

          {Array.isArray(article.metadata.tags) ? (
            article.metadata.tags.map(tag => (
              <span>{tag}</span>
            ))
          ) : null}
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        </article>
      </>
    )
  })
}
