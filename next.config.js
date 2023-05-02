/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dummyjson.com",
        port: "",
        pathname: "/data/products/**",
      },
    ],
  },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
