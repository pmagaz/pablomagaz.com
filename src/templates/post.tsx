import React from "react";
import { graphql, Link } from "gatsby";
import { MDXProvider } from "@mdx-js/react";
import type { PageProps } from "gatsby";
import "../styles/global.css";
import "./post.css";

import { CodeDemo } from "../components/codeDemo";

const mdxComponents = {
  h1: (props: any) => <h1 {...props} />,
  // more components
  CodeDemo: (props: any) => <CodeDemo {...props} />,
};

export default function PageTemplate({ data, children }: PageProps<any>) {
  return (
    <>
      <h1>{data.mdx.frontmatter.title}</h1>
      <div className="frontmatter-data-container">
        <span className="frontmatter-author">Pablo Magaz</span>
        <time className="frontmatter-time"></time>
        <Link className="link-tag" to="/blog">
          <mark className="frontmatter-tag">Blog</mark>
        </Link>
      </div>
      <MDXProvider components={mdxComponents}>{children}</MDXProvider>
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
