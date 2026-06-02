import type { NextConfig } from "next";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  devIndicators: false,
  output: "export",
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
};

export default nextConfig;
