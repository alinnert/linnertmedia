<template>
  <article>
    <div class="article-body" v-html="article"></div>
  </article>
</template>

<script>
export default {
  async asyncData({ params, error }) {
    return {
      article: require('~/nuxt/renderFile').renderFile(`blog/${params.slug}.md`)
    }
  }
}
</script>
