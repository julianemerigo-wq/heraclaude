import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/heraclaude",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
