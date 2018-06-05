interface ILiquidEngine {
  renderFile: (template: string, data?: any) => Promise<string>
}

declare module 'liquidjs' {
  export = Liquid

  function Liquid(options: {
    root: string
    extname: string
  }): ILiquidEngine
}