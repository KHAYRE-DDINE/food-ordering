import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  distDir: 'build',
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        pathname: "/**", // Allow all paths
      },
    ],
  },
  experimental: {
    optimizeCss: true, // Enable CSS optimization
  },
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `node:` protocol
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        dns: false,
        child_process: false,
      };
    }
    return config;
  },
};

export default nextConfig;

// module.exports = {
//   distDir: 'build',
//   webpack: (config: any) => {
//     config.module.rules.push({
//       test: /\.m?js/,
//       resolve: {
//         fullySpecified: false,
//       },
//     });
//     return config;
//   },
// };
