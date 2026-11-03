import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // Original photography is modest resolution (max 1280px wide); never
    // request an upscale larger than the source can support.
    deviceSizes: [360, 480, 640, 828, 1080, 1280, 1920],
    imageSizes: [96, 160, 256, 384, 512, 768],
    // Next 16 requires every quality used in the app to be declared.
    qualities: [75, 88, 90, 92],
  },
  poweredByHeader: false,
};

export default nextConfig;
