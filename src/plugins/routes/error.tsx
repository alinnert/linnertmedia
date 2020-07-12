import { FastifyPluginCallback } from 'fastify'
import React from 'react'
import { defaultTemplate } from '../../templates/default'

export const errorPlugin: FastifyPluginCallback = async (app, options, next) => {
  app.get('/*', async (request, reply) => {
    return defaultTemplate(
      <>
        <a href="/">Startseite</a>
        <h1>404</h1>
        <p>Diese Seite tuts nicht geben tuten tun!</p>
      </>
    )
  })
}
