/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/anime',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
