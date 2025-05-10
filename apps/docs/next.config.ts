import nextra from "nextra";

// Set up Nextra with its configuration
const withNextra = nextra({
  // ... Add Nextra-specific options here
});

// Export the final Next.js config with Nextra included
export default withNextra({
  // Build static files to deploy to Github Pages
  // ref: https://nextjs.org/docs/app/getting-started/deploying#static-export
  output: "export",
  basePath: "/ygo-ruling-ai-chatbot",
  // Need to set unoptimized to true for nextra static export
  // ref: https://nextra.site/docs/guide/static-exports#configuration
  images: {
    unoptimized: true,
  },
  turbopack: {
    // ref: https://nextra.site/docs/file-conventions/mdx-components-file#module-not-found-cant-resolve-next-mdx-import-source-file
    resolveAlias: {
      "next-mdx-import-source-file": "./mdx-components.tsx",
    },
  },
});
