import React, { PropsWithChildren } from "react";
import "./styles.css";

type Props = {
  size?: "s" | "m" | "l";
  title?: string;
  subtitle?: string;
  description?: string;
  imgFileName?: string;
};

const Section = ({
  children,
  size = "l",
  title,
  subtitle,
  description,
  imgFileName,
}: PropsWithChildren<Props>) => (
  <section id="home-section" className={`active size-${size}`}>
    <div id="container01" className="style2 container default">
      <div className="wrapper">
        <div className="inner">
          {imgFileName && (
            <div className="section-imgbox">
              <img src={`/content/images/${imgFileName}`} />
            </div>
          )}

          <div className="section-content">
            <div className="section-heading">
              {title && <h1 className="section-title">{title}</h1>}
              {subtitle && <span className="section-subtitle">{subtitle}</span>}
              {subtitle && <hr className="section-divider" />}
            </div>
            {description && (
              <p className="section-description">{description}</p>
            )}
            {children}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Section;
