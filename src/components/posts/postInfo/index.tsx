import React from "react";
import { SITE_AUTHOR } from "../../../const";
import { Link } from "gatsby";
import "./styles.css";

type Props = {
  date: string;
  tags: string;
};

const PostInfo = ({ date, tags }: Props) => (
  <div className="frontmatter-data-container">
    <span className="frontmatter-author">{SITE_AUTHOR}</span>
    <time className="frontmatter-time">{date}</time>
    {tags.split(", ").map((tag: string) => (
      <Link key={tag} className="link-tag" to="">
        <mark className="frontmatter-tag">{tag}</mark>
      </Link>
    ))}
  </div>
);

export default PostInfo;
