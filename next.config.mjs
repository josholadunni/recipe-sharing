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
  // Add webpack configuration to ignore problematic files
  webpack: (config, { isServer }) => {
    // Add a rule to handle the problematic file
    config.module.rules.push({
      test: /node_modules\/@mapbox\/node-pre-gyp\/lib\/util\/nw-pre-gyp\/index\.html$/,
      use: "ignore-loader",
    });

    return config;
  },
};

export default nextConfig;
