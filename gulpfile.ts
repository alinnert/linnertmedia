import xspawn from 'cross-spawn'
import { parallel } from 'gulp'
// @ts-ignore
import serveHandler from 'serve-handler'
import { createServer } from 'http'

function execShellCommand (
  commandAndArgs: string[],
  onStdout = (it: Buffer) => console.log(it.toString()),
  onStderr = (it: Buffer) => console.log(it.toString())
) {
  return new Promise(resolve => {
    const [command, ...args] = commandAndArgs
    const cmd = xspawn(command, args, {})
    cmd.stdout.on('data', onStdout)
    cmd.stderr.on('data', onStderr)
    cmd.on('close', code => resolve(code))
  })
}

const buildSite = (watching = false) => (done: Function) => {
  return execShellCommand([`npx ts-node build/main.ts ${watching ? 'dev' : 'build'}`])
}

const serveSite = () => (done: Function) => {
  const options = { public: 'docs' }
  const server = createServer((request, response) => serveHandler(request, response, options))
  server.listen(8080, () => { console.log('server running at localhost:8080') })
}

export const dev = parallel(buildSite(true), serveSite())
export const build = buildSite()
export const serve = serveSite()