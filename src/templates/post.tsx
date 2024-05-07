import React from "react";
import { graphql, Link } from "gatsby";
import { MDXProvider } from "@mdx-js/react";
import type { PageProps } from "gatsby";
import { Code as code } from "../components/code";
import Layout from "../components/layout";
import "../styles/global.css";
import "./post.css";

const PageTemplate = ({ data, children }: PageProps<any>) => (
  <Layout>
    <h1>{data.mdx.frontmatter.title}</h1>
    <div className="frontmatter-data-container">
      <span className="frontmatter-author">Pablo Magaz</span>
      <time className="frontmatter-time">
        {data.mdx.frontmatter.date_published}
      </time>
      {data.mdx.frontmatter.tags?.split(", ").map((tag: string) => (
        <Link key={tag} className="link-tag" to="">
          <mark className="frontmatter-tag">{tag}</mark>
        </Link>
      ))}
    </div>
    <MDXProvider components={{ code }}>{children}</MDXProvider>
  </Layout>
);

export default PageTemplate;

export const query = graphql`
  query ($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        tags
        title
        date_published(formatString: "d-MMM-YYYY", locale: "es")
      }
    }
  }
`;
