import React, { PropsWithChildren } from "react";
import "./styles.css";

type Props = {
  title?: string;
  description?: string;
};

const Section = ({
  children,
  title,
  description,
}: PropsWithChildren<Props>) => (
  <section id="home-section" className="active">
    <div id="container01" className="style2 container default">
      <div className="wrapper">
        <div className="inner">
          {title && <h1 className="section-title">{title}</h1>}
          {description && <p className="section-description">{description}</p>}
          {children}
        </div>
      </div>
    </div>
  </section>
);

export default Section;
