import needle from "needle";
import rss from "rss";
import { SiteConf } from "../../src/base";

let feed = new rss({
  title: SiteConf.BlogTitle,
  description: SiteConf.BlogDescription,
  feed_url: `${SiteConf.ServerUrl}/rss`,
  site_url: SiteConf.ServerUrl,
  image_url: `${SiteConf.ServerUrl}/${SiteConf.blogTitleImage}`,
  managingEditor: SiteConf.Author,
  copyright: `2017 - 2020 ${SiteConf.Author}`,
  language: "es",
  categories: [SiteConf.KeyWords.split(", ")],
  pubDate: "Oct 01, 2017 00:00:00 GMT",
  ttl: "120",
});

export const rssHandler = async (req, res) => {
  const resp = await needle("get", `${SiteConf.PostsApiUrl}&limit=100`);
  const { body } = resp;
  if (body.errors) res.status(404).json({ posts: [] });
  else {
    const { posts } = body;
    for (const post of posts) {
      feed.item({
        title: post.title,
        description: post.opening,
        url: `${SiteConf.BlogUrl}/${post.slug}`,
        guid: post.id,
        categories: post.tags.map(tag => tag.name),
        author: post.Author,
        date: post.published_at,
      });
    }
    res.send(feed.xml());
  }
};
