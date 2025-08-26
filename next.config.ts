import withPWA from 'next-pwa';

const nextConfig = {
  experimental: {
    optimizePackageImports: ['@phosphor-icons/react'],
  },
};

export default withPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
})(nextConfig);
