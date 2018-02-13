var editors = []

function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		clearTimeout(timeout);
		timeout = setTimeout(function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		}, wait);
		if (immediate && !timeout) func.apply(context, args);
	};
}

const hideCodeEditor = () => {
  $('#html_wrapper').find('.highlight').replaceWith(function(i) {
    return $('<div class="highlight"><pre><code class="language-html">' +
      hljs.highlight('xml', editors[i].getSession().getValue()).value +
    '</code></pre></div>')
  })
  editors = []
  $('body').find('.btn-clipboard')
    .css({ display: 'none' })
}

const changeHandler = function(i, editor) {
  $($('.bd-example')[i]).html(editor.getSession().getValue())
  const $html = $('<div>' + $('#html_wrapper').html() + '</div>')
  $html.find('.highlight').replaceWith(function() {
    return $('<div class="highlight"><pre><code class="language-html">' +
      hljs.highlight('xml', editor.getSession().getValue()).value +
    '</code></pre></div>')
  })
  window.parent.postMessage({
    html: $html.html()
  }, '*')
}

const debouncedChange = debounce(changeHandler, 200)

const showCodeEditor = () => {
  editors = []
  $('.language-html').replaceWith(function() {
    return $('<div class="editor"/>').append($(this).contents())
  })
  $('.editor').each(function(i) {
    $(this).unwrap()
    var editor = ace.edit($(this)[0])
    editors.push(editor)
    editor.setOptions({
      maxLines: Infinity
    })
    editor.setTheme("ace/theme/tomorrow")
    editor.getSession().setMode("ace/mode/html")
    editor.getSession().setUseWorker(false)
    editor.setAutoScrollEditorIntoView(true)
    editor.on('change', debouncedChange.bind('no context', i, editor))
  })
  $('body').find('.highlight')
    .addClass('resizable')
    .css({
      display: 'block',
			paddingLeft: 0
    })
  $('body').find('.btn-clipboard')
    .css({ display: 'block' })
}

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
    $('#html_wrapper').html(message.data.html)
  }
  if(message.data.showCodeEditor) {
    if(!editors.length) showCodeEditor()
  } else {
    if(editors.length) hideCodeEditor()
  }
}, false)
