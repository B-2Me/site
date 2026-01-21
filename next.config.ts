import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // Required for GitHub Pages
  images: { 
    unoptimized: true // GitHub Pages cannot resize images on the fly
  },
};

export default nextConfig;
