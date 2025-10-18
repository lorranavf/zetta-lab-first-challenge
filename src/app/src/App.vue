<template>
  <div id="app" class="d-flex flex-column min-vh-100">
    <Header />
    <main class="container py-4 flex-grow-1">
      <h1>Meu App Vue</h1>
      <p>Se você vê isto, o app está funcionando</p>

      <div class="text-center my-4">
        <button class="btn btn-primary" @click="count++">
          Count is: {{ count }}
        </button>
      </div>
    </main>
  </div>
</template>

<script lang="ts">

import Header from './components/header.vue'

export default {
  name: 'App',
  components: { Header },
  data() {
    return {
      count: 0
    }
  }
}
</script>

<style scoped>
.container { text-align: center; }
button {
  font-weight: bold;
  align-items: center;
}
</style>

