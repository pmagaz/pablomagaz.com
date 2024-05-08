import React from "react";
import { graphql, HeadProps, Link } from "gatsby";
import { MDXProvider } from "@mdx-js/react";
import type { PageProps } from "gatsby";
import { Code as code } from "../components/code";
import Layout from "../components/layout";
import "../styles/global.css";
import "./post.css";
import { SITE_AUTHOR, SITE_TITLE } from "../const";

type DataProps = {
  mdx: {
    frontmatter: {
      title: string;
      date_published: string;
      tags: string;
      slug: string;
    };
  };
};

const PageTemplate = ({ data, children }: PageProps<DataProps>) => (
  <Layout>
    <h1>{data.mdx.frontmatter.title}</h1>
    <div className="frontmatter-data-container">
      <span className="frontmatter-SITE_author">Pablo Magaz</span>
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

export const Head = ({ data }: HeadProps<DataProps>) => (
  <>
    <title>
      {SITE_AUTHOR} - {data.mdx.frontmatter.title}
    </title>
    <meta property="og:locale" content="es_ES" />
    <meta property="og:locale" content="es_ES" />
    <meta property="og:type" content="article" />
    <meta property="og:title" content={data.mdx.frontmatter.title} />
    <meta property="og:site_name" content={SITE_TITLE} />
    <meta
      property="og:url"
      content={`https://pablomagaz.com/blog/${data.mdx.frontmatter.slug}`}
    />
  </>
);

export const query = graphql`
  query ($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        tags
        slug
        title
        date_published(formatString: "d-MMM-YYYY", locale: "es")
      }
    }
  }
`;
