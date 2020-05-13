module.exports = (pluginOptions = {}) => {
  return (nextConfig = {}) => {
    return Object.assign({}, nextConfig, {
      webpack(config, options) {
        const { dev } = options
        if (!dev) {
          config.devtool = pluginOptions.devtool || 'hidden-source-map'

          for (const plugin of config.plugins) {
            if (plugin.constructor.name === 'UglifyJsPlugin') {
              plugin.options.sourceMap = true
              break
            }
          }

          if (config.optimization && config.optimization.minimizer) {
            for (const plugin of config.optimization.minimizer) {
              if (plugin.constructor.name === 'TerserPlugin') {
                plugin.options.sourceMap = true
                break
              }
            }
          }
        }

        if (typeof nextConfig.webpack === 'function') {
          return nextConfig.webpack(config, options)
        }

        return config
      }
    })
  }
}
