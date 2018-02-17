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
        <div id="html_wrapper">
          ${content}
        </div>
        <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.2.9/ace.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.2.9/mode-html.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.2.9/theme-tomorrow.js"></script>
        <script type="text/javascript" src="highlight.pack.js"></script>
        <script src="docs.min.js"></script>
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
