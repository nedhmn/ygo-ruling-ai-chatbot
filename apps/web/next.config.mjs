// ref: https://github.com/vercel/turborepo/tree/main/examples/with-tailwind#building-packagesui

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  transpilePackages: ["@repo/ui"],
};

export default nextConfig;
