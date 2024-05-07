import React from "react";
import { Highlight, themes, Prism } from "prism-react-renderer";
import "./code.css";

(typeof global !== "undefined" ? global : window).Prism = Prism;
require("prismjs/components/prism-bash");
require("prismjs/components/prism-toml");
require("prismjs/components/prism-json");

// This is a container component to render our demos and their code
export const Code = ({ className, children }: any) => {
  const match = /language-(\w+)/.exec(className);
  const language = match?.[1];
  return language ? (
    <Highlight
      prism={Prism}
      language={match?.[1] || "ts"}
      theme={themes.vsDark}
      code={String(children).trim()}
    >
      {({ style, tokens, getLineProps, getTokenProps }) => (
        <div className="code-block" style={style}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </div>
      )}
    </Highlight>
  ) : (
    <code>{children}</code>
  );
};
