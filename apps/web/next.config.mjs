// ref: https://github.com/vercel/turborepo/tree/main/examples/with-tailwind#building-packagesui

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@repo/ui"],
};

export default nextConfig;
