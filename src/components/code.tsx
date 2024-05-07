import React from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { monokai } from "react-syntax-highlighter/dist/esm/styles/hljs";
import js from "react-syntax-highlighter/dist/esm/languages/hljs/javascript";
import ts from "react-syntax-highlighter/dist/esm/languages/hljs/typescript";
import json from "react-syntax-highlighter/dist/esm/languages/hljs/json";
import shell from "react-syntax-highlighter/dist/esm/languages/hljs/shell";
import rust from "react-syntax-highlighter/dist/esm/languages/hljs/rust";
import "./code.css";

SyntaxHighlighter.registerLanguage("js", js);
SyntaxHighlighter.registerLanguage("ts", ts);
SyntaxHighlighter.registerLanguage("json", json);
SyntaxHighlighter.registerLanguage("shell", shell);
SyntaxHighlighter.registerLanguage("rust", rust);

// This is a container component to render our demos and their code
export const Code = ({ className, children }: any) => {
  const match = /language-(\w+)/.exec(className);
  const language = match?.[1];
  return language ? (
    <SyntaxHighlighter language={language} style={monokai}>
      {String(children).trim()}
    </SyntaxHighlighter>
  ) : (
    <code>{children}</code>
  );
};
