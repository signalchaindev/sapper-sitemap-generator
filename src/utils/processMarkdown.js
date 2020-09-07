import marked from 'marked'

/**
 * @param {String!} markdown - Raw markdown as utf-8 string
 *
 * @return {Object} *
 * @return {Object} *.metadata - Post frontmatter
 * @return {Object} *.content - Post body content
 */
export default function processMarkdown(markdown) {
  const match = /---\r?\n([\s\S]+?)\r?\n---/.exec(markdown)
  const frontMatter = match[1]
  const metadata = {}

  frontMatter.split('\n').forEach(pair => {
    const colonIndex = pair.indexOf(':')
    metadata[pair.slice(0, colonIndex).trim()] = pair
      .slice(colonIndex + 1)
      .trim()
  })

  const md = markdown.slice(match[0].length)
  const renderer = new marked.Renderer()
  marked.setOptions({
    highlight(code) {
      return require('highlight.js').highlightAuto(code).value
    },
  })
  const content = marked(md, { renderer })


  return { metadata, content }
}
