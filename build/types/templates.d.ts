import { GrayMatterFile } from 'gray-matter'

export interface IRenderTemplateOptions {
  templateName: string
  outputFilename: string
  data?: any
  minify?: boolean
}

export interface IRenderTemplateWithCollectionOptions {
  templateName: string
  collectionName: string
  outputDirectory: string
}

export interface IRenderTemplateWithCollectionMatterKeyOptions {
  templateName: string
  collectionName: string
  matterKey: string
  outputDirectory: string
}

export interface IMatterIndexReducerOptions {
  filename: string
  matter: GrayMatterFile<string>
  contentHtml: string
}

export interface IMatterIndex {
  [key: string]: any
}

export interface IMatterData {
  [key: string]: any
}

export interface IRenderNewsFeedOptions {
  templateName: string
  collectionName: string
  outputFilename: string
}

