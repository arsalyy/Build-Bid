const { PythonShell } = require('python-shell')

const runScrapper = (scriptPath) => {
  PythonShell.run(scriptPath, null, (err, results) => {
    if (err) {
      console.error(err)
    } else {
      console.log('Python script output:', results)
    }
  })
}

module.exports = {
  runScrapper
}
