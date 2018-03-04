<template>
  <article>
    <h1>{{data.title}}</h1>
    <div class="article-body" v-html="article" v-once></div>
  </article>
</template>

<script>
import axios from 'axios'
export default {
  async asyncData({ params, error, payload }) {
    if (payload) {
      return payload
    }
    const { data: html } = await axios(`/_posts/${params.slug}.html`, {
      baseURL: 'http://localhost:3000'
    })
    const { data } = await axios(`/_posts/${params.slug}.json`, {
      baseURL: 'http://localhost:3000'
    })
    return {
      article: html,
      data
    }
  }
}
</script>
