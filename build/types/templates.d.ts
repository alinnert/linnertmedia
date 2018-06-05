export interface IRenderTemplateOptions {
  templateName: string
  outputFilename: string
  data?: any
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

export interface IRenderNewsFeedOptions {
  templateName: string
  collectionName: string
  outputFilename: string
}