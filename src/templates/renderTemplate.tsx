import React, { ReactNode } from 'react'
import ReactDOMServer from 'react-dom/server'

export function renderTemplate (body: ReactNode, head = <></>): string {
  const html = ReactDOMServer.renderToStaticMarkup(
    <html>
      <head>
        <meta charSet="UTF-8" />
        <title>Linnert Media Fastify</title>
        {head}
      </head>
      <body>
        {body}
      </body>
    </html>
  )

  return `<!DOCTYPE html>${html}`
}
