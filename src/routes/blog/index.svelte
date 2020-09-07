<script context="module">
  export async function preload() {
    const res = await this.fetch('blog.json')
    const posts = await res.json()

    return { posts }
  }
</script>

<script>
  import ArticleEntry from '../../components/blog/ArticleEntry.svelte'

  export let posts
  export let segment
  if (segment) {
    // noop
  }
</script>

<section class="stack">
  <h1>Signal Chain Blog</h1>

  <ul>
    {#each posts as post}
      <ArticleEntry {post} />
    {/each}
  </ul>
</section>

<style lang="scss">
  section {
    margin-top: var(--nav-height);
    min-height: calc(100vh - var(--hh-nav-height));
  }

  ul {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: var(--sp8);
    margin-top: var(--sp12);

    @media only screen and (min-width: 800px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media only screen and (min-width: 1200px) {
      grid-template-columns: repeat(3, 1fr);
    }
  }
</style>
