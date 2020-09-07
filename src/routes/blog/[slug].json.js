import path from 'path'
import getAllPosts from '../../utils/getAllPosts.js'

const baseDir = path.join(process.cwd(), 'content')
const postsDir = 'posts'

const postsPath = path.join(baseDir, postsDir)
const lookup = new Map()

export function get(req, res, next) {
  const { slug } = req.params

  if (!lookup.has(slug)) {
    res.writeHead(404, {
      'Content-Type': 'application/json'
    })

    res.end(JSON.stringify({
      message: 'Not found'
    }))
  }

  res.writeHead(200, {
    'Content-Type': 'application/json'
  })

  res.end(lookup.get(slug))
}


getAllPosts(postsPath).forEach(post => {
  lookup.set(post.metadata.slug, JSON.stringify(post))
})
