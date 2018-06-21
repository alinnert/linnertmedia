import { writeFile } from 'fs-extra'
import { resolve } from 'path'
import { of, from } from 'rxjs'
import { flatMap, map, filter } from 'rxjs/operators'
import sass from 'sass'
import { IBuildStylesOptions } from 'styles'
import postcss from 'postcss'
import autoprefixer from 'autoprefixer'

export function buildStyles({ inputFile, outputFile }: IBuildStylesOptions) {
  const result = (() => {
    try {
      return sass.renderSync({
        file: resolve(process.cwd(), `site/${inputFile}`),
        outputStyle: 'compressed'
      })
    } catch {
      return null
    }
  })()

  of(result)
    .pipe(
      map(styles => (styles !== null ? styles.css : '')),
      filter(css => css !== ''),
      flatMap(css =>
        from(new Promise((resolve, reject) => {
          postcss([autoprefixer()])
            .process(css, { from: undefined })
            .then(result => {
              resolve(result.css)
            })
        }) as Promise<string>)
      ),
      map(css => (css !== null ? css.toString() : '')),
      flatMap(compiledStyles =>
        writeFile(resolve(process.cwd(), `docs/${outputFile}`), compiledStyles)
      )
    )
    .subscribe(
      result => {
        console.log(
          `» Build styles "${inputFile}" → writing file "${outputFile}"`
        )
      },
      error => {
        console.log('[!] ERROR WHILE BUILDING STYLES')
        console.error(error)
      }
    )
}
