import { Layout } from "nextra-theme-docs";
import { Head } from "nextra/components";
import { getPageMap } from "nextra/page-map";
import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { METADATA } from "@/lib/constants";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: METADATA.title,
  description: METADATA.description,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head></Head>
      <body>
        <Layout
          navbar={Navbar}
          pageMap={await getPageMap()}
          docsRepositoryBase={METADATA.docsRepositoryBase}
          editLink={false}
        >
          {children}
        </Layout>
      </body>
    </html>
  );
}
