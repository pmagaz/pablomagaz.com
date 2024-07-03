import React from "react";
import { graphql } from "gatsby";
import type { HeadFC, PageProps } from "gatsby";
import PostSummary from "../components/posts/postSummary";
import Layout from "../components/layout";
import Section from "../components/section";

type DataProps = {
  allMdx: {
    nodes: {
      id: string;
      frontmatter: {
        title: string;
        formatedDate: string;
        publishedTime: string;
        modifiedTime: string;
        tags: string;
        slug: string;
        description: string;
      };
    }[];
  };
};

const IndexPage = ({ data }: PageProps<DataProps>) => (
  <Layout>
    <Section
      title="Pablo Magaz's Blog"
      description="A space to sharing my thoughts on software development, IT Managing and Leadership."
    >
      <div>
        {data?.allMdx.nodes.map(({ frontmatter, id }) => (
          <PostSummary
            key={id}
            title={frontmatter.title}
            description={frontmatter.description}
            date={frontmatter.formatedDate}
            tags={frontmatter.tags}
            slug={frontmatter.slug}
          />
        ))}
      </div>
    </Section>
  </Layout>
);

export const query = graphql`
  query {
    allMdx(
      sort: { frontmatter: { date_published: DESC } }
      limit: 1000
      filter: {
        internal: { contentFilePath: { regex: "/^(?!(.*/blog/old)).*$/" } }
      }
    ) {
      nodes {
        id
        frontmatter {
          slug
          tags
          title
          description: full_description
          formatedDate: date_published(formatString: "d-MMM-YYYY", locale: "en")
        }
      }
    }
  }
`;

export default IndexPage;

export const Head: HeadFC = () => (
  <>
    <title>Blog</title>
    <link
      rel="preload"
      href="/content/fonts/Montserrat-Bold.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
    />
    <link
      rel="preload"
      href="/content/fonts/Montserrat-Regular.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
    />
    <link
      rel="preload"
      href="/content/fonts/Montserrat-Light.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
    />
  </>
);
