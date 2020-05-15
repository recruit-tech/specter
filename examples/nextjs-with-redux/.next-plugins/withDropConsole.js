module.exports = () => {
  return (nextConfig = {}) => {
    return Object.assign({}, nextConfig, {
      webpack(config, options) {
        const { dev } = options
        if (!dev) {
          const idx = config.optimization.minimizer.findIndex(m => m.constructor.name === 'TerserPlugin')
          if (idx !== -1) {
            config.optimization.minimizer[idx].options.terserOptions = {
              ...config.optimization.minimizer[idx].options.terserOptions,
              compress: {
                ...config.optimization.minimizer[idx].options.terserOptions.compress,
                drop_console: true
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
