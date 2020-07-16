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
              {basename(fileName, '.md')}
            </a>
          </h1>
          <p>{article.content}</p>
        </>)}
      </>
    )
  })
}
