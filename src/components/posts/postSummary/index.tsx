import { Link } from "gatsby";
import React from "react";
import { POST_LOGOS } from "../../../const/logos";
import { SITE_AUTHOR } from "../../../const";
import "./styles.css";

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
      <Link to={slug}>
        <div className="postCard-innerbox">
          <div className="postCard-imgbox">
            <img
              className="postCard-img"
              src={`/content/images/${
                POST_LOGOS[tags.split(", ")[0] as keyof typeof POST_LOGOS]
              }`}
            />
          </div>
          <div className="postCard-textbox">
            <div className="postCard-heading">
              <h1 className="postCard-title">{title}</h1>
              <div className="postCard-subtitle">
                <span className="frontmatter-author">{SITE_AUTHOR}</span>
                <time className="frontmatter-time">{date}</time>
              </div>
            </div>
            <div className="postCard-descriptionWrapper">
              <p className="postCard-description">{description}</p>
            </div>
            <div className="postCard-tagbox">
              {tags.split(", ").map((tag: string) => (
                <mark key={tag} className="postCard-tag">
                  {tag}
                </mark>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default PostSummary;
