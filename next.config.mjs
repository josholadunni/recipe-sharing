/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: process.env.NEXT_AWS_HOSTNAME,
        port: "",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
