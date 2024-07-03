import React, { PropsWithChildren } from "react";
import { SITE_TITLE } from "../../const";
import { LOGOS } from "../../const/logos";
import { Link } from "gatsby";
import "./styles.css";

type Props = {
  logo?: string;
};

const Layout = ({ children, logo = LOGOS.Blog }: PropsWithChildren<Props>) => (
  <div className="old-layout">
    <header>
      <div className="page">
        <div
          className="logo"
          style={{ backgroundImage: `url("/content/images/header/${logo}")` }}
        >
          <h1>
            <Link to="/blog">{SITE_TITLE}</Link>
          </h1>
        </div>
      </div>
    </header>
    <div className="page">{children}</div>
  </div>
);

export default Layout;
