<script>
  export let post
</script>

<li class="card">
  <div class="ct-card-top">
    <a rel="prefetch" href={`blog/${post.metadata.slug}`}>
      {post.metadata.title}
    </a>
  </div>
</li>
