/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.pulseflow.eu",
        port: "",
        pathname: "/**",
      },
    ],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
