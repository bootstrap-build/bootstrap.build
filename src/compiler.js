import Sass from 'sass.js/dist/sass.js'

Sass.setWorkerUrl('/sass.worker.js');
const sass = new Sass()
const cache = {}

const compiler = (code, bootstrapPath) => {
  return new Promise(async (resolve, reject) => {
    const bootstrap = await (await fetch(bootstrapPath + '/bootstrap.scss')).text()
    sass.compile(code + '\n' + bootstrap, result => {
      return resolve(result.text)
    })
    sass.importer(async (request, done) => {
      const pathArr = request.current.split('/')
      const path = pathArr.reduce((prev, current, index) => {
        if(current.length === 1) {
          return `_${current}.scss`
        } else {
          if(index === pathArr.length - 1) {
            return `${prev}/_${current}.scss`
          } else {
            return `${prev}/${current}`
          }
        }
      }, '')
      if(cache[path]) {
        return done({
          content: cache[path]
        })
      }
      const partial = await (await (fetch(`${bootstrapPath}/${path}`))).text()
      cache[path] = partial
      return done({
        content: partial
      })
    })
  })
}

export default compiler
