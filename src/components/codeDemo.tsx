// src/components/CodeDemo.js
import React from "react";

// This is a container component to render our demos and their code
export function CodeDemo(props: any) {
  const { code, children } = props;

  return (
    <div>
      <pre>{code}</pre> {/* code block as a string */}
      <div>
        {children} {/* the react rendered demo */}
      </div>
    </div>
  );
}
