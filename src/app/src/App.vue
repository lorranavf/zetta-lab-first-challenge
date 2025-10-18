<template>
  <div id="app" class="d-flex flex-column min-vh-100">
    <Header />
    <main>
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script lang="ts">

import Header from './components/header.vue'
import Footer from './components/footer.vue'


export default {
  name: 'App',
  components: { Header, Footer },
  data() {
    return {}
  }
}
</script>

