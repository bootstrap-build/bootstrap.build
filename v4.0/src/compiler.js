import Sass from 'sass.js/dist/sass.js'

const sassFiles = [
  '_alert.scss',
  '_badge.scss',
  '_breadcrumb.scss',
  '_button-group.scss',
  '_buttons.scss',
  '_card.scss',
  '_carousel.scss',
  '_close.scss',
  '_code.scss',
  '_custom-forms.scss',
  '_dropdown.scss',
  '_forms.scss',
  '_functions.scss',
  '_grid.scss',
  '_images.scss',
  '_input-group.scss',
  '_jumbotron.scss',
  '_list-group.scss',
  '_media.scss',
  '_mixins.scss',
  '_modal.scss',
  '_nav.scss',
  '_navbar.scss',
  '_pagination.scss',
  '_popover.scss',
  '_print.scss',
  '_progress.scss',
  '_reboot.scss',
  '_root.scss',
  '_tables.scss',
  '_tooltip.scss',
  '_transitions.scss',
  '_type.scss',
  '_utilities.scss',
  'bootstrap-grid.scss',
  'bootstrap-reboot.scss',
  '_variables.scss',
  'bootstrap.scss',
  'mixins/_alert.scss',
  'mixins/_background-variant.scss',
  'mixins/_badge.scss',
  'mixins/_border-radius.scss',
  'mixins/_box-shadow.scss',
  'mixins/_breakpoints.scss',
  'mixins/_buttons.scss',
  'mixins/_caret.scss',
  'mixins/_clearfix.scss',
  'mixins/_float.scss',
  'mixins/_forms.scss',
  'mixins/_gradients.scss',
  'mixins/_grid-framework.scss',
  'mixins/_grid.scss',
  'mixins/_hover.scss',
  'mixins/_image.scss',
  'mixins/_list-group.scss',
  'mixins/_lists.scss',
  'mixins/_nav-divider.scss',
  'mixins/_navbar-align.scss',
  'mixins/_pagination.scss',
  'mixins/_reset-text.scss',
  'mixins/_resize.scss',
  'mixins/_screen-reader.scss',
  'mixins/_size.scss',
  'mixins/_table-row.scss',
  'mixins/_text-emphasis.scss',
  'mixins/_text-hide.scss',
  'mixins/_text-truncate.scss',
  'mixins/_transition.scss',
  'mixins/_visibility.scss',
  'utilities/_align.scss',
  'utilities/_background.scss',
  'utilities/_borders.scss',
  'utilities/_clearfix.scss',
  'utilities/_display.scss',
  'utilities/_embed.scss',
  'utilities/_flex.scss',
  'utilities/_float.scss',
  'utilities/_position.scss',
  'utilities/_screenreaders.scss',
  'utilities/_sizing.scss',
  'utilities/_spacing.scss',
  'utilities/_text.scss',
  'utilities/_visibility.scss'
]

var bootstrapCode = ''
let sass

const initialCompile = code => {
  Sass.setWorkerUrl('./sass.worker.js');
  sass = new Sass()
  console.time('initial compile')
  return new Promise((resolve, reject) => {
    sass.preloadFiles('./bootstrap_scss', '.', sassFiles, function ()  {
      sass.readFile('bootstrap.scss', bootstrap => {
        bootstrapCode = bootstrap
        sass.compile(`@import 'functions'; ${bootstrap}`, compiled => {
          console.timeEnd('initial compile')
          return resolve(compiled.text)
        })
      })
    })
  })
}

const compile = code => {
  console.time('usual compile')
  return new Promise((resolve, reject) => {
    sass.writeFile('theme', code)
    sass.compile(`@import 'functions'; @import 'theme'; ${bootstrapCode}`, compiled => {
      console.timeEnd('usual compile')
      return resolve(compiled.text)
    })
  })
}

const exportedFunc = code => {
  return bootstrapCode ? compile(code) : initialCompile(code)
}

export default exportedFunc
