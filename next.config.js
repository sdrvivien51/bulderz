/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**'
      }
    ]
  },
  experimental: {
    serverActions: true
  },
  api: {
    bodyParser: {
      sizeLimit: '10mb'
    },
    responseLimit: '10mb'
  },
  pageExtensions: ['ts', 'tsx', 'js', 'jsx']
};

module.exports = {
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    return config;
  }
};
