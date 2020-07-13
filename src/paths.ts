import { resolve } from 'path'

type ContentFolder =
  | 'blog'
  | 'projects'

export function getContentFolderPath (folder: ContentFolder): string {
  return resolve(__dirname, 'content', folder)
}
