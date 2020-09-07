import fs from 'fs'
import path from 'path'
import processMarkdown from './processMarkdown.js'

/**
 * @param {String!} basePath - Path to directory with markdown files
 * @param {String} postsPath - Extend base path
 *
 * @return {Array} An array of posts objects with metadata and content
 */
export default function getAllPosts(basePath, postsPath = '') {
  const pathToPosts = path.join(basePath, postsPath)

  const mdFiles = fs
    .readdirSync(pathToPosts)
    .filter(file => path.extname(file) === '.md')

  let posts = []
  for (const post of mdFiles) {
    const pathToPost = path.join(pathToPosts, post)
    const md = fs.readFileSync(pathToPost, 'utf-8')
    const { metadata, content } = processMarkdown(md)
    posts.push({ metadata, content })
  }


  return posts
}
