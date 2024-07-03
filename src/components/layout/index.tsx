import React, { PropsWithChildren } from "react";
import "./styles.css";

const Layout = ({ children }: PropsWithChildren) => (
  <div id="wrapper">
    <div id="main">
      <div className="inner">{children}</div>
    </div>
  </div>
);

export default Layout;
