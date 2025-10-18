<template>
  <div class="container py-4">
    <h1>Meu App Vue</h1>
    <p>Se você vê isto, o app está funcionando</p>
  </div>
  <div id="app" class="container py-4">
  <button @click="count++">
    Count is: {{ count }}
  </button>
</div>
</template>

<script lang="ts">
export default {
  name: 'App',
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

