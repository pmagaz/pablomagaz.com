import React, { PropsWithChildren } from "react";
import "./styles.css";

const Page = ({ children }: PropsWithChildren) => (
  <div className="page">{children}</div>
);

export default Page;
