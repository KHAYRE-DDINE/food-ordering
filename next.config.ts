import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  distDir: '.next',
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    optimizeCss: true,
    serverActions: {
      bodySizeLimit: '2mb'
    },
  },
  webpack: (config, { isServer }) => {
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
