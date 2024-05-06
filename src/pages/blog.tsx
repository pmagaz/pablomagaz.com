import React from "react";
import { graphql, Link } from "gatsby";
import type { PageProps } from "gatsby";

const Blog = ({ data }: PageProps<any>) => {
  console.log({ data });

  return (
    <>
      <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
        Blog posts:
      </h2>
      <ul className="max-w-md space-y-1 text-gray-900 list-disc list-inside dark:text-gray-400">
        {data?.allMdx.nodes.map((nodeFile: any) => (
          <li className="text-gray-500 dark:text-gray-400" key={nodeFile?.id}>
            <Link
              to={`/blog/${nodeFile.frontmatter.slug}`}
              className="inline-flex items-center font-medium text-blue-700 dark:text-blue-500 hover:underline"
            >
              {nodeFile.frontmatter.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export const query = graphql`
  query {
    allMdx(sort: { frontmatter: { date_published: DESC } }, limit: 1000) {
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
