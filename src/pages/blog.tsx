import React from "react";
import { graphql } from "gatsby";
import type { PageProps } from "gatsby";

type DataProps = {};

const Blog = ({ data }: PageProps<any>) => {
  console.log({ data });

  return data?.allMdx.nodes.map((nodeFile: any) => (
    <article key={nodeFile?.id}>
      Title: <span>{nodeFile.frontmatter.title}</span>
      <br />
      Tags: <strong>{nodeFile.frontmatter.tags}</strong>
      <br />
      <br />
    </article>
  ));
};

export const query = graphql`
  query {
    allMdx {
      nodes {
        id
        frontmatter {
          slug
          tags
          title
        }
      }
    }
  }
`;

export default Blog;
