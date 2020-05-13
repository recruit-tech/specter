const path = require('path')
const { execSync } = require('child_process')
const withBundleAnalyzer = require('@next/bundle-analyzer')
const withSourceMap = require('./.next-plugins/withSourceMap')
const withDropConsole = require('./.next-plugins/withDropConsole')

const shell = `git rev-parse HEAD | tr -d "\n"`

const releaseVersion = execSync(shell).toString()

const compose = (...plugins) =>
  plugins.filter(Boolean).reduce(
    (a, b) => (...args) => a(b(...args)),
    x => x
  )

const withPlugins = compose(
  //
  withBundleAnalyzer({ enabled: process.env.ANALYZE === 'true' }),
  withDropConsole(),
  withSourceMap()
)

module.exports = withPlugins({
  poweredByHeader: false,
  webpack: (config, { isServer }) => {
    config.devtool = process.env.NODE_ENV === 'production' ? 'hidden-source-map' : 'eval-cheap-module-source-map'

    if (isServer) {
      config.node = {
        process: false
      }
    }

    return config
  },
  experimental: {
    strict: true
  }
})
