/** @type {import('next').NextConfig} */
const nextConfig = {
    // next.config.js
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'digitalrenter.s3.us-east-1.amazonaws.com',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'digitalrenter.s3.amazonaws.com',
          pathname: '/**',
        },
      ],
    },
};

export default nextConfig;
