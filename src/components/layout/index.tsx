import React, { PropsWithChildren } from "react";
import { SITE_TITLE } from "../../const";
import { LOGOS } from "../../const/logos";
import Page from "../page";
import { Link } from "gatsby";

type Props = {
  logo?: string;
};

const Layout = ({ children, logo = LOGOS.Blog }: PropsWithChildren<Props>) => (
  <div className="layout">
    <header>
      <Page>
        <div
          className="logo"
          style={{ backgroundImage: `url("/content/images/header/${logo}")` }}
        >
          <h1>
            <Link to="/blog">{SITE_TITLE}</Link>
          </h1>
        </div>
      </Page>
    </header>
    <Page>{children}</Page>
  </div>
);

export default Layout;
