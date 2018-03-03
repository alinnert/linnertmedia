<template>
  <article>
    <div class="article-body" v-html="article"></div>
  </article>
</template>

<script>
import renderFile from '~/nuxt/renderFile'

export default {
  async asyncData({ params, error }) {
    return {
      article: renderFile(`blog/${params.slug}.md`)
    }
  }
}
</script>

