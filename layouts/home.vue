<template>
  <div>
    <page-navigation></page-navigation>
    <nuxt></nuxt>
  </div>
</template>

<script>
import PageNavigation from '~/components/pageNavigation'

export default {
  head () {
    return {}
  },
  components: { PageNavigation }
}
</script>

