import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Build static files to deploy to Github Pages
  // ref: https://nextjs.org/docs/app/getting-started/deploying#static-export
  output: "export",
  basePath: "/ygo-ruling-ai-chatbot",
};

export default nextConfig;
