import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';
const repoName = '/site'; // Ensure this matches your repo name

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? repoName : '',
  assetPrefix: isProd ? repoName : '',
  images: {
    unoptimized: true,
  },
  // Inject build timestamp
  env: {
    NEXT_PUBLIC_BUILD_TIME: new Date().toISOString(),
  },
};

export default nextConfig;
