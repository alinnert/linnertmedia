import React, { ReactNode } from 'react'
import { renderTemplate } from './renderTemplate'

export function defaultTemplate (body: ReactNode): string {
  return renderTemplate(body, <>
    <link rel="stylesheet" href="/assets/styles.css"/>
  </>)
}
