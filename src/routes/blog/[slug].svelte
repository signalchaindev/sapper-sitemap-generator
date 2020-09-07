<script context="module">
  export async function preload({ params }) {
    const res = await this.fetch(`blog/${params.slug}.json`)
    const post = await res.json()

    if (res.status !== 200) {
      this.error(res.status, post.message)
    }

    return { post }
  }
</script>

<script>
  export let post
  export let segment
  if (segment) {
    // noop
  }
</script>

<svelte:head>
  <title>{post.metadata.title}</title>
</svelte:head>

<section>
  <article class="md-article stack section fw">
    <h1>{post.metadata.title}</h1>

    {@html post.content}
  </article>

  <button class="primary back-btn" on:click={() => history.back()}>Back</button>
</section>

<style lang="scss">
  section {
    min-height: calc(100vh - var(--hh-nav-height));
    padding-top: calc(var(--nav-height) + var(--sp6));
  }

  article.section {
    --st-gap: var(--sp12);
  }

  :global(.md-article :matches(h1)) {
    font-size: var(--size10);
    font-weight: 600;
    margin-bottom: var(--sp10);

    @media only screen and (min-width: 896px) {
      font-size: var(--size12);
    }
  }

  :global(.md-article :matches(h2)) {
    font-size: var(--size9);

    @media only screen and (min-width: 896px) {
      font-size: var(--size10);
    }
  }

  :global(.md-article :matches(h2, h3)) {
    font-weight: 700;
  }

  :global(.md-article :matches(h4, h5, h6)) {
    font-weight: 600;
  }

  :global(.md-article * + h2) {
    margin-top: var(--sp16);
    margin-bottom: var(--sp8);
  }

  :global(.md-article h3) {
    margin-bottom: var(--sp6);
  }

  :global(.md-article h4 + :matches(p, ul, ol, pre)),
  :global(.md-article h5 + :matches(p, ul, ol, pre)),
  :global(.md-article h6 + :matches(p, ul, ol, pre)) {
    --st-gap: var(--sp3);
  }

  :global(.md-article *:not(h4, h5, h6) + :matches(p, ul, ol, pre)) {
    --st-gap: var(--sp6);
  }

  :global(.md-article p + p) {
    --st-gap: var(--sp8) !important;
  }

  :global(.md-article pre) {
    margin-top: var(--sp10);
    margin-bottom: var(--sp10);
  }

  :global(.md-article a) {
    color: var(--blue500);
    text-decoration: underline;
  }

  :global(.md-article ol) {
    padding-left: var(--sp9);
  }

  :global(.md-article ol ul),
  :global(.md-article ul ol) {
    margin-bottom: var(--sp4);
  }

  :global(.md-article ul) {
    padding-left: var(--sp9);
  }

  :global(.md-article ol li) {
    list-style-type: decimal;
  }

  :global(.md-article ul li) {
    list-style-type: disc;
  }

  .back-btn {
    margin-top: var(--sp12);
  }
</style>
