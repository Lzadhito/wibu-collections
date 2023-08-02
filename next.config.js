/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
});


const nextConfig = {
  publicRuntimeConfig: {
    // amp kinda not supported on app router 🙈
    amp: true,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/anime',
        permanent: false,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's4.anilist.co',
        port: '',
        pathname: '/file/anilistcdn/media/anime/cover/**',
      },
    ],
  },
};

module.exports = withPWA(nextConfig);
