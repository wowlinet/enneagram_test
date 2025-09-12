/** @type {import('next').NextConfig} */
const nextConfig = {
  // App Router is enabled by default in Next.js 13+
  serverExternalPackages: ['@supabase/supabase-js'],
  // Force Node.js runtime for API routes to avoid Edge Runtime issues
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'X-Middleware-Runtime',
            value: 'nodejs'
          }
        ]
      }
    ]
  }
}

module.exports = nextConfig