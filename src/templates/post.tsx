import React from "react";
import { graphql, HeadProps } from "gatsby";
import { MDXProvider } from "@mdx-js/react";
import type { PageProps } from "gatsby";
import Code from "../components/code";
import Layout from "../oldComponents/layout";
import "../styles/global.css";
import "./post.css";
import SEO from "../components/seo";
import { LOGOS } from "../const/logos";
import PostInfo from "../oldComponents/postInfo";

type DataProps = {
  mdx: {
    frontmatter: {
      title: string;
      formatedDate: string;
      publishedTime: string;
      modifiedTime: string;
      tags: string;
      slug: string;
      description: string;
    };
  };
};

const PageTemplate = ({ data, children }: PageProps<DataProps>) => (
  <Layout
    logo={
      LOGOS[data.mdx.frontmatter.tags?.split(", ")[0] as keyof typeof LOGOS]
    }
  >
    <h1>{data.mdx.frontmatter.title}</h1>
    <PostInfo
      date={data.mdx.frontmatter.formatedDate}
      tags={data.mdx.frontmatter.tags}
    />
    <div className="postContent">
      <MDXProvider components={{ code: Code }}>{children}</MDXProvider>
    </div>
  </Layout>
);

export default PageTemplate;

export const Head = ({ data }: HeadProps<DataProps>) => {
  const { publishedTime, modifiedTime, description, slug, title, tags } =
    data.mdx.frontmatter;

  return (
    <SEO
      title={title}
      description={description}
      publishedTime={publishedTime}
      modifiedTime={modifiedTime}
      tags={tags}
      slug={slug}
    />
  );
};

export const query = graphql`
  query ($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        tags
        slug
        title
        description
        formatedDate: date_published(formatString: "d-MMM-YYYY", locale: "es")
        publishedTime: date_published
        modifiedTime: date_updated
      }
    }
  }
`;
