import getAllPosts from '../utils/getAllPosts.js'
import fs from 'fs'
import path from 'path'

const BASE_URL = "https://www.example.com";
const pages = [""];
const baseDir = path.join(process.cwd(), 'content')
const postsDir = 'posts'
const posts = getAllPosts(baseDir, postsDir)

fs.readdirSync("./src/routes").forEach(file => {
  file = file.split('.')[0];
  if (file.charAt(0) !== '_' && file !== "sitemap" && file !== "index") {
    pages.push(file);
  }
});

const render = (pages, posts) => `<?xml version="1.0" encoding="UTF-8" ?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  ${pages
    .map(
      page => `<url>
  <loc>${BASE_URL}/${page}</loc>
  <priority>0.85</priority>
</url>`)
    .join("\n")}
  ${posts
    .map(
      post => `<url>
  <loc>${BASE_URL}/blog/${post.metadata.slug}</loc>
  <priority>0.69</priority>
</url>`)
    .join("\n")}
</urlset>
`;

export function get(req, res, next) {
  res.setHeader("Cache-Control", `max-age=0, s-max-age=${600}`); // 10 minutes
  res.setHeader("Content-Type", "application/rss+xml");

  const sitemap = render(pages, posts);
  res.end(sitemap);
}