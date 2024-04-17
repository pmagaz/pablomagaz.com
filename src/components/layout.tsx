import React from "react";
import { MDXProvider } from "@mdx-js/react";
import type { PageProps } from "gatsby";

export default function Layout({ children }: PageProps) {
  return <MDXProvider>{children}</MDXProvider>;
}
