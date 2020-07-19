import { FastifyPluginCallback } from 'fastify'
import { basename } from 'path'
import React from 'react'
import { getContentList } from '../../services/content/getContentList'
import { defaultTemplate } from '../../templates/default'

export const indexPlugin: FastifyPluginCallback = async app => {
  app.get('/', async (request, reply) => {
    const articles = await getContentList('blog')

    return defaultTemplate(
      <>
        <h1>Linnert Media</h1>
        {Object.entries(articles).map(([fileName, article]) => <>
          <h1>
            <a href={`/blog/${basename(fileName, '.md')}`}>
              {typeof article.metadata.title === 'string' ? (
                article.metadata.title
              ) : (
                'no title'
              )}
            </a>
          </h1>
          <div>
            {typeof article.metadata.date === 'string' ? <>
              <span>
                {new Date(Date.parse(article.metadata.date)).toLocaleDateString('de-DE', {
                  day: 'numeric',
                  month: '2-digit',
                  year: 'numeric'
                })}
              </span>
              <span> ‒ </span>
            </> : null}

            {Array.isArray(article.metadata.tags) ? (
              article.metadata.tags.map(tag => (
                <span>{tag}</span>
              ))
            ) : null}
          </div>
          <p dangerouslySetInnerHTML={{ __html: article.content }} />
        </>)}
      </>
    )
  })
}
