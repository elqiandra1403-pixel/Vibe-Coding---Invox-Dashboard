/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["@react-email/components"],
  },
  images: {
    domains: [],
  },
};

export default nextConfig;
