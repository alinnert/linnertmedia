declare module 'sass' {
  interface IRenderOptions {
    file: string
    outputStyle: 'compressed' | 'expanded'
    importer?: (url: string, prev: any, done: () => void) => void
    fiber?: any
  }

  interface IStyleData {
    css: Buffer
    map: any|null
    stats: {
      duration: number
      start: number
      end: number
      entry: string
      includedFiles: string[]
    }
  }

  export function render(options: IRenderOptions, callback: (err: any, result: IStyleData) => void): void
  export function renderSync(options: IRenderOptions): IStyleData
}