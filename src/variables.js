const variables = {
  'Core settings': [
    {
      variable: '$enable-caret',
      value: true,
      description: 'Enable pseudo element caret on <code>.dropdown-toggle.</code>',
      type: 'boolean',
    },
    {
      variable: '$enable-rounded',
      value: true,
      description: 'Enables predefined <code>border-radius</code> styles on various components.',
      type: 'boolean'
    },
    {
      variable: '$enable-shadows',
      value: false,
      description: 'Enables predefined box-shadow styles on various components.',
      type: 'boolean'
    },
    {
      variable: '$enable-gradients',
      value: false,
      description: 'Enables predefined gradients via <code>background-image</code> styles on various components.',
      type: 'boolean'
    },
    {
      variable: '$enable-transitions',
      value: true,
      description: 'Enables predefined transitions on various components.',
      type: 'boolean'
    },
    {
      variable: '$enable-hover-media-query',
      value: false,
      description: '',
      type: 'boolean'
    },
    {
      variable: '$enable-grid-classes',
      value: true,
      description: 'Enables the generation of CSS classes for the grid system (e.g., <code>.container</code>, <code>.row</code>, <code>.col-md-1</code>, etc.).',
      type: 'boolean'
    },
    {
      variable: '$enable-print-styles',
      value: true,
      description: 'Enables styles for optimizing printing.',
      type: 'boolean'
    }
  ],
  'Buttons': [
    {
      variable: '$primary',
      value: '#ddd',
      description: 'Primary color',
      type: 'color',
    }
  ]
}

export default variables
