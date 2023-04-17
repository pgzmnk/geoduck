/** @type {import('next').NextConfig} */

const withTM = require('next-transpile-modules')(['@duckdb/react-duckdb', "xterm"]);

const nextConfig = withTM({
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack(config, { isServer, dev }) {
    config.output.webassemblyModuleFilename = isServer && !dev ? '..static/wasm/[name].[moduleHash].wasm' : 'static/wasm/[name].[moduleHash].wasm'
    config.experiments = { ...config.experiments, asyncWebAssembly: true }

    config.module.rules.push({
      test: /.*\.wasm$/,
      type: "asset/resource",
      generator: {
        filename: "static/wasm/[name].[contenthash][ext]",
      },
    })

    return config;
  }

})

module.exports = nextConfig
