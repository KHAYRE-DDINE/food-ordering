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
