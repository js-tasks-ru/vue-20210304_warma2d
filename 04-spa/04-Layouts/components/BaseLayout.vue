<template>
  <div>
    <TheHeader></TheHeader>

    <main class="main">
      <div class="page page_onboarding">
        <slot></slot>
      </div>
    </main>

    <TheFooter></TheFooter>
  </div>
</template>

<script>
import TheHeader from './TheHeader'
import TheFooter from './TheFooter'

export default {
  name: 'BaseLayout',

  components: {
    TheHeader,
    TheFooter,
  },
};
</script>

<style scoped>
main {
  flex: 1 0 auto;
}

.page {
  padding: 48px 0;
}

.page.page_onboarding {
  max-width: 374px;
  width: 100%;
  margin: 0 auto;
}
</style>
