import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";

const IndexPage: React.FC<PageProps> = () => {
  return <>Hello there Blog goes here:</>;
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
