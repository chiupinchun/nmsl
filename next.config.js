/** @type {import('next').NextConfig} */
require('dotenv').config();
const nextConfig = {
  // reactStrictMode: false,
  transpilePackages: ['three'],
};

module.exports = nextConfig;
