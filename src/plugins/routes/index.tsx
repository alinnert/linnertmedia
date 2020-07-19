import { FastifyPluginCallback } from 'fastify'
import { basename } from 'path'
import React from 'react'
import { getContentList } from '../../services/content/getContentList'
import { defaultTemplate } from '../../services/templates/default'

export const indexPlugin: FastifyPluginCallback = async app => {
  app.get('/', async (request, reply) => {
    const articles = await getContentList('blog')

    return defaultTemplate(
      <>
        <h1>Linnert Media</h1>
        {Object.entries(articles).sort(
          (itemA, itemB) => {
            if (typeof itemA[1].metadata.date !== 'string') { return 0 }
            if (typeof itemB[1].metadata.date !== 'string') { return 0 }
            const metadataA = itemA[1].metadata.date
            const metadataB = itemB[1].metadata.date
            if (metadataA < metadataB) { return 1 }
            if (metadataA > metadataB) { return -1 }
            return 0
          }
        ).map(([fileName, article]) => <>
          <h2>
            <a href={`/blog/${basename(fileName, '.md')}`}>
              {typeof article.metadata.title === 'string' ? (
                article.metadata.title
              ) : 'no title'}
            </a>
          </h2>
          <div>
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
          </div>
        </>)}
      </>
    )
  })
}
