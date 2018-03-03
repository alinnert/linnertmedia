<template>
  <div class="page-navigation">
    <div class="page-navigation__logo">
      <page-logo></page-logo>
    </div>
    <div class="page-navigation__menu">
      <page-menu></page-menu>
    </div>
  </div>
</template>

<script>
import PageLogo from '~/components/pageLogo'
import PageMenu from '~/components/pageMenu'

export default {
  components: { PageLogo, PageMenu }
}
</script>

