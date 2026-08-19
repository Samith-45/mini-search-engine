/** @type {import('next').NextConfig} */
const rawBackendUrl = process.env.BACKEND_URL || 'http://localhost:8080';
const cleanBackendUrl = rawBackendUrl.replace(/\/api\/v1\/?$/, '').replace(/\/api\/?$/, '').replace(/\/+$/, '');

const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${cleanBackendUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
