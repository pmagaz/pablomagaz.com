import { Link } from "gatsby";
import React from "react";
import PostInfo from "../postInfo";
import "./styles.css";
import { LOGOS } from "../../../const/logos";
import { SITE_AUTHOR } from "../../../const";

type Props = {
  title: string;
  description: string;
  date: string;
  tags: string;
  slug: string;
};

const PostSummary = ({ date, description, slug, tags, title }: Props) => {
  return (
    <article className="postCard">
      <div className="postCard-innerbox">
        <img
          className="postCard-img"
          src={`/content/images/header/${
            LOGOS[tags.split(", ")[0] as keyof typeof LOGOS]
          }`}
        />
        <div className="postCard-textbox">
          <h1 className="postCard-title">{title}</h1>
          <div className="postCard-subtitle">
            <span className="frontmatter-author">{SITE_AUTHOR}</span>
            <time className="frontmatter-time">{date}</time>
          </div>
          <p className="postCard-description">{description}</p>
          <div className="postCard-tagbox">
            {tags.split(", ").map((tag: string) => (
              <Link key={tag} to="">
                <mark className="postCard-tag">{tag}</mark>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostSummary;
