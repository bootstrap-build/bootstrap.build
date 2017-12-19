window.addEventListener('message', message => {
  if(typeof message.data.showDocs !== 'undefined') {
    if(message.data.showDocs) {
      $('body > :not(.bd-example)').show()
    } else {
      $('body > :not(.bd-example)').hide()
    }
  }
  if(message.data.css) {
    document.getElementById('styles').innerHTML = message.data.css
  }
}, false)
