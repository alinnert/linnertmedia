const cp = require('child_process')

const cmd = cp.exec('echo foo bar', { cwd: __dirname }, (e, out, err) => {
  console.log(out)
})
cmd.on('message', msg => { console.log(msg) })
