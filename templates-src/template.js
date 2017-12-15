window.addEventListener('message', message => {
  document.getElementById('styles').innerHTML = message.data.css
}, false);
