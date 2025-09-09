import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dmtvkequgurvxnplcunq.supabase.co',
        pathname: '/storage/v1/object/public/menu_items_pictures/**',
      },
    ],
  },

  experimental: {
    serverActions: {
      bodySizeLimit: '6mb',
    },
  },
};

export default nextConfig;
