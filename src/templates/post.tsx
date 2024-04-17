import React from "react";
import { graphql } from "gatsby";
import { MDXProvider } from "@mdx-js/react";
import type { PageProps } from "gatsby";

export default function PageTemplate({ data, children }: PageProps<any>) {
  return (
    <>
      <h1>{data.mdx.frontmatter.title}</h1>
      <MDXProvider>{children}</MDXProvider>
    </>
  );
}

export const query = graphql`
  query ($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
      }
    }
  }
`;
