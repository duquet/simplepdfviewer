import type { Configuration } from "webpack";
import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  webpack: (config: Configuration) => {
    config.resolve!.alias = {
      ...config.resolve?.alias,
      canvas: false,
    };
    // Enable loading of PDF files
    config.module!.rules!.push({
      test: /\.pdf$/,
      type: "asset/resource",
    });
    return config;
  },
  // Add CORS headers for worker scripts
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "require-corp",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
