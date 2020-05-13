const webpack = require('webpack')

module.exports = {
  addons:
    process.env.CAP === '1'
      ? []
      : [
          '@storybook/addon-links/register',
          '@storybook/addon-actions/register',
          '@storybook/addon-viewport/register',
          '@storybook/addon-a11y/register',
          '@storybook/addon-backgrounds/register'
        ],
  webpackFinal: async config => {
    if (process.env.CAP === '1') {
      config.module.rules.push({
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: require.resolve('react-docgen-typescript-loader')
          }
        ],
        enforce: 'pre'
      })
    }

    config.module.rules = config.module.rules.map(r => {
      if (!r.loader || !r.loader.includes('babel-loader')) return r
      return {
        ...r,
        options: {
          ...r.options,
          plugins: ['emotion', ...r.options.plugins]
        }
      }
    })
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.CAP': process.env.CAP
      })
    )
    config.resolve.extensions.push('.ts', '.tsx')
    return config
  }
}
