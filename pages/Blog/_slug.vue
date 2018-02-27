<template>
  <article>
    <h1>{{ article.data.data.title }}</h1>
    <div class="article-body" v-html="article.html"></div>
  </article>
</template>

<script>
export default {
  async asyncData ({ params, error, payload }) {
    if (payload) { return { article: payload } }
    else { return { article: {} } }
  }
}
</script>

