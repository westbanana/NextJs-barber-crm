/** @type {import('next').NextConfig} */
import withNextIntl from 'next-intl/plugin'
const nextIntlConfig = withNextIntl();
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    typedRoutes: true,
  },
};

export default nextIntlConfig(nextConfig);
