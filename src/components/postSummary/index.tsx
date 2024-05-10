import { Link } from "gatsby";
import React from "react";
import PostInfo from "../postInfo";
import "./styles.css";
import { LOGOS } from "../../const/logos";

type Props = {
  title: string;
  description: string;
  date: string;
  tags: string;
  slug: string;
};

const PostSummary = ({ date, description, slug, tags, title }: Props) => {
  return (
    <article className="postSummary">
      <Link className="postSummary-title" to={slug}>
        <h1>{title}</h1>
        <img
          src={`/assets/images/header/${
            LOGOS[tags.split(", ")[0] as keyof typeof LOGOS]
          }`}
        />
      </Link>
      <PostInfo date={date} tags={tags} />
      <p>{description}</p>
      <div className="moreInfo">
        <Link to={slug}>Continuar leyendo</Link>
      </div>
    </article>
  );
};

export default PostSummary;
