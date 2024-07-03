import React from "react";
import { graphql } from "gatsby";
import type { HeadFC, PageProps } from "gatsby";
import PostSummary from "../components/posts/postSummary";

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
  <div style={{ margin: 20 }}>
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
          formatedDate: date_published(formatString: "d-MMM-YYYY", locale: "es")
        }
      }
    }
  }
`;

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
