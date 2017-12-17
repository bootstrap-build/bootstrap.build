$(document).ready(() => {
  window.addEventListener('message', message => {
    if(message.data.css) {
      document.getElementById('styles').innerHTML = message.data.css
    }
    if(message.data.toggleCode) {
      $('.highlight').toggle()
    }
  }, false)
})
