import { resolve } from 'path'

export type ContentFolder =
  | 'blog'
  | 'projects'

export function getContentFolderPath (folder: ContentFolder): string {
  return resolve(__dirname, 'content', folder)
}
