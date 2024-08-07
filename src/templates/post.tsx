import React from "react";
import { graphql, HeadProps } from "gatsby";
import { MDXProvider } from "@mdx-js/react";
import type { PageProps } from "gatsby";
import Code from "../components/code";
import Layout from "../components/layout";
import Section from "../components/section";
import "../styles/global.css";
import SEO from "../components/seo";
import { SITE_AUTHOR } from "../const";
import { POST_LOGOS } from "../const/logos";

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

const PageTemplate = ({ data, children }: PageProps<DataProps>) => {
  const imgFileName =
    POST_LOGOS[
      data.mdx.frontmatter.tags.split(", ")[0] as keyof typeof POST_LOGOS
    ];
  const subtitle = `${SITE_AUTHOR} | ${data.mdx.frontmatter.formatedDate} | ${data.mdx.frontmatter.tags}`;
  return (
    <Layout>
      <Section
        title={data.mdx.frontmatter.title}
        subtitle={subtitle}
        imgFileName={imgFileName}
      >
        <div className="mdxWrapper">
          <MDXProvider components={{ code: Code }}>{children}</MDXProvider>
        </div>
      </Section>
    </Layout>
  );
};

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
        formatedDate: date_published(formatString: "d-MMM-YYYY", locale: "en")
        publishedTime: date_published
        modifiedTime: date_updated
      }
    }
  }
`;
