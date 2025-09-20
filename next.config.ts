import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 100],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dmtvkequgurvxnplcunq.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: '**.googleusercontent.com',
        pathname: '/**',
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

const withIntl = createNextIntlPlugin();

export default withIntl(nextConfig);
