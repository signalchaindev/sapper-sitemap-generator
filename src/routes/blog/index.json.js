import path from 'path'
import getAllPosts from '../../utils/getAllPosts.js'

const baseDir = path.join(process.cwd(), 'content')
const postsDir = 'posts'

export function get(_, res) {
  const posts = getAllPosts(baseDir, postsDir)

  res.writeHead(200, {
    'Content-Type': 'application/json'
  })

  res.end(JSON.stringify(posts))
}
