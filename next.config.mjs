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
  // Enable server-side rendering
  serverExternalPackages: ['@supabase/ssr']
}

export default nextConfig
