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
  if(message.data.fonts) {
    console.log('message', message.data.fonts)
    WebFont.load({
      google: {
        families: message.data.fonts
      }
    });
  }
  if(message.data.html) {
    $('body').html(message.data.html)
  }
}, false)

$(document).ready(() => {
  window.parent.postMessage({
    html: $('body').html()
  }, '*')
})
