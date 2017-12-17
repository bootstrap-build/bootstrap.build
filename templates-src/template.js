window.addEventListener('message', message => {
  if(message.data.toggleCode) {
    $('.highlight').toggle()
  }
  if(message.data.css) {
    document.getElementById('styles').innerHTML = message.data.css
  }
}, false)
