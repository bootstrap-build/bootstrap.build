const fs = require('fs')
const path = require('path')

const template = content => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title></title>
        <link rel="stylesheet" href="template.css" />
        <link rel="stylesheet" href="docs.min.css" />
        <style id="styles"></style>
      </head>
      <body>
        ${content}
        <script type="text/javascript" src="template.js"></script>
      </body>
    </html>
  `
}

fs.readdir('./templates-src', (err, files) => {
  files.forEach(file => {
    if(path.extname(file) === '.js' || path.extname(file) === '.css') {
      fs.createReadStream(`./templates-src/${file}`).pipe(fs.createWriteStream(`./public/templates/${file}`))
    } else if(path.extname(file) === '.html') {
      fs.readFile(`./templates-src/${file}`, 'utf8', (err, data) => {
        if (err) {
          return console.log(err);
        }
        fs.writeFile(`./public/templates/${file}`, template(data), err => {
          if(err) {
            return console.log(err)
          } else {
            console.log(`👍 [compiled] ./public/templates/${file}`)
          }
        })
      })
    } else {
      console.log('👆 other type of file')
    }
  })
})
