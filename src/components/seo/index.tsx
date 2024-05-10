import React from "react";
import {
  SITE_AUTHOR,
  SITE_AUTHOR_LINKS,
  SITE_BLOG_URL,
  SITE_SHARE_IMAGE,
  SITE_TITLE,
} from "../../const";

type Props = {
  title: string;
  description: string;
  publishedTime: string;
  modifiedTime: string;
  slug: string;
  tags: string;
};

const SEO = ({
  publishedTime,
  modifiedTime,
  description,
  slug,
  tags,
  title,
}: Props) => {
  const postURL = `${SITE_BLOG_URL}/${slug}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    publisher: {
      "@type": "Organization",
      name: SITE_AUTHOR,
      logo: SITE_SHARE_IMAGE,
    },
    author: {
      "@type": "Person",
      name: SITE_AUTHOR,
      url: SITE_BLOG_URL,
      sameAs: SITE_AUTHOR_LINKS,
    },
    headline: title,
    url: postURL,
    datePublished: publishedTime,
    dateModified: modifiedTime,
    image: SITE_SHARE_IMAGE,
    keywords: tags,
    description,
    mainEntityOfPage: {
      "@type": "WebPage",
      name: SITE_TITLE,
      "@id": SITE_BLOG_URL,
    },
  };

  return (
    <>
      <title>{`${SITE_AUTHOR} - ${title}`}</title>
      <meta property="og:locale" content="es_ES" />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={SITE_TITLE} />
      <meta property="og:url" content={postURL} />
      <meta property="og:image" content={SITE_SHARE_IMAGE} />
      <meta property="article:published_time" content={publishedTime} />
      <meta property="article:modified_time" content={modifiedTime} />
      <meta property="article:tag" content={tags} />
      <meta name="twitter:card" content="summary" />
      <script type="application/ld+json">
        {JSON.stringify(structuredData, undefined, 2)}
      </script>
    </>
  );
};

export default SEO;
