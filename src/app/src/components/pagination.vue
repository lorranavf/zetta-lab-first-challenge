<template>
  <section>
    <div v-if="totalPages > 1" class="pagination">
        <span>Página {{ currentPage }} de {{ totalPages }}</span>
        <button class="button-page" @click="changePage(currentPage - 1)" :disabled="currentPage === 1">
          Anterior
        </button>
        <button class="button-page" @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages">
          Próxima
        </button>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Pagination',
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    }
  },
  emits: ['change-page'],
  methods: {
    changePage(page: number) {
      this.$emit('change-page', page)
    }
  }
})
</script>

