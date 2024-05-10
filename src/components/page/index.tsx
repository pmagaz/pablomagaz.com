import React, { PropsWithChildren } from "react";

const Page = ({ children }: PropsWithChildren) => (
  <div className="page">{children}</div>
);

export default Page;
