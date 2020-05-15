module.exports = api => {
  api.cache(process.env.NODE_ENV !== 'production')
  return {
    presets: [
      [
        'next/babel',
        {
          'preset-env': {
            targets: {
              ie: 11,
              esmodules: true
            },
            useBuiltIns: 'usage',
            corejs: 3
          }
        }
      ]
    ],
    plugins: ['emotion']
  }
}
