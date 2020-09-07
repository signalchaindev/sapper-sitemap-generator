<script>
  export let segment

  if (segment) {
    // noop
  }
</script>

<main id="main-content">
  <slot />
</main>

<style lang="scss" global>
  @import './src/styles/index.scss';
</style>
