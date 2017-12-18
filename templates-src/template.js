var docsShown = true
window.addEventListener('message', message => {
  if(message.data.toggleDocs) {
    if(docsShown) {
      $('body > :not(.bd-example)').hide()
      docsShown = false
    } else {
      $('body > :not(.bd-example)').show()
      docsShown = true
    }
  }
  if(message.data.css) {
    document.getElementById('styles').innerHTML = message.data.css
  }
}, false)
