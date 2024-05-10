import React from "react";
import { graphql, Link } from "gatsby";
import type { PageProps } from "gatsby";
import Layout from "../components/layout";
import PostSummary from "../components/postSummary";

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

const Blog = ({ data }: PageProps<DataProps>) => (
  <Layout>
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
  </Layout>
);

export const query = graphql`
  query {
    allMdx(sort: { frontmatter: { date_published: DESC } }, limit: 1000) {
      nodes {
        id
        frontmatter {
          slug
          tags
          title
          description
          formatedDate: date_published(formatString: "d-MMM-YYYY", locale: "es")
        }
      }
    }
  }
`;

export default Blog;
