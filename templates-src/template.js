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
  console.log(message.data)
  if(message.data.fonts) {
    console.log('message', message.data.fonts)
    WebFont.load({
      google: {
        families: message.data.fonts
      }
    });
  }
}, false)
