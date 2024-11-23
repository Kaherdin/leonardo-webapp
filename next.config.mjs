import createNextIntlPlugin from 'next-intl/plugin'
import withBundleAnalyzer from '@next/bundle-analyzer'
import TerserPlugin from 'terser-webpack-plugin'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'

const withNextIntl = createNextIntlPlugin()

const withBundleAnalyzerConfig = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  images: {
    domains: ['res.cloudinary.com'],
  },
  webpack(config, { dev, isServer }) {
    if (!dev && !isServer) {
      // Implement tree shaking for unused code
      config.optimization.usedExports = true

      // Optimize CSS bundles
      config.optimization.splitChunks = {
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.css$/,
            chunks: 'all',
            enforce: true,
          },
        },
      }

      // Set up code minification for production
      config.optimization.minimizer = [
        // Use Terser for JavaScript minification
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true, // Remove console logs
            },
          },
        }),
        // Use CssMinimizerPlugin for CSS minification
        new CssMinimizerPlugin(),
      ]
    }

    return config
  },
}

export default withBundleAnalyzerConfig(withNextIntl(nextConfig))
