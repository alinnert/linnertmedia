import chokidar from 'chokidar'
import { Observable } from 'rxjs'
import { debounceTime } from 'rxjs/operators';

export function initBuilder(buildInstructions: () => void) {
  console.log('  (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧    LINNERT MEDIA WEB SITE BUILD SYSTEM    ✧ﾟ･: *ヽ(◕ヮ◕ヽ)\n')

  const runMode = process.argv[2] || 'build'

  switch (runMode) {
    case 'build':
      buildInstructions()
      break
    case 'dev':
      watch()
      break
    default:
      console.log(`Sorry, run mode ${runMode} is not known. Exiting. Bye... _o/`)
  }

  function watch() {
    console.log('» [ DEV MODE ] Watching for file changes...\n')

    buildInstructions()

    const options = {
      cwd: process.cwd(),
      ignoreInitial: true,
      awaitWriteFinish: true
    }

    const fileWatcherStream = new Observable(observer => {
      chokidar.watch('site/**/*', options).on('all', () => {
        observer.next()
      })
    })

    fileWatcherStream.pipe(debounceTime(500)).subscribe(() => {
      console.log('change detected')
      buildInstructions()
    })
  }
}
