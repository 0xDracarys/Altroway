/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Netlify deployment settings
  trailingSlash: true,
  // Static export for Netlify (without serverless functions)
  output: 'export',
  distDir: 'out',
  // Disable server-side features for static export
  experimental: {
    esmExternals: false
  }
}

export default nextConfig
