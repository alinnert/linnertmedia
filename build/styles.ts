import { writeFile } from 'fs-extra'
import { resolve } from 'path'
import { of } from 'rxjs'
import { flatMap, map } from 'rxjs/operators'
import sass from 'sass'
import { IBuildStylesOptions } from 'styles'

export function buildStyles({ inputFile, outputFile }: IBuildStylesOptions) {
  let result

  try {
    result = sass.renderSync({
      file: resolve(process.cwd(), `site/${inputFile}`),
      outputStyle: 'compressed'
    })
  } catch {
    result = null
  }

  of(result)
    .pipe(
      map(styles => (styles !== null ? styles.css.toString() : '')),
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
