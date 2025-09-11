import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 100],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dmtvkequgurvxnplcunq.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },

  typedRoutes: true,

  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },

    typedEnv: true,
  },
};

export default nextConfig;
