import { FastifyPluginCallback } from 'fastify'
import React from 'react'
import { defaultTemplate } from '../../templates/default'
import { Teaser } from '../../components/teaser'

export const indexPlugin: FastifyPluginCallback = async (
  app, options, next
) => {
  app.get('/', async (request, reply) => {
    const articles = [
      {
        title: 'Wie funktioniert "this" in JavaScript?',
        date: '17.02.2019',
        tags: ['JavaScript'],
        url: '/blog/wie-funktioniert-this-in-javascript'
      },
      {
        title: 'Willkommen auf dem neuen Linnert Media-Blog',
        date: '17.06.2018',
        tags: ['Intern'],
        url: '/blog/willkommen-auf-dem-neuen-linnert-media-blog'
      },
      {
        title: 'Die Grundlagen zu Node.js',
        date: '16.06.2017',
        tags: ['JavaScript', 'Node.js'],
        url: '/blog/die-grundlagen-zu-nodejs'
      },
      {
        title: 'AutoHotKey für angenehmeres Arbeiten mit der Tastatur',
        date: '10.06.2017',
        tags: ['Tipps'],
        url: '/blog/autohotkey-fuer-angenehmeres-arbeiten-mit-der-tastatur'
      }
    ]

    return defaultTemplate(
      <>
        <h1>Linnert Media JSX</h1>
        {articles.map((article, i) => (
          <Teaser key={i} {...article} />
        ))}
      </>
    )
  })
}
