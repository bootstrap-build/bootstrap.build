var ready = false;
var htmlToSet = '';

window.addEventListener('message', message => {
  if(message.data.css) {
    document.getElementById('styles').innerHTML = message.data.css
  }
  if(message.data.fonts) {
    try {
      WebFont.load({
        google: {
          families: message.data.fonts
        }
      })
    } catch(err) {}
  }
  if(message.data.html) {
    if(ready) {
      $('body').html(message.data.html)
    } else {
      htmlToSet = message.data.html
    }
  }
}, false)

$(document).ready(() => {
  ready = true
  if(htmlToSet) {
    $('body').html(htmlToSet)
    htmlToSet = ''
  }
  window.parent.postMessage({
    html: $('body').html()
  }, '*')
})
