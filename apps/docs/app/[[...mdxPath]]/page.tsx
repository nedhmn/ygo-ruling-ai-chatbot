import { generateStaticParamsFor, importPage } from "nextra/pages";
import { useMDXComponents as getMDXComponents } from "../../mdx-components";
import { METADATA } from "@/lib/constants";

export const generateStaticParams = generateStaticParamsFor("mdxPath");

// Metadata props type
// ref: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
type Props = {
  params: Promise<{ id: string; mdxPath: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(props: Props) {
  const params = await props.params;
  const { metadata } = await importPage(params.mdxPath);
  return {
    ...metadata,
    title: `${metadata.title} | ${METADATA.title}`,
  };
}

const Wrapper = getMDXComponents().wrapper;

export default async function Page(props: Props) {
  const params = await props.params;
  const result = await importPage(params.mdxPath);
  const { default: MDXContent, toc, metadata } = result;
  return (
    <Wrapper toc={toc} metadata={metadata}>
      <MDXContent {...props} params={params} />
    </Wrapper>
  );
}
