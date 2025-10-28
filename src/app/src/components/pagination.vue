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

<script lang="ts" setup>
const props = defineProps<{
  currentPage: number
  totalPages: number
}>()

const emit = defineEmits<{
  (e: 'change-page', page: number): void
}>()

function changePage(page: number) {
  emit('change-page', page)
}
</script>

